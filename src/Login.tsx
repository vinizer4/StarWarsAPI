import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/auth";

function Login() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signed, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (signed) {
      navigate("/home");
    }
  });

  async function handleLogin() {
    login(user, password);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <TextField
        sx={{ mb: 1 }}
        placeholder="Digite seu usuário"
        onChange={(e) => setUser(e.target.value)}
      >
        Usuário
      </TextField>
      <TextField
        sx={{ mb: 1 }}
        placeholder="Digite sua senha"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      >
        Senha
      </TextField>
      <Button variant="contained" onClick={() => handleLogin()}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
