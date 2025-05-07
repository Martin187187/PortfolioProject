import React from "react";
import {Button, Typography, Paper, Box, CircularProgress, Link, CardMedia} from "@mui/material";
import { styled } from "@mui/system";
import GitHubIcon from '@mui/icons-material/GitHub';

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

const ButtonWrapper = styled(Box)({
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
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

const DemoButton = styled(Button)({
    backgroundColor: "#006064",
    color: "#ffffff",
    textTransform: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    '&:hover': {
        backgroundColor: "#004d47",
    },
});

const ProjectImage = styled(CardMedia)({
    height: '500px', // Fixed height for image
    width: '100%',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    transition: 'opacity 0.3s ease',
    '&:hover': {
        opacity: 0.8,
    },
});


export default function InfoPage() {
    return (
        <MainWrapper>
            <ContentWrapper>
                <Section>
                    <Typography variant="h3" fontWeight="bold">
                        Word Embedding Challenge
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        This challenge demonstrates how word embeddings can be used to compute relationships between words using simple vector algebra.
                    </Typography>
                </Section>

                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        How to Play
                    </Typography>
                    <Typography variant="body1">
                        In this game, you are given two words. Your task is to find a word that fits the pattern. The correct answer is derived by computing the average of both words' embeddings. Simply type your answer in the input field and hit "Submit Answer."
                    </Typography>
                </Section>

                <Section>
                    <ButtonWrapper>
                        <DemoButton
                            variant="contained"
                            href="/similar-words" // Link to the actual demo
                            rel="noopener noreferrer"
                        >
                            Try the Demo
                        </DemoButton>

                        <GithubButton
                            variant="contained"
                            startIcon={<GitHubIcon />}
                            href="https://github.com/Martin187187/PortfolioProject" // GitHub repo link
                            rel="noopener noreferrer"
                        >
                            View Source Code
                        </GithubButton>
                    </ButtonWrapper>
                </Section>
                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        How It Was Implemented
                    </Typography>
                    <Typography variant="body1">
                        The demo uses a pre-trained Word2Vec model to create word embeddings. The embeddings of two input words are averaged, and the best-fitting word is selected based on this average vector.
                    </Typography>
                    <Typography variant="body1">
                        Word embeddings are essentially a mathematical representation of words in a multi-dimensional space. By averaging the embeddings of two words, we can create a vector that lies roughly in the middle, representing a word that captures the relationships of both words.
                    </Typography>
                    <Typography variant="body1">
                        Here's an illustration of how vector addition works in the embedding space: you can think of the word "king" as one point in this space and the word "queen" as another. The average of these embeddings will bring us to a word like "woman," demonstrating the power of embedding algebra.
                    </Typography>

                    <ProjectImage image={"https://miro.medium.com/v2/resize:fit:1400/1*KKqG9xsWkiDxloCJkpI39Q.png"} title="Embedding Algebra" />
                </Section>

                <Section>
                    <Typography variant="h5" fontWeight="bold">
                        Why Pretrained Embeddings Can Be Better Than LLMs
                    </Typography>
                    <Typography variant="body1">
                        While large language models (LLMs) like GPT-3 are powerful, pretrained embeddings (like Word2Vec) can be much more efficient for certain tasks. Pretrained embeddings are computationally inexpensive and can capture semantic relationships very well without requiring the massive compute resources that LLMs do.
                    </Typography>
                    <Typography variant="body1">
                        In this case, using Word2Vec allows us to focus on vector operations, making it easier to compute word relationships with less computational overhead than training or querying a large LLM.
                    </Typography>
                </Section>


            </ContentWrapper>
        </MainWrapper>
    );
}
