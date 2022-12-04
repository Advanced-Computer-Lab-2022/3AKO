
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Alert} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'
const theme = createTheme();

export default function ResetPassword() {
    const [match,setMatch] = useState(false)
    const [fetching,setFetching] = useState(false)
    const {login, isLoading, error} = useLogin()
    const {token} = useParams()
    const handleSubmit = (event) => {
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        setFetching(true)
        if(data.get('username') && data.get('newpassword') && data.get('confirmpassword')){
            const change = async(username,password,token) => {
                console.log(username,password)
                await axios({method:'post',url:'http://localhost:5000/user/verifyPassword',data:{username,password,token}}).then(()=>{
                    setFetching(false)
                    const request = async(username,password) => {
                        const logedIn = await login(username,password)
                        console.log(logedIn);
                        if(logedIn){
                            if(logedIn.type ==='corporate trainee' || logedIn.type ==='individual trainee'){
                                window.location.href=`/`
                            }
                            else if(logedIn.type ==='instructor'){
                                window.location.href=`/instructor`
                            }
                        }
                    }
                    request(username,password)

                }).catch(()=>{
                    setFetching(false)
                })
            }
            if(data.get('newpassword') === data.get('confirmpassword')){
                change(data.get('username'), data.get('newpassword'),token)
            }
        }
        else{
            setMatch(true)
            setFetching(false)
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
            Change Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  name="newpassword"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Cnfirm Password"
                  type="confirmpassword"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {match && (
                
                <Grid item xs={12} marginTop={2}>
                <Alert severity="error" fullWidth> 
                passwords does not match
            </Alert>
            </Grid>
            )}

            <Button disabled={fetching}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}