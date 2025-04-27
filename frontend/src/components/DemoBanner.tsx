import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import React from "react";

// Banner Styling
const BannerWrapper = styled(Box)({
    backgroundColor: '#004d40', // Dark teal
    color: '#ffffff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '8px',
    marginBottom: '40px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
});

const BannerText = styled(Typography)({
    fontSize: '1.2rem',
    fontWeight: '500',
});

const DemoButton = styled(Button)({
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '8px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#155fa7', // Darker blue
    },
});

export default function DemoBanner() {
    return (
        <BannerWrapper>
            <BannerText>
                🚀 Check out my latest demo project and see it in action!
            </BannerText>
            <DemoButton
                variant="contained"
                href="/projects/1" // Link to the actual demo
                rel="noopener noreferrer"
            >
                View Project
            </DemoButton>
        </BannerWrapper>
    );
}
