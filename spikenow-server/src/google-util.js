import { google } from "googleapis";
import config from "../config";

/*******************/
/** CONFIGURATION **/
/*******************/

const googleConfig = {
  clientId: config.googleCredentials.clientId,
  clientSecret: config.googleCredentials.clientSecret,
  redirect: "http://localhost:3000",
};

const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
];

/*************/
/** HELPERS **/
/*************/

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

function makeBody(to, from, subject, message) {
  var str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ",
    to,
    "\n",
    "from: ",
    from,
    "\n",
    "subject: ",
    subject,
    "\n\n",
    message,
  ].join("");

  var encodedMail = new Buffer(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return encodedMail;
}

function getGmailApi(auth) {
  return google.gmail({ version: "v1", auth });
}

/**********/
/** MAIN **/
/**********/

/**
 * Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
async function getGoogleAccountFromCode(code) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;

  auth.setCredentials(tokens);
  const profile = await google.oauth2("v2").userinfo.v2.me.get({ auth: auth });
  return {
    id: profile.data.id,
    email: profile.data.email,
    full_name: profile.data.name,
    given_name: profile.data.given_name,
    family_name: profile.data.family_name,
    picture: profile.data.picture,
    refresh_token: tokens.refresh_token,
  };
}

async function sendGmail(token, subject, message, to) {
  const auth = createConnection();
  auth.setCredentials({ refresh_token: token });
  const profile = await google.oauth2("v2").userinfo.v2.me.get({ auth: auth });

  var raw = makeBody(to, profile.data.email, subject, message);
  const gmail = getGmailApi(auth);
  gmail.users.messages.send(
    {
      auth: auth,
      userId: "me",
      resource: {
        raw: raw,
      },
    },
    function (err, response) {
      return err || response;
    }
  );
}

async function getEmails(token) {
  const auth = createConnection();
  auth.setCredentials({ refresh_token: token });
  const gmail = getGmailApi(auth);
  const res = await gmail.users.messages.list({
    userId: "me",
    q: "",
  });
  const messages = res.data.messages;

  const getEmails = async () => {
    return Promise.all(
      messages.map((mail) => getEmailWithAuthExisting(gmail, mail.id))
    );
  };

  const emails = await getEmails();

  return emails;
}

async function getEmailWithAuthExisting(gmail, emailId) {
  const res = await gmail.users.messages.get({
    userId: "me",
    id: emailId,
    format: "metadata",
    metadataHeaders: ["From", "Subject", "To"],
  });
  const { id, payload, snippet } = res.data;
  return { id, payload, snippet };
}

async function getEmail(token, emailId) {
  const auth = createConnection();
  auth.setCredentials({ refresh_token: token });
  const gmail = getGmailApi(auth);
  const res = await gmail.users.messages.get({
    userId: "me",
    id: emailId,
    format: "raw",
    metadataHeaders: ["From", "Subject"],
  });

  const { id, payload, snippet } = res.data;

  return { id, payload, snippet };
}

export default { sendGmail, getGoogleAccountFromCode, getEmails, getEmail };
