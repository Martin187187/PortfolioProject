import { Typography, Box, Divider, Link } from "@mui/material";
import { styled } from '@mui/system';

const SectionHeader = styled(Typography)({
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
});

const BodyText = styled(Typography)({
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'left',
});

const Impressum = () => {
    return (
        <Box sx={{ padding: '40px' }}>
            <SectionHeader>Impressum</SectionHeader>
            <BodyText>
                <strong>Information in accordance with Section 5 TMG (Telemedia Act):</strong>
            </BodyText>
            <BodyText>
                <strong>Martin Stemmer</strong>
                <br />
                Stephan Straße 14
                <br />
                64295 Darmstadt
                <br />
                Germany
            </BodyText>

            <Divider sx={{ margin: '20px 0' }} />

            <BodyText>
                <strong>Contact:</strong>
            </BodyText>
            <BodyText>
                Email: <Link href="mailto:martin-stemmer@t-online.de">martin-stemmer@t-online.de</Link>
                <br />
                Phone: +49 175 7031473
            </BodyText>


            <BodyText>
                <strong>Disclaimer:</strong>
                <br />
                This website contains information for general informational purposes only. The content is not legally binding, and the site owner does not accept any responsibility for the accuracy, completeness, or reliability of the content provided.
            </BodyText>

            <Divider sx={{ margin: '20px 0' }} />

            <BodyText>
                <strong>Responsible for content according to Section 55 RStV:</strong>
                <br />
                Martin Stemmer
            </BodyText>
        </Box>
    );
};

export default Impressum;
