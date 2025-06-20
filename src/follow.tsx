import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import MenuHeader from "./components/menu-header"
import { SiteFooter } from "./components/footer";
import { FollowersPage } from "./components/followers-page";

function LoginPage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true} />
                <FollowersPage />
                <SiteFooter autoHide={-1}/>
            </div>
        </ThemeProvider>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <LoginPage />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}

// If on desktop, disable scrolling
function checkDesktop() {
    if (window.innerWidth > 640) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}
window.onresize = checkDesktop;
checkDesktop();
