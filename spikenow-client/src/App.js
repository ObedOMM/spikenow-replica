import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from "./components/Routes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Poppins"],
  },
});

function App() {
  return (
    <Router>
      <Header />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
      <Footer />
    </Router>
  );
}

export default App;
