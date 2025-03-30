import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MenuHeader from "./components/menu-header";
import "./globals.css";
import Sidebar from "@/components/dashboard-sidebar";


function LoginPage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                {/* Header */}
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true}></MenuHeader>

                {/* Centered Login Card */}
                <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen bg-[--background] p-4 sm:p-6">
                    <Sidebar></Sidebar>
                </div>
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
