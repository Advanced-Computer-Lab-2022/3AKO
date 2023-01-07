import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SignUp() {
  const [gender, setGender] = useState('')
  const { signup, isLoading, error } = useSignup()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('name') && data.get('username') && data.get('password') && data.get('gender') && data.get('email') && data.get('agreement')) {
      const traineeData = {
        email: data.get('email'),
        password: data.get('password'),
        username: data.get('username'),
        name: data.get('name'),
        gender: data.get('gender'),
        country: 'eg'
      }
      console.log(traineeData);
      console.log(data.get('agreement'));
      const request = async (traineeData) => {
        const trainee = await signup(traineeData)
        if (trainee) {
          window.location.href = `/`
        }
      }
      request(traineeData)

    }
  };
  const [dialogOpen, setDialogOpen] = useState(false)
  const [scroll, setScroll] = useState('paper');


  return (
    <div>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  type='text'
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
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
                  type='email'
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  label="gender"
                  select
                  id="gender"
                  value={gender}
                  onChange={(e) => { setGender(e.target.value) }}
                >
                  <MenuItem value="male">Male</MenuItem>

                  <MenuItem value="female">Female</MenuItem>
                </TextField>

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

            <Grid item xs={12}>
              <Checkbox required label='agreement' name='agreement' id='agreement' color="primary" />
              <span>I agree to the <Link onClick={() => { setDialogOpen(true) }} style={{ color: '#A00407' }}>terms of service</Link></span>
            </Grid>

            <Button disabled={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" style={{ color: '#A00407' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Dialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false) }}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Terms of service</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div >
  );
}