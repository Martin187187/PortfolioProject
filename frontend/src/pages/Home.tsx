import { Typography, Paper, Box } from "@mui/material";

export default function Home() {
    return (
        <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h3" gutterBottom>
                Hi, I'm [Your Name]!
            </Typography>
            <Typography variant="body1" paragraph>
                I'm a [Your Role] with experience in [Tech Stack]. I love building projects and solving interesting problems.
            </Typography>
            <Typography variant="body1" paragraph>
                This is a collection of my work and experiences. Feel free to explore my projects!
            </Typography>
        </Paper>
    );
}