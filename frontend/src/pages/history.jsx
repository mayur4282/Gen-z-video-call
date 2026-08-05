import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TagIcon from '@mui/icons-material/Tag';
import { IconButton } from '@mui/material';
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
});


export default function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <ThemeProvider theme={darkTheme}>
        <Box sx={{ 
            minHeight: '100vh', 
            background: '#0B0D17',
        }}>
            {/* Header Bar */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: { xs: '0.8rem 1rem', sm: '0.8rem 2.5rem' },
                background: 'rgba(19, 22, 39, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HistoryIcon sx={{ color: '#A78BFA', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        fontSize: '1.25rem',
                        letterSpacing: '-0.02em',
                        color: '#EAEDF3',
                    }}>
                        Meeting History
                    </Typography>
                </Box>

                <Button 
                    onClick={() => routeTo("/home")}
                    startIcon={<HomeIcon />}
                    sx={{
                        color: '#8B8FA3',
                        textTransform: 'none',
                        fontWeight: 500,
                        borderRadius: '50px',
                        padding: '6px 20px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                            color: '#EAEDF3',
                            borderColor: 'rgba(108, 99, 255, 0.3)',
                            backgroundColor: 'rgba(108, 99, 255, 0.06)',
                        }
                    }}
                >
                    Back to Home
                </Button>
            </Box>

            {/* Content */}
            <Box sx={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                padding: { xs: '1.5rem 1rem', sm: '2rem 1.5rem' },
            }}>
                {
                    (meetings.length !== 0) ? (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '12px',
                            animation: 'fadeInUp 0.5s ease-out',
                            '@keyframes fadeInUp': {
                                from: { opacity: 0, transform: 'translateY(16px)' },
                                to: { opacity: 1, transform: 'translateY(0)' },
                            },
                        }}>
                            {meetings.map((e, i) => (
                                <Card key={i} sx={{
                                    background: 'rgba(19, 22, 39, 0.65)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '14px',
                                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(108, 99, 255, 0.2)',
                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                                        transform: 'translateY(-2px)',
                                    }
                                }}>
                                    <CardContent sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        padding: { xs: '14px 16px !important', sm: '20px 24px !important' },
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <TagIcon sx={{ color: '#6C63FF', fontSize: 20 }} />
                                            <Typography sx={{ 
                                                fontSize: '1rem', 
                                                fontWeight: 600, 
                                                color: '#EAEDF3',
                                                fontFamily: "'Inter', monospace",
                                            }}>
                                                {e.meetingCode}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <CalendarTodayIcon sx={{ color: '#8B8FA3', fontSize: 16 }} />
                                            <Typography sx={{ 
                                                fontSize: '0.85rem', 
                                                color: '#8B8FA3',
                                                fontWeight: 500,
                                            }}>
                                                {formatDate(e.date)}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            minHeight: '50vh',
                            gap: '16px',
                            animation: 'fadeIn 0.6s ease-out',
                            '@keyframes fadeIn': {
                                from: { opacity: 0 },
                                to: { opacity: 1 },
                            },
                        }}>
                            <HistoryIcon sx={{ fontSize: 56, color: 'rgba(139, 143, 163, 0.3)' }} />
                            <Typography sx={{ color: '#8B8FA3', fontSize: '1.1rem', fontWeight: 500 }}>
                                No meetings yet
                            </Typography>
                            <Typography sx={{ color: 'rgba(139, 143, 163, 0.6)', fontSize: '0.9rem' }}>
                                Your meeting history will appear here.
                            </Typography>
                        </Box>
                    )
                }
            </Box>
        </Box>
        </ThemeProvider>
    )
}