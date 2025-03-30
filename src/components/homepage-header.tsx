import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export function Header() {
    return (
        <header className="homepage-header">
            <Card className="bg-[--card] text-[--card-foreground] border-[--border] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-4xl font-bold">
                        Le réseau social <span className="text-[--primary]">Open Source</span> pour élèves
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-xl">
                    <p>
                        Bienvenue sur notre réseau social dédié aux élèves. Connectez-vous, partagez et collaborez en toute simplicité.
                    </p>
                    <Button className="cursor-pointer mt-10" onClick={() => { location.href = "/register" }}>
                        Commencer
                    </Button>
                </CardContent>
            </Card>
        </header>
    );
}