import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/system";

const SectionTitle = styled(Typography)({
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '10px',
});

const ProjectCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 12px 24px rgba(0,0,0,0.2)',
    },
    width: '250px', // Set fixed width
    height: '300px', // Set fixed height
    margin: '15px',
});

const ProjectImage = styled(CardMedia)({
    height: '180px', // Fixed height for image
    width: '100%',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    transition: 'opacity 0.3s ease',
    '&:hover': {
        opacity: 0.8,
    },
});

const ProjectDescription = styled(Typography)({
    color: '#555',
    marginTop: '10px',
    textAlign: 'center',
    padding: '0 15px',
    fontSize: '14px',
    flex: 1, // Ensures text content will expand to take the remaining space
});

export default function Projects() {
    const [projects] = useState([
        { id: 0, title: "My own webpage", description: "Fullstack Project", imageUrl: "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fe0nl7ziy1la7bpwj7rsp.png" },
        { id: 1, title: "LLM Injector Demo", description: "Design Injection for Prompts", imageUrl: "https://miro.medium.com/v2/resize:fit:1024/1*z6ZJQXsdARI0ojY-AlGhZA.png" },
        { id: 2, title: "Satisfactory Calculator", description: "Reinforcement Optimizer", imageUrl: "https://i.ytimg.com/vi/Jt4XOPiPJHs/sddefault.jpg" },
    ]);

    return (
        <Grid container spacing={3} justifyContent="center">
            {projects.map((project) => (
                <Grid key={project.id}>
                    {/* Wrap the ProjectCard in a Link */}
                    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                        <ProjectCard>
                            <ProjectImage image={project.imageUrl} title={project.title} />
                            <CardContent style={{ flex: 1 }}>
                                <SectionTitle variant="h6">{project.title}</SectionTitle>
                                <ProjectDescription variant="body2">{project.description}</ProjectDescription>
                            </CardContent>
                        </ProjectCard>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}
