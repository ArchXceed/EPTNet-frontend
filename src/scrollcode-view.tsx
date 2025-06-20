
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode } from "react";
import "./globals.css";
import { MultiFilePyEditor } from "./components/python-code-editor"
import { MultiFileWebEditor } from "./components/web-code-editor"

const LANG = "python"; // python || web || error

function ScrollcodeifrViewer(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {
                LANG === "python" ? (
                    <MultiFilePyEditor runWhenReady={true} fullscreen={true} />
                ) : LANG === "web" ? (
                    <MultiFileWebEditor runWhenReady={true} fullscreen={true} />
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <h1 className="text-2xl font-bold text-red-500">Error: Unsupported language</h1>
                    </div>
                )}
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
