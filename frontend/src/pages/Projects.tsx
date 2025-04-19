import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import { Link } from "react-router-dom";

interface Project {
    id: number;
    title: string;
    description: string;
}

const projects: Project[] = [
    { id: 1, title: "Project A", description: "An awesome project about X." },
    { id: 2, title: "Project B", description: "A cool project about Y." },
    { id: 3, title: "Project C", description: "An interesting project about Z." },
];

export default function Projects() {
    return (
        <Grid container spacing={4}>
            {projects.map((project) => (
                <Grid key={project.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {project.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {project.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                component={Link}
                                to={`/projects/${project.id}`}
                            >
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
