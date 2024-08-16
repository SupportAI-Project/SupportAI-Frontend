"use client";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, Alert } from "@mui/material";
import useSignUpForm from "./hooks/useSignUpForm";
import { LoadingButton } from "@mui/lab";
import PageContainer from "@/components/PageContainer";

const SignUp = () => {
  const { register, handleSubmit, errors, isValid, isError, error, isPending } =
    useSignUpForm();

  return (
    <PageContainer title="Sign Up">
      <Container component={Paper} square elevation={6} maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {isError && (
            <Alert severity="error" sx={{ mt: 2, alignItems: "center" }}>
              {error?.message}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  sx={{
                    "& .MuiFormHelperText-root.Mui-error": {
                      position: "absolute",
                      top: "100%",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    "& .MuiFormHelperText-root.Mui-error": {
                      position: "absolute",
                      top: "100%",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    "& .MuiFormHelperText-root.Mui-error": {
                      position: "absolute",
                      top: "100%",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              loading={isPending}
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              disabled={!isValid || isPending}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default SignUp;
