
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../hooks/useLogin'
import { useHistory } from 'react-router-dom';
//const theme = createTheme();

export default function LogIn() {
  const { login, isLoading, error } = useLogin()
  const history = useHistory()
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (data.get('username') && data.get('password')) {
      const request = async () => {
        event.preventDefault()
        const logedIn = await login(data.get('username'), data.get('password'))
        console.log(logedIn);
        if (logedIn) {
          history.push('/')
        }
      }
      request()
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                type='text'
                id="username"
                label="username"
                name="username"
                autoComplete="user-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/forgotPassword" variant="body2" style={{ color: '#A00407' }}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          {error && (

            <Grid item xs={12} marginTop={2}>
              <Alert severity="error" fullWidth>
                {/* <AlertTitle>Error</AlertTitle> */}
                {error}
              </Alert>
            </Grid>
          )}

          <Button display={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2" style={{ color: '#A00407' }}>
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}