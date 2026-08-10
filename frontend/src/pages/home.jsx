import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6C63FF',
        },
        background: {
            default: '#0B0D17',
            paper: '#131627',
        },
        text: {
            primary: '#EAEDF3',
            secondary: '#8B8FA3',
        },
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '10px',
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.08)',
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
    },
});


function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <>

                <div className="navBar">

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            margin: 0,
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>GEN-Z Meet</h2>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: '8px' }}>
                        <IconButton onClick={() => navigate("/history")}
                            sx={{
                                color: '#8B8FA3',
                                borderRadius: '12px',
                                gap: '6px',
                                padding: '8px 14px',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    color: '#EAEDF3',
                                    backgroundColor: 'rgba(108, 99, 255, 0.08)'
                                }
                            }}
                        >
                            <RestoreIcon sx={{ fontSize: 20 }} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>History</span>
                        </IconButton>

                        <Button onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                            sx={{
                                color: '#8B8FA3',
                                textTransform: 'none',
                                fontWeight: 500,
                                borderRadius: '50px',
                                padding: '6px 18px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    color: '#EF4444',
                                    borderColor: 'rgba(239, 68, 68, 0.3)',
                                    backgroundColor: 'rgba(239, 68, 68, 0.06)',
                                }
                            }}>
                            Logout
                        </Button>
                    </div>


                </div>


                <div className="meetContainer">
                    <div className="leftPanel">
                        <div>
                            <h2 style={{
                                marginBottom: '12px',
                                lineHeight: '1.3',
                                fontWeight: 700,
                                fontSize: "2rem",
                                letterSpacing: '-0.02em',
                                color: '#EAEDF3',
                            }}>
                                Connect to your Friends
                                <br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>and Loved ones on GEN-Z Meet</span>
                            </h2>

                            <p style={{
                                color: '#8B8FA3',
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                marginBottom: '28px',
                                maxWidth: '460px',
                            }}>
                                Enter a meeting code below to join an existing call, or create a new one to get started.
                            </p>

                            <div style={{ display: 'flex', gap: "12px", alignItems: 'stretch', flexWrap: 'wrap', justifyContent: 'center' }}>

                                <TextField onChange={e => setMeetingCode(e.target.value)}
                                    id="outlined-basic" label="Meeting Code" variant="outlined"
                                    size="medium"
                                    sx={{ minWidth: '0px', flex: '1 1 200px', maxWidth: '320px' }}
                                />
                                <Button onClick={handleJoinVideoCall} variant='contained'
                                    sx={{
                                        background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
                                        borderRadius: '50px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        padding: '10px 32px',
                                        boxShadow: '0 4px 16px rgba(108, 99, 255, 0.3)',
                                        transition: 'all 0.25s ease',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5A52E0 0%, #9171F0 100%)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 24px rgba(108, 99, 255, 0.45)',
                                        },
                                    }}
                                >Join</Button>

                            </div>
                        </div>
                    </div>
                    <div className='rightPanel'>
                        <img srcSet='/logo3.png' alt="GEN-Z Meet illustration" />
                    </div>
                </div>
            </>
        </ThemeProvider>
    )
}


export default withAuth(HomeComponent)