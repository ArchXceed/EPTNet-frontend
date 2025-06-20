import { ThemeProvider } from "@/components/theme-provider";
import { createRoot } from "react-dom/client";
import { JSX, StrictMode } from "react";
import "./globals.css";

const img = "/memes/_0200403.jijf"

function ScrollcodeifrViewer(): JSX.Element {
    document.body.style.backgroundColor = "var(--background)"
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <img src={img} alt="Meme" />
            </div>
        </ThemeProvider>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <ScrollcodeifrViewer />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}
