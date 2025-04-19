import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
}

export default function ProjectCard({ id, title, description }: ProjectCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" component={Link} to={`/projects/${id}`}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
