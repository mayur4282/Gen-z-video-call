import React, { useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar , Container } from '@mui/material';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    const [username, setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const [ name, setName] = useState("");
     const [ error, setError]  = useState("");
    const [ message, setMessage]  = useState("");

     const [formState, setFormState] = useState(0);
   
     const [open, setOpen] = useState(false);

        const { handleRegister, handleLogin } = React.useContext(AuthContext);

      let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            //  console.log(err);
            
            let message = (err.response.data.message);
            setError(message);
        }
    }


  return (
    <ThemeProvider theme={defaultTheme}>
        {/* Is Box ko wrap karein pure content ko center karne ke liye */}
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
             backgroundImage:'url("/background.png")',
             backgroundSize:'cover',
             backgroundPosition:'centre',
             backgroundRepeat:'no-repeat'

        }}>
            <CssBaseline />
            
            {/* Purane 'Grid container' ko hata kar sirf ek 'Container' use karein */}
            <Container component="main" maxWidth="xs"> 
                <Paper elevation={6} sx={{ 
                    padding: 4, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    backgroundColor: 'blur(10px)',
                    border: '1px solid rgba( 255, 255, 255, 0.3)',
                    borderRadius: 2,
                    width: '100%',
                    maxWidth:'400px'
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <Button variant={formState === 0 ? "contained" : "text"} onClick={() => setFormState(0)}>Sign In</Button>
                        <Button variant={formState === 1 ? "contained" : "text"} onClick={() => setFormState(1)}>Sign Up</Button>
                    </div>

                    <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                        {formState === 1 && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Full Name"
                                name="fullname"
                                value={name}
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p style={{ color: "red", fontSize: '0.8rem' }}>{error}</p>}

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleAuth}
                        >
                            {formState === 0 ? "Login" : "Register"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>

        <Snackbar
            open={open}
            autoHideDuration={4000}
            message={message}
        />
    </ThemeProvider>
);
}
