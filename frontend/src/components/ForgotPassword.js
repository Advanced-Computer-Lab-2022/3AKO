
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
import axios from 'axios';
import { useState } from 'react';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (data.get('username')) {
      setIsLoading(true)
      const request = async (username) => {
        await axios({ method: 'post', url: 'http://localhost:5000/user/sendEmail', data: { username } }).then(() => {
          setIsLoading(false)
          setSent(true)
        }).catch((error) => {
          setIsLoading(false)
          console.log(error);
          setSent(true)
        })

      }
      request(data.get('username'))

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
          Forgot Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, minWidth: 400 }}>
          {sent && (

            <Grid item xs={12} marginBottom={2}>
              <Alert severity="success" fullWidth>
                Email Sent Successfully
              </Alert>
            </Grid>
          )}

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
          </Grid>


          <Button disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Email
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