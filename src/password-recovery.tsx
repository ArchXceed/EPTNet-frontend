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


const shoolEmailDomain = "edu.vs.ch"; // TODO Hardcoded, should be fetched from the backend

function RegisterPage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                {/* Header */}
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true}></MenuHeader>

                {/* Centered Login Card */}
                <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen bg-[--background] p-4 sm:p-6">
                    <Card className="w-full sm:w-96 md:w-1/2 lg:w-1/3">
                        <CardHeader>
                            <CardTitle className="text-center text-[--foreground]">Récupération de Mot de Passe</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div> {/* Formulaire */}
                                <div className="mb-4">
                                    <Label className="block text-[--foreground] text-sm font-bold mb-2" htmlFor="email">
                                        Adresse E-mail
                                    </Label>
                                    <Input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-[--foreground] bg-[--input] border-[--border] leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder={"xyz.xyz@" + shoolEmailDomain}
                                        onBlur={(e) => {
                                            const email = e.target.value;
                                            const regex = new RegExp(`^[a-zA-Z0-9._%+-]+@${shoolEmailDomain}$`);
                                            if (!regex.test(email)) {
                                                alert("L'email doit être de la forme xyz.xyz@" + shoolEmailDomain); // TODO Replace with a more user-friendly error message
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Button type="submit" className="bg-[--primary] text-[--primary-foreground] hover:bg-[--primary]/90 w-full">
                                        Envoyer la Demande
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="text-sm text-[--muted-foreground] text-center">
                            <a href="/login" className="text-[--primary] hover:underline">Retour à la page de connexion</a>
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
            <RegisterPage />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}

function checkDesktop() {
    if (window.innerWidth > 640) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}
window.onresize = checkDesktop;
checkDesktop();
