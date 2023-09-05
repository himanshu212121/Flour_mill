import React, { useState, useEffect } from "react";
import { SignUp, Login } from "./pages";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Records from "./scenes/records";
import Home from "./scenes/home";
import Footer from "./scenes/global/Footer";
import { DataProvider } from "./context/SheetContext2";
import MachineProfile2 from "./scenes/machine2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [theme, colorMode] = useMode();
  const [token, setToken] = useState(false);

  const [notificationPermission, setNotificationPermission] = useState(
    Notification.permission
  );

  const askForNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };
  console.log(notificationPermission);

  useEffect(() => {
    askForNotificationPermission();
  }, []);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);
  console.log(token);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/"} element={<Login setToken={setToken} />} />
        </Routes>
        {token ? (
          <DataProvider>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  {console.log("file is rendering")}
                  <Sidebar />
                  <main className="content">
                    <Topbar token={token} setToken={setToken} />
                    <Routes>
                      <Route path="/records" element={<Records />} />
                      <Route path="/machine2" element={<MachineProfile2 />} />
                      <Route path="/home" element={<Home />} />
                    </Routes>
                    <Footer />
                  </main>
                </div>
                <ToastContainer />
              </ThemeProvider>
            </ColorModeContext.Provider>
          </DataProvider>
        ) : (
          ""
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
