import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

interface Metadata {
    [key: string]: string | number | boolean;
}

export default function UserMetadata() {
    const [metadata, setMetadata] = useState<Metadata>({});

    useEffect(() => {
        const getMetadata = async () => {
            const nav = window.navigator;
            const screen = window.screen;
            const connection = nav.connection || {};
            const locale = nav.language;
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const screenWidth = screen.width;
            const screenHeight = screen.height;
            const innerWidth = window.innerWidth;
            const innerHeight = window.innerHeight;
            const plugins = nav.plugins ? Array.from(nav.plugins).map(p => p.name) : [];
            const userAgent = nav.userAgent;
            const platform = nav.platform;
            const cpuCores = nav.hardwareConcurrency ?? "Unknown";
            const cookiesEnabled = nav.cookieEnabled;
            const touchSupport = "ontouchstart" in window;
            const geolocation = "Geolocation API can be used with consent";
            const localStorageUsage = "TBD (can be calculated)";
            const hasWebRTC = typeof RTCPeerConnection !== "undefined";
            const hasWebGL = !!document.createElement("canvas").getContext("webgl");

            // Collecting device metadata and ensuring all values are of the correct type
            return {
                "User Agent": userAgent,
                "Browser Language": locale,
                "Online": nav.onLine,
                "Platform": platform,
                "Vendor": nav.vendor,
                "Cookies Enabled": cookiesEnabled,
                "CPU Cores": cpuCores,
                "Touch Support": touchSupport,
                "Screen Width": screenWidth,
                "Screen Height": screenHeight,
                "Window Inner Width": innerWidth,
                "Window Inner Height": innerHeight,
                "Timezone": timezone,
                "Geolocation": geolocation,
                "Local Storage Usage": localStorageUsage,
                "Plugins": plugins.join(", ") || "None",
                "Has WebRTC Support": hasWebRTC,
                "Has WebGL Support": hasWebGL,
                "Web Notifications Enabled": "Notification" in window,
                "Language Preference": navigator.language,
                "Installed Fonts": "Not accessible through JavaScript",
                "Screen Color Depth": screen.colorDepth,
                "Orientation": screen.orientation?.type ?? "Unknown",
                "Available Device Storage": "Not accessible through JavaScript",
                "Device Pixel Ratio": window.devicePixelRatio,
                "Browser Window Location": window.location.href,
                "Time Since Last Activity": (Date.now() - window.performance.timing.navigationStart) / 1000 + " seconds",
            };
        };

        // Set the collected metadata
        getMetadata().then((data) => {
            setMetadata(data);
        });
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                User Metadata
            </Typography>
            <List>
                {Object.entries(metadata).map(([key, value]) => (
                    <ListItem key={key}>
                        <ListItemText
                            primary={key}
                            secondary={String(value)}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
