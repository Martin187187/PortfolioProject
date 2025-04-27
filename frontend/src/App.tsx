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
import Game from "./components/Game";
import {Provider} from "react-redux";
import {store} from "./store";
import SimilarWordsProject from "./pages/SimilarWordsProject";

export default function App() {
    return (
        <BrowserRouter>
            {/* CssBaseline applied globally for consistent styling */}
            <CssBaseline />

            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="metadata" element={<UserMetadata />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="projects/0" element={<ProjectDetails />} />
                        <Route path="projects/1" element={<SimilarWordsProject />} />
                        <Route path="similar-words" element={<Game />} />

                        {/* Add legal pages routes */}
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="terms-of-services" element={<TermsOfService />} />
                    </Route>
                </Routes>
            </Provider>
        </BrowserRouter>
    );
}
