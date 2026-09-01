import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField, Tooltip, Snackbar, Alert } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ChatIcon from '@mui/icons-material/Chat';
import PushPinIcon from '@mui/icons-material/PushPin';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
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
                        borderRadius: '12px',
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.12)',
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
    const [copied, setCopied] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            setSnackbarMsg("Please enter or generate a meeting code first!");
            setOpenSnackbar(true);
            return;
        }
        await addToUserHistory(meetingCode.trim());
        navigate(`/${meetingCode.trim()}`);
    };

    const handleGenerateCode = () => {
        const randomCode = 'meet-' + Math.random().toString(36).substring(2, 8);
        setMeetingCode(randomCode);
        setSnackbarMsg("New room code generated! Share it with your friend.");
        setOpenSnackbar(true);
    };

    const handleCopyCode = () => {
        if (!meetingCode) return;
        navigator.clipboard.writeText(meetingCode);
        setCopied(true);
        setSnackbarMsg("Room code copied to clipboard!");
        setOpenSnackbar(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const scrollToFeatures = () => {
        const elem = document.getElementById('features');
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const featuresList = [
        {
            icon: <VideoCallIcon sx={{ fontSize: 32, color: '#6C63FF' }} />,
            title: "HD Video & Audio Calls",
            desc: "Connect face-to-face with crystal clear WebRTC video and high-definition audio. Mute mic or turn off camera anytime."
        },
        {
            icon: <ChatIcon sx={{ fontSize: 32, color: '#A78BFA' }} />,
            title: "Live In-Call Chat",
            desc: "Send instant text messages, links, and updates to everyone in the room while the call is running."
        },
        {
            icon: <PushPinIcon sx={{ fontSize: 32, color: '#EC4899' }} />,
            title: "Pin Important Comments",
            desc: "Keep essential notes, links, or comments pinned to the top of the chat panel so nobody misses them."
        },
        {
            icon: <ScreenShareIcon sx={{ fontSize: 32, color: '#3B82F6' }} />,
            title: "One-Click Screen Share",
            desc: "Present your screen, slides, browser tabs, or applications with participants in real-time."
        },
        {
            icon: <BoltIcon sx={{ fontSize: 32, color: '#F59E0B' }} />,
            title: "Instant Room Creation",
            desc: "No complicated signups or waiting rooms! Simply generate a code, send it to your friend, and connect."
        },
        {
            icon: <RestoreIcon sx={{ fontSize: 32, color: '#10B981' }} />,
            title: "Call History & Quick Join",
            desc: "Keep track of all your past video meetings and quickly rejoin previous room codes with one tap."
        }
    ];

    return (
        <ThemeProvider theme={darkTheme}>
            <div style={{ backgroundColor: '#0B0D17', minHeight: '100vh', color: '#EAEDF3' }}>

                {/* Navbar */}
                <div className="navBar">
                    <div className="navLeft">
                        <h2 style={{
                            fontSize: '1.5rem',
                            margin: 0,
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            cursor: 'pointer'
                        }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            GEN-Z Meet
                        </h2>
                    </div>

                    <div className="navCenter">
                        <Button
                            onClick={scrollToFeatures}
                            startIcon={<BoltIcon sx={{ color: '#A78BFA' }} />}
                            sx={{
                                color: '#EAEDF3',
                                backgroundColor: 'rgba(108, 99, 255, 0.12)',
                                border: '1px solid rgba(108, 99, 255, 0.3)',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                borderRadius: '50px',
                                padding: '6px 20px',
                                boxShadow: '0 2px 10px rgba(108, 99, 255, 0.15)',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    color: '#FFFFFF',
                                    backgroundColor: 'rgba(108, 99, 255, 0.25)',
                                    borderColor: '#A78BFA',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 16px rgba(108, 99, 255, 0.3)'
                                }
                            }}
                        >
                            Features
                        </Button>
                    </div>

                    <div className="navRight">
                        <Button
                            onClick={() => navigate("/history")}
                            startIcon={<RestoreIcon sx={{ color: '#A78BFA' }} />}
                            sx={{
                                color: '#EAEDF3',
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.92rem',
                                borderRadius: '50px',
                                padding: '6px 18px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    color: '#FFFFFF',
                                    backgroundColor: 'rgba(108, 99, 255, 0.15)',
                                    borderColor: '#A78BFA',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 14px rgba(108, 99, 255, 0.25)'
                                }
                            }}
                        >
                            History
                        </Button>

                        <Button
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/auth");
                            }}
                            startIcon={<LogoutIcon sx={{ color: '#EF4444' }} />}
                            sx={{
                                color: '#FCA5A5',
                                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.92rem',
                                borderRadius: '50px',
                                padding: '6px 20px',
                                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.1)',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    color: '#FFFFFF',
                                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                    borderColor: '#EF4444',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)'
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="homeHeroSection">
                    <div className="meetContainer">
                        <div className="leftPanel">
                            <div style={{ width: '100%' }}>
                                <div className="heroBadge">
                                    <StarIcon sx={{ fontSize: 16, color: '#A78BFA' }} />
                                    <span>Fast & Secure Video Connection</span>
                                </div>

                                <h1 className="heroTitle">
                                    Connect with Friends &amp; Loved Ones
                                    <br />
                                    <span style={{
                                        background: 'linear-gradient(135deg, #6C63FF, #A78BFA)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>on GEN-Z Meet</span>
                                </h1>

                                <p className="heroSubtitle">
                                    Create or enter a meeting code, share it with your friend, and connect instantly on a high-quality video call!
                                </p>

                                {/* How it works mini guide */}
                                <div className="stepsGuideContainer">
                                    <div className="stepCard">
                                        <span className="stepNum">1</span>
                                        <span>Create / Enter Code</span>
                                    </div>
                                    <div className="stepArrow">→</div>
                                    <div className="stepCard">
                                        <span className="stepNum">2</span>
                                        <span>Share Code with Friend</span>
                                    </div>
                                    <div className="stepArrow">→</div>
                                    <div className="stepCard">
                                        <span className="stepNum">3</span>
                                        <span>Join Video Call</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="callInputBox">
                                    <TextField
                                        value={meetingCode}
                                        onChange={e => setMeetingCode(e.target.value)}
                                        id="outlined-basic"
                                        label="Meeting Code"
                                        variant="outlined"
                                        placeholder="e.g. meet-xyz123"
                                        size="medium"
                                        sx={{ flex: '1 1 180px', minWidth: '160px' }}
                                    />

                                    <Button
                                        onClick={handleGenerateCode}
                                        variant="outlined"
                                        startIcon={<AutoAwesomeIcon sx={{ color: '#A78BFA' }} />}
                                        sx={{
                                            color: '#EAEDF3',
                                            borderColor: 'rgba(167, 139, 250, 0.3)',
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            fontSize: '0.92rem',
                                            padding: '12px 18px',
                                            whiteSpace: 'nowrap',
                                            '&:hover': {
                                                borderColor: '#A78BFA',
                                                backgroundColor: 'rgba(167, 139, 250, 0.1)',
                                            }
                                        }}
                                    >
                                        Generate Code
                                    </Button>

                                    <Button
                                        onClick={handleJoinVideoCall}
                                        variant='contained'
                                        startIcon={<VideoCallIcon />}
                                        sx={{
                                            background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 100%)',
                                            borderRadius: '12px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            padding: '12px 24px',
                                            boxShadow: '0 4px 16px rgba(108, 99, 255, 0.3)',
                                            transition: 'all 0.25s ease',
                                            whiteSpace: 'nowrap',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #5A52E0 0%, #9171F0 100%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 24px rgba(108, 99, 255, 0.45)',
                                            },
                                        }}
                                    >
                                        Join Call
                                    </Button>

                                    <Tooltip title={copied ? "Copied to Clipboard!" : "Copy Code to Share"}>
                                        <span>
                                            <Button
                                                onClick={handleCopyCode}
                                                variant="outlined"
                                                disabled={!meetingCode}
                                                startIcon={copied ? <CheckIcon sx={{ color: '#10B981' }} /> : <ContentCopyIcon />}
                                                sx={{
                                                    color: copied ? '#10B981' : '#EAEDF3',
                                                    borderColor: copied ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.12)',
                                                    borderRadius: '12px',
                                                    textTransform: 'none',
                                                    fontWeight: 500,
                                                    fontSize: '0.92rem',
                                                    padding: '12px 18px',
                                                    whiteSpace: 'nowrap',
                                                    '&:hover': {
                                                        borderColor: '#10B981',
                                                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                                                    },
                                                    '&.Mui-disabled': {
                                                        color: 'rgba(255, 255, 255, 0.25)',
                                                        borderColor: 'rgba(255, 255, 255, 0.05)',
                                                    }
                                                }}
                                            >
                                                {copied ? "Copied!" : "Copy Code"}
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </div>

                            </div>
                        </div>

                        <div className='rightPanel'>
                            <div className="illustrationWrapper">
                                <img src='/logo3.png' alt="GEN-Z Meet illustration" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="featuresSection">
                    <div className="featuresContainer">
                        <div className="sectionHeader">
                            <div className="featureBadge">
                                <BoltIcon sx={{ fontSize: 16 }} />
                                <span>Project Specialties &amp; Features</span>
                            </div>
                            <h2>Everything You Need For Seamless Video Calling</h2>
                            <p>
                                Explore all the rich interactive features built into GEN-Z Meet for real-time video, chat, pin comments, and screen sharing.
                            </p>
                        </div>

                        <div className="featuresGrid">
                            {featuresList.map((item, idx) => (
                                <div className="featureCard" key={idx}>
                                    <div className="featureIconBox">
                                        {item.icon}
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Snackbar feedback */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%', backgroundColor: '#131627', color: '#EAEDF3', border: '1px solid rgba(108, 99, 255, 0.3)' }}>
                        {snackbarMsg}
                    </Alert>
                </Snackbar>

            </div>
        </ThemeProvider>
    )
}

export default withAuth(HomeComponent)