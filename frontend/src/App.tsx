import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import {CssBaseline} from "@mui/material";


export default function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>
                <CssBaseline /><Layout /></>}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}