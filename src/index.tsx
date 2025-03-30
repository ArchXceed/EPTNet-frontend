import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "@/components/homepage-header";
import MenuHeader from "./components/menu-header";
import { SiteFooter } from "@/components/footer";
import "./gradient.css";
import "./globals.css";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" force="dark">
            <div className="h-screen text-[--foreground]">
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={false}></MenuHeader>
                <Header />
                <SiteFooter autoHide={730}></SiteFooter>
            </div>
        </ThemeProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

document.body.classList.add("animate-gradient");