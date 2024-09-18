import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { ThemeColor } from "../../Assets/Theme/Theme";
import { useLoginMutation } from "../../Redux/Api/AuthAPI";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [login, { isLoading, error, data, isSuccess, isError }] =
    useLoginMutation();

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  if (isSuccess) {
    localStorage.setItem("token", data.access_token);
    navigate("/dashboard/home");
  }

  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Box
        sx={{
          backgroundImage: 'url("/images/skyLogin.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          filter: "blur(2px)",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100vh",
          zIndex: "-1",
        }}
      ></Box>
      <Box
        sx={{
          background: "#ffffffa3",
          borderRadius: "8px",
          border: "1px solid",
          borderColor: ThemeColor.lightMain,
          padding: "40px 20px",
          width: {
            md: "40%",
            sm: "80%",
            xs: "95%",
          },
        }}
      >
        <Box mb={"0.5rem"}>
          <Typography
            variant="h4"
            sx={{
              display: "inline-block",
              fontWeight: "bold",
              textAlign: "center",
              color: "#333",
            }}
          >
            لوحة تحكم معهد سما
          </Typography>
          <Typography sx={{ display: "block", color: ThemeColor.title }}>
            الرجاء ادخال بياناتك
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack gap={"1rem"}>
            <TextField
              type="email"
              required
              name="email"
              size="small"
              onChange={onChangeHandler}
              sx={{}}
              label={"الايميل"}
              disabled={isLoading}
            />

            <FormControl sx={{ width: "full" }} variant="outlined">
              <InputLabel size="small" htmlFor="outlined-adornment-password">
                كلمة المرور
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                onChange={onChangeHandler}
                size="small"
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="start"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button
              sx={{
                padding: "0.5rem",
                background: ThemeColor.main,
              }}
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? (
                <Box
                  sx={{
                    transform: "scale(0.5)",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  <CircularProgress sx={{ color: "#fff" }} />
                </Box>
              ) : (
                <Box>Login</Box>
              )}
            </Button>
            {error?.data?.error ? (
              <Typography
                sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
                color={"error"}
              >
                {error?.data?.error}
              </Typography>
            ) : error ? (
              <Typography
                sx={{ fontWeight: "bold", fontSize: "0.8rem" }}
                color={"error"}
              >
                Network Error, try again
              </Typography>
            ) : (
              ""
            )}
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
