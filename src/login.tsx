import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode } from "react";
import { Button } from "@/components/ui/button";
import { createRoot } from "react-dom/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"; // Import Card components
import MenuHeader from "./components/menu-header";
import "./globals.css";
import { SiteFooter } from "@/components/footer";


function LoginPage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                {/* Header */}
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true}></MenuHeader>

                {/* Centered Login Card */}
                <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen bg-[--background] p-4 sm:p-6">
                    <Card className="w-full sm:w-96 md:w-1/2 lg:w-1/3">
                        <CardHeader>
                            <CardTitle className="text-center text-[--foreground]">Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div> {/* Form */}
                                <div className="mb-4">
                                    <Label className="block text-[--foreground] text-sm font-bold mb-2" htmlFor="username">
                                        Nom d'utilisateur
                                    </Label>
                                    <Input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-[--foreground] bg-[--input] border-[--border] leading-tight focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="mb-6">
                                    <Label className="block text-[--foreground] text-sm font-bold mb-2" htmlFor="password">
                                        Mot de passe
                                    </Label>
                                    <Input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-[--foreground] bg-[--input] border-[--border] mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button type="submit" className="bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]/90 w-full">
                                        Se connecter
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="text-sm text-[--muted-foreground] text-center">
                            <a href="/register" className="text-[--primary] hover:underline">Vous n'avez pas de compte? Demandez-en un!</a>
                        </CardFooter>
                    </Card>
                </div>
                <SiteFooter autoHide={-1}></SiteFooter>
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
