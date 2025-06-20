
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode } from "react";
import "./globals.css";
import MenuHeader from "./components/menu-header";
import { SiteFooter } from "./components/footer";
import { MultiFilePyEditor } from "./components/python-code-editor"
import { MultiFileWebEditor } from "./components/web-code-editor"

const LANG = "web"; // python || web || error

function ScrollcodeifrEditor(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true} />
            {
                LANG === "python" ? (
                    <MultiFilePyEditor />
                ) : LANG === "web" ? (
                    <MultiFileWebEditor />
                ) : (
                    <div className="flex items-center justify-center h-screen">
                        <h1 className="text-2xl font-bold text-red-500">Error: Unsupported language</h1>
                    </div>
                )
            }
            <SiteFooter autoHide={-1} />
        </ThemeProvider>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <ScrollcodeifrEditor />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}
