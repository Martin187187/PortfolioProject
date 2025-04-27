import { useParams, Link } from "react-router-dom";
import { Typography, Paper, Button, Box, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import GitHubIcon from '@mui/icons-material/GitHub';

interface Project {
    title: string;
    description: string;
    githubLink: string;
    structureImage: string;
    techStack: string[];
}

const projectDetails: Project[] = [
    {
        title: "Full-Stack Web App",
        description: "A production-ready full-stack application with a React frontend, FastAPI backend, reverse proxy with Nginx, all containerized using Docker, and deployed through automated CI/CD pipelines.",
        githubLink: "https://github.com/Martin187187/PortfolioProject",
        structureImage: "/img/structure.png", // Update with your image
        techStack: [
            "React (Frontend)",
            "FastAPI (Backend)",
            "Docker (Containers)",
            "Nginx (Reverse Proxy)",
            "CI/CD (GitHub Actions)"
        ],
    },
];

const MainWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const ContentWrapper = styled(Paper)({
    width: "100%",
    maxWidth: "1000px",
    padding: "40px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
});

const Section = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
});

const TechStackWrapper = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
});

const TechChip = styled(Box)({
    padding: "10px 16px",
    backgroundColor: "#e0f7fa",
    borderRadius: "30px",
    fontWeight: 500,
    color: "#006064",
    fontSize: "14px",
});

const GithubButton = styled(Button)({
    alignSelf: "flex-start",
    backgroundColor: "#24292e",
    color: "#ffffff",
    textTransform: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    '&:hover': {
        backgroundColor: "#000000",
    },
});

export default function ProjectDetails() {

    const project = projectDetails[0]
    return (
        <MainWrapper>
            <ContentWrapper>

                <Section>
                    <Typography variant="h3" fontWeight="bold">
                        {project.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {project.description}
                    </Typography>
                </Section>

                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        Project Structure
                    </Typography>
                    <Box
                        component="img"
                        src={project.structureImage}
                        alt="Project Structure"
                        sx={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover"
                        }}
                    />
                </Section>

                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        Technologies Used
                    </Typography>
                    <TechStackWrapper>
                        {project.techStack.map((tech, idx) => (
                            <TechChip key={idx}>{tech}</TechChip>
                        ))}
                    </TechStackWrapper>
                </Section>

                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        Source Code
                    </Typography>
                    <GithubButton
                        variant="contained"
                        startIcon={<GitHubIcon />}
                        href={project.githubLink}
                        rel="noopener noreferrer"
                    >
                        View on GitHub
                    </GithubButton>
                </Section>

            </ContentWrapper>
        </MainWrapper>
    );
}
