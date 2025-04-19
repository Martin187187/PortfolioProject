import { useParams } from "react-router-dom";
import { Typography, Paper } from "@mui/material";

const projectDetails = [
    { title: "Project A", content: "Details about Project A..." },
    { title: "Project B", content: "Details about Project B..." },
    { title: "Project C", content: "Details about Project C..." }
]

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const project = id ? projectDetails[parseInt(id)] : null;

    if (!project) {
        return <Typography>Project not found.</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                {project.title}
            </Typography>
            <Typography variant="body1">
                {project.content}
            </Typography>
        </Paper>
    );
}
