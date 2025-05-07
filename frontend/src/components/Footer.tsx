import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Divider } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#1c1c1c',
                color: 'white',
                paddingTop: 3,
                paddingBottom: 3,
                textAlign: 'center',
                mt: 4,
                boxShadow: 2, // Subtle shadow effect
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Legal Links */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Typography variant="body2">
                    <Link
                        to="/privacy-policy"
                        style={{ color: 'white', textDecoration: 'none' }}
                    >
                        Privacy Policy
                    </Link>
                </Typography>
                <Typography variant="body2">
                    <Link
                        to="/terms-of-service"
                        style={{ color: 'white', textDecoration: 'none' }}
                    >
                        Terms of Service
                    </Link>
                </Typography>

                <Typography variant="body2">
                    <Link
                        to="/impressum"
                        style={{ color: 'white', textDecoration: 'none' }}
                    >
                        Impressum
                    </Link>
                </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: 'white' }} /> {/* Divider line */}

            {/* Copyright Section */}
            <Typography variant="body2" sx={{ mb: 2 }}>
                © {new Date().getFullYear()} My Portfolio. All Rights Reserved.
            </Typography>

            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 3 }}>
                <Link
                    to="https://github.com/Martin187187"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                >
                    <GitHub />
                </Link>
                <Link
                    to="https://www.linkedin.com/in/martin-stemmer-98168a349"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'white' }}
                >
                    <LinkedIn />
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
