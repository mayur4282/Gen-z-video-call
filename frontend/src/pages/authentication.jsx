import React, { useState } from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Container, CircularProgress } from '@mui/material';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6C63FF',
        },
        secondary: {
            main: '#A78BFA',
        },
        background: {
            default: '#0B0D17',
            paper: '#131627',
        },
        text: {
            primary: '#EAEDF3',
            secondary: '#8B8FA3',
        },
        error: {
            main: '#EF4444',
        },
        success: {
            main: '#34D399',
        },
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '10px',
                        transition: 'all 0.25s ease',
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.08)',
                            transition: 'border-color 0.25s ease',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(108, 99, 255, 0.4)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6C63FF',
                            boxShadow: '0 0 0 3px rgba(108, 99, 255, 0.15)',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#8B8FA3',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#A78BFA',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
                    borderRadius: '50px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    padding: '12px 24px',
                    boxShadow: '0 4px 16px rgba(108, 99, 255, 0.3)',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #5A52E0 0%, #9171F0 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 24px rgba(108, 99, 255, 0.45)',
                    },
                    '&.Mui-disabled': {
                        background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.5) 0%, rgba(167, 139, 250, 0.5) 100%)',
                        color: '#ffffff',
                    },
                },
                text: {
                    textTransform: 'none',
                    fontWeight: 500,
                    color: '#8B8FA3',
                    borderRadius: '50px',
                    padding: '8px 20px',
                    '&:hover': {
                        backgroundColor: 'rgba(108, 99, 255, 0.08)',
                        color: '#EAEDF3',
                    },
                },
            },
        },
    },
});


export default function Authentication() {

    const [username, setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const [ name, setName] = useState("");
     const [ error, setError]  = useState("");
    const [ message, setMessage]  = useState("");

     const [formState, setFormState] = useState(0);
   
    const [loading, setLoading] = useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            setError("");
            setLoading(true);
            if (formState === 0) {
                let result = await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            let message = err?.response?.data?.message || err?.message || "An error occurred";
            setError(message);
        } finally {
            setLoading(false);
        }
    }


  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0B0D17 0%, #131627 40%, #1A1E35 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative background orbs */}
            <Box sx={{
                position: 'absolute',
                top: '-15%',
                right: '-10%',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(108, 99, 255, 0.12) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: '-20%',
                left: '-10%',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
            }} />
            
            <Container component="main" maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}> 
                <Box sx={{
                    animation: 'fadeInUp 0.6s ease-out',
                    '@keyframes fadeInUp': {
                        from: { opacity: 0, transform: 'translateY(24px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                    },
                }}>
                    <Paper elevation={0} sx={{ 
                        padding: { xs: 3, sm: 5 }, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        background: 'rgba(19, 22, 39, 0.65)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '20px',
                        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                        width: '100%',
                        maxWidth: '420px',
                        mx: 'auto',
                    }}>
                        {/* Brand */}
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700, 
                                letterSpacing: '-0.02em',
                                mb: 1,
                                background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            GEN-Z Meet
                        </Typography>

                        <Avatar sx={{ 
                            m: 1, 
                            width: 52, 
                            height: 52,
                            background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
                            boxShadow: '0 4px 16px rgba(108, 99, 255, 0.35)',
                        }}>
                            <LockOutlinedIcon sx={{ fontSize: 26 }} />
                        </Avatar>

                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, mt: 0.5 }}>
                            {formState === 0 ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
                        </Typography>

                        {/* Tab Toggle */}
                        <Box sx={{ 
                            display: 'flex', 
                            gap: '4px',
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            borderRadius: '50px',
                            padding: '4px',
                            mb: 3,
                            width: '100%',
                        }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "text"} 
                                onClick={() => setFormState(0)}
                                sx={{ 
                                    flex: 1,
                                    ...(formState === 0 ? {} : {
                                        background: 'transparent',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            background: 'rgba(108, 99, 255, 0.08)',
                                            boxShadow: 'none',
                                            transform: 'none',
                                        },
                                    }),
                                }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "text"} 
                                onClick={() => setFormState(1)}
                                sx={{ 
                                    flex: 1,
                                    ...(formState === 1 ? {} : {
                                        background: 'transparent',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            background: 'rgba(108, 99, 255, 0.08)',
                                            boxShadow: 'none',
                                            transform: 'none',
                                        },
                                    }),
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 0, width: '100%' }}>
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

                            {error && (
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '6px',
                                    mt: 1,
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                }}>
                                    <Typography sx={{ color: '#EF4444', fontSize: '0.8rem' }}>
                                        {error}
                                    </Typography>
                                </Box>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{ mt: 3, mb: 1, minHeight: '48px' }}
                                onClick={handleAuth}
                            >
                                {loading ? (
                                    <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                                ) : (
                                    formState === 0 ? "Sign In" : "Create Account"
                                )}
                            </Button>

                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    display: 'block', 
                                    textAlign: 'center', 
                                    color: 'text.secondary',
                                    mt: 1.5,
                                }}
                            >
                                {formState === 0 
                                    ? "Don't have an account? Click Sign Up above." 
                                    : "Already have an account? Click Sign In above."}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>

        <Snackbar
            open={open}
            autoHideDuration={4000}
            message={message}
            onClose={() => setOpen(false)}
            ContentProps={{
                sx: {
                    background: 'linear-gradient(135deg, #131627, #1A1E35)',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                    borderRadius: '12px',
                    color: '#34D399',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                }
            }}
        />
    </ThemeProvider>
);
}
