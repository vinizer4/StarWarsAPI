import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import Login from "./Login";
import "./App.css";
import { Box } from "@mui/material";
import Home from "./Home";
import { AuthProvider, useAuth } from "./contexts/auth";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </Box>
  );
}

export default App;
