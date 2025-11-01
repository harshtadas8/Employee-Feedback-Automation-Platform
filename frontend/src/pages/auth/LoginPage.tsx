// src/pages/auth/LoginPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
//   Checkbox,
//   FormControlLabel,
//   Link,
  Avatar,
} from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useAuth } from "../../contexts/AuthContext";
const LoginPage = () => {
  const [employeeId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login ,isAuthenticated} = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated){
        navigate('/dashboard',{replace:true});
    }
  },[isAuthenticated,navigate])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(employeeId, password);
    if (success) {
      navigate("/dashboard", { replace: true });
    }
    // This would be replaced with real authentication
    else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <SmartToyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Vibemeter Login
          </Typography>

          <Paper sx={{ p: 4, width: "100%", mt: 3 }}>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="employeeId"
                label="Employee ID"
                name="employeeId"
                autoComplete="email"
                autoFocus
                value={employeeId}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>
        {/* <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {'Copyright © Vibemeter '}{new Date().getFullYear()}
        </Typography>
      </Box> */}
      </Container>
    </Box>
  );
};

export default LoginPage;
