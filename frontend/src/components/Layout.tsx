import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Home as HomeIcon, Work as WorkIcon } from '@mui/icons-material'; // Importing icons
import Footer from './Footer'; // Import Footer component

const Layout: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh', // Ensures the layout takes at least the full height of the viewport
            }}
        >
            {/* App Bar */}
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#1c1c1c', // Same as Footer background
                    boxShadow: 2, // Subtle shadow effect
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/* Logo/Branding */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                            My Portfolio
                        </Typography>
                    </Box>

                    {/* Navigation Buttons */}
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textTransform: 'none',
                                '&:hover': {
                                    borderBottom: '2px solid white',
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <HomeIcon sx={{ mr: 1 }} /> Home
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/projects"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textTransform: 'none',
                                '&:hover': {
                                    borderBottom: '2px solid white',
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            <WorkIcon sx={{ mr: 1 }} /> Projects
                        </Button>
                    </Box>
                    
                </Toolbar>
            </AppBar>

            {/* Main Content Area */}
            <Container sx={{ flexGrow: 1, marginTop: 4 }}>
                <Outlet />
            </Container>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default Layout;
