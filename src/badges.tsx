import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import Image from "@/components/ui/image"
import { ThemeProvider } from "./components/theme-provider"
import MenuHeader from "./components/menu-header"
import React from "react"
import { createRoot } from "react-dom/client"
import "./globals.css";
import "./gradient.css";

const badges = [
    {
        name: "Beginner",
        image_path: "/badges/beginner.png",
        rarity: 1,
        description: "Awarded for starting your journey."
    },
    {
        name: "Explorer",
        image_path: "/badges/explorer.png",
        rarity: 2,
        description: "Awarded for exploring new areas."
    },
    {
        name: "Champion",
        image_path: "/badges/champion.png",
        rarity: 3,
        description: "Awarded for defeating tough opponents."
    },
    {
        name: "Legend",
        image_path: "/badges/legend.png",
        rarity: 4,
        description: "Awarded for legendary achievements."
    }
]

function getRarityColor(rarity: number): string {
    switch (rarity) {
        case 1:
            return "border-gray-400"
        case 2:
            return "border-blue-400"
        case 3:
            return "border-purple-500"
        case 4:
            return "animate-gradient multicolor bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500"
        default:
            return "border-gray-400"
    }
}

export default function BadgePage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Your Badges</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {badges.map((badge) => (
                    <TooltipProvider key={badge.name}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Card
                                    className={cn(
                                        "transition-transform hover:scale-105 border-4",
                                        getRarityColor(badge.rarity)
                                    )}
                                >
                                    <CardContent className="flex flex-col items-center p-4">
                                        <Image
                                            src={badge.image_path}
                                            alt={badge.name}
                                            width={64}
                                            height={64}
                                            className="mb-2"
                                        />
                                        <span className="text-lg font-semibold">{badge.name}</span>
                                    </CardContent>
                                </Card>
                            </TooltipTrigger>
                            <TooltipContent>{badge.description}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
        </div>
    )
}

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true}></MenuHeader>
                <BadgePage />
            </div>
        </ThemeProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);