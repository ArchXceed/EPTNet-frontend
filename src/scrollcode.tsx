
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode } from "react";
import "./globals.css";
import MenuHeader from "./components/menu-header";
import { SiteFooter } from "./components/footer";
import { Scroll } from "./components/scrollcode-page";

function ScrollcodePage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true} />
                <Scroll />
                <SiteFooter autoHide={-1} />
            </div>
        </ThemeProvider>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <ScrollcodePage />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}
