import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Alert} from '@mui/material';
import {AlertTitle} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {
    const [gender,setGender] = useState('')
    const [unfinshed,setUnfinshed] = useState(false)
    const {signup, isLoading,error} = useSignup()
    const handleSubmit = (event) => {
        setUnfinshed(false)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('name') && data.get('username') && data.get('password') && data.get('gender') && data.get('email')){
        const traineeData = {
            email: data.get('email'),
            password: data.get('password'),
            username: data.get('username'),
            name: data.get('name'),
            gender: data.get('gender'),
            country : 'eg'
            }
            console.log(traineeData);
            const request = async(traineeData) => {
                const trainee = await signup(traineeData)
                if(trainee){
                    window.location.href=`/`
                }
            }
            request(traineeData)

        }
        else{
            //alert('You must fill all information')
            setUnfinshed(true)
        }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  onChange={(e)=>{setGender(e.target.value)}}
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

            <Button display={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}