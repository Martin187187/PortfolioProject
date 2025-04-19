import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import { CssBaseline } from "@mui/material";
import UserMetadata from "./pages/UserMetadata";

// Legal Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

export default function App() {
    return (
        <BrowserRouter>
            {/* CssBaseline applied globally for consistent styling */}
            <CssBaseline />

            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="metadata" element={<UserMetadata />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:id" element={<ProjectDetails />} />

                    {/* Add legal pages routes */}
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="terms-of-service" element={<TermsOfService />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
