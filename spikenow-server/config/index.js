import dotenv from "dotenv";

dotenv.config();

const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  mysql: {
    options: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      dialect: process.env.DB_DIALECT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    client: null,
  },
  googleCredentials: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
};

export default config;
