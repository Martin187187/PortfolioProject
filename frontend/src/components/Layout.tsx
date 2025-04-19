import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function Layout() {
    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Portfolio
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/projects">Projects</Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ marginTop: 4 }}>
                <Outlet />
            </Container>
        </div>
    );
}
