import "./App.css";
import ThemeRoutes from "./Routes/Routes";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeColor } from "./Assets/Theme/Theme";
import GlobalAlert from "./UI/GlobalAlert";
import { arEG } from "@mui/material/locale";

function App() {
  const theme = createTheme(
    {
      direction: "rtl",
      palette: {
        primary: {
          main: ThemeColor.main,
        },
        secondary: {
          main: "#333",
        },
        lighter: {
          main: "#333",
        },
        
      },
      typography: {
        fontFamily: "Tajawal, sans-serif",
        title: {
          color: ThemeColor.title,
          fontSize: "0.9rem",
          display: "block",
        },

        linkSelected: {
          color: ThemeColor.secondary,
          backgroundColor: ThemeColor.bodyBackground,
          fontSize: "0.9rem",
          display: "block",
        },
      },
    },
    arEG
  );

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <GlobalAlert />

      <ThemeProvider theme={theme}>
        <ThemeRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
