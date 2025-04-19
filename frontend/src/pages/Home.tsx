import { GitHub, LinkedIn } from "@mui/icons-material";
import { Typography, Paper, Box, Card, CardContent, CardMedia, Grid, Button, Divider, LinearProgress, IconButton, Link } from "@mui/material";
import { styled } from '@mui/system';
import Projects from "./Projects";

// Define custom colors for your theme
const primaryColor = '#1c1c1c'; // Teal



// Flexbox-based layout for responsiveness
const FlexContainer = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '40px',
});

const FlexItem = styled(Box)({
    flexBasis: '100%',
    '@media (min-width: 600px)': {
        flexBasis: '48%',
    },
    '@media (min-width: 900px)': {
        flexBasis: '32%',
    },
});

// Updated InfoCard with LinkedIn and GitHub icons
const InfoCard = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#f9f9f9',
    padding: '24px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
});

// Updated InfoCard with LinkedIn and GitHub icons
const InfoCard2 = styled(Card)({
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    backgroundColor: '#f9f9f9',
    padding: '24px',
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
});


// Contact and Social Links


// Header and Section Styling
const SectionHeader = styled(Typography)({
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
});


// Skill Progress Bar Container
const SkillCard = styled(InfoCard)({
    backgroundColor: '#f1f1f1',
});

// Progress Bar Styling
const SkillProgressBar = styled(LinearProgress)({
    height: '8px',
    borderRadius: '5px',
    backgroundColor: '#e0e0e0',
    '& .MuiLinearProgress-bar': {
        backgroundColor: primaryColor,
    },
});




// Adjusting BodyText for cleaner integration with links and icons
const BodyText = styled(Typography)({
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'left',
});

// Updated InfoCardContent with LinkedIn and GitHub integration
const InfoCardContent = styled(CardContent)({
    padding: '5px',
    '&:last-child': {
        paddingBottom: '20px',
    },
});

// Updated contact section with icons
const ContactButton = styled(Button)({
    marginTop: '10px',
    textTransform: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    backgroundColor: primaryColor,
    color: '#fff',
    '&:hover': {
        backgroundColor: '#004d40', // Darker teal
    },
});
const IntroText = styled(Typography)({
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '40px',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
});
export default function Home() {
    return (
        <>
            <Typography variant="h3" gutterBottom>
                Hi, I'm Martin Stemmer!
            </Typography>
            <IntroText variant="body1">
                I'm a passionate Computer Scientist with experience in many areas, ranging from hardware design and FPGA programming
                to modern databases, language models, reinforcement learning, machine learning, game development, and fullstack projects.
                My strong suits are AI and everything related to databases.
                I am especially interested in anything that can be optimized and in solving hard problems.
                This page showcases my most recent projects and provides some information about me.
            </IntroText>


            {/* Personal Information */}
            <InfoCard>
                <InfoCardContent>
                    <Typography variant="h6" gutterBottom>
                        Personal Information
                    </Typography>
                    <BodyText>
                        <strong>Email:</strong> martin-stemmer@t-online.de
                    </BodyText>
                    <BodyText>
                        <strong>Location:</strong> Darmstadt, Germany
                    </BodyText>

                    {/* LinkedIn and GitHub as text links */}
                    <BodyText>
                        <strong>LinkedIn:</strong>{" "}
                        <Link href="https://linkedin.com/in/martin-stemmer-98168a349" target="_blank" rel="noopener noreferrer">
                            linkedin.com/in/martin-stemmer-98168a349
                        </Link>
                    </BodyText>

                    <BodyText>
                        <strong>GitHub:</strong>{" "}
                        <Link href="https://github.com/Martin187187" target="_blank" rel="noopener noreferrer">
                            github.com/Martin187187
                        </Link>
                    </BodyText>

                    <ContactButton variant="contained" href="mailto:martin-stemmer@t-online.de">
                        Contact Me
                    </ContactButton>
                </InfoCardContent>
            </InfoCard>

            {/* Skills with ranking */}
            <SectionHeader>Skills & Expertise</SectionHeader>
            <FlexContainer>
                <FlexItem>
                    <SkillCard>
                        <InfoCardContent>
                            <Typography variant="h6" gutterBottom>
                                Lots of skills
                            </Typography>
                            <BodyText>
                                skill1, skill2, too lazy to add all my skills, would take ages
                            </BodyText>
                            <SkillProgressBar variant="determinate" value={90} />
                        </InfoCardContent>
                    </SkillCard>
                </FlexItem>
                <FlexItem>
                    <SkillCard>
                        <InfoCardContent>
                            <Typography variant="h6" gutterBottom>
                                Lots of skills 2
                            </Typography>
                            <BodyText>
                                skill1, skill2, too lazy to add all my skills, would take ages
                            </BodyText>
                            <SkillProgressBar variant="determinate" value={20} />
                        </InfoCardContent>
                    </SkillCard>
                </FlexItem>
                <FlexItem>
                    <SkillCard>
                        <InfoCardContent>
                            <Typography variant="h6" gutterBottom>
                                Lots of skills 3
                            </Typography>
                            <BodyText>
                                skill1, skill2, too lazy to add all my skills, would take ages
                            </BodyText>
                            <SkillProgressBar variant="determinate" value={34} />
                        </InfoCardContent>
                    </SkillCard>
                </FlexItem>

            </FlexContainer>
            {/* Experience */}
            <SectionHeader>Work Experience</SectionHeader>
            <FlexContainer>
                <FlexItem>
                    <InfoCard>
                        <Typography variant="h6" gutterBottom>
                            It Consultant
                        </Typography>
                        <BodyText>
                            Duration: Oct 2023 - Oct 2024
                        </BodyText>
                        <BodyText>
                            Worked with OAuth, Docker,
                            Java Spring, React, Angular,
                            and CI/CD pipelines to
                            develop and deploy secure,
                            scalable applications.
                        </BodyText>
                    </InfoCard>
                </FlexItem>
            </FlexContainer>

            {/* Education */}
            <SectionHeader>Education</SectionHeader>
            <InfoCard2>
                <Typography variant="h6" gutterBottom>
                    Master's in Computer Science | TU Darmstadt
                </Typography>
                <BodyText>
                    Graduated: 2025
                </BodyText>
                <BodyText>
                    Specialized in machine
                    learning (NLP, reinforcement
                    learning, deep learning),
                    cloud-based distributed
                    modern databases and
                    economics.
                </BodyText>
            </InfoCard2>

            <InfoCard2>
                <Typography variant="h6" gutterBottom>
                    Bachelor's in Computer Science | TU Darmstadt
                </Typography>
                <BodyText>
                    Graduated: 2023
                </BodyText>
                <BodyText>
                    Fundamentals from hardware
                    to software, including an
                    introduction to machine
                    learning.
                </BodyText>
            </InfoCard2>
            {/* Projects */}
            <SectionHeader>Projects</SectionHeader>
            <Projects />

        </>
    );
}
