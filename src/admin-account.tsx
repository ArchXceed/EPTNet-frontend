
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { ChevronUpDownIcon, CheckIcon, EyeIcon } from "@heroicons/react/24/solid"
import { JSX, StrictMode, useState } from "react";
import "./globals.css";
import MenuHeader from "./components/menu-header";
import { SiteFooter } from "./components/footer";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "./components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label";
import { TrashIcon } from "lucide-react";

function SearchBar(): JSX.Element {
    return (
        <Card className="w-full max-w-3xl mx-auto my-8 p-6">
            <Input placeholder="Search..." />
            <div className="mt-4 flex justify-between">
                <Button>
                    Search
                </Button>
            </div>
        </Card>
    )
}

function ResultCard({ username, first_name, last_name, points, rank }: { username: string; first_name: string; last_name: string; points: number; rank: number }): JSX.Element {
    return (
        <Card className="mb-4 p-4 w-[100%] sm:w-[50vw]">
            <h2 className="text-lg font-semibold">{username}</h2>
            <p className="text-sm text-gray-600">{first_name} {last_name}</p>
            <Button className="mt-2">
                <EyeIcon className="w-4 h-4 mr-2" />
                View Profile
            </Button>
            <div className="flex justify-around text-bm border-t pt-2 mt-2">
                <span>Points: {points}</span>
                <span>Rank: {rank}</span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">Actions</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="leading-none font-medium">Account</h4>
                                <p className="text-muted-foreground text-sm">
                                    Set the account details for this user.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="points">Points</Label>
                                    <Input
                                        id="points"
                                        defaultValue="0"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="rank">Rank</Label>
                                    <Input
                                        id="rank"
                                        defaultValue="2"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="rolename">Role</Label>
                                    <Input
                                        id="rolename"
                                        defaultValue="User"
                                        className="col-span-2 h-8"
                                    />
                                    <Button variant="outline" className="h-8">
                                        Add
                                    </Button>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="deleteUser">Delete/Ban</Label>
                                    <Button variant="outline" className="h-8">
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </Card>
    )
}

function ScrollcodePage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true} />
                <SearchBar />
                <div className="flex flex-col items-center h-80 overflow-y-auto">
                    <ResultCard
                        username="john_doe"
                        first_name="John"
                        last_name="Doe"
                        points={1500}
                        rank={1}
                    />
                    <ResultCard
                        username="jane_smith"
                        first_name="Jane"
                        last_name="Smith"
                        points={1400}
                        rank={2}
                    />
                    <ResultCard
                        username="alice_jones"
                        first_name="Alice"
                        last_name="Jones"
                        points={1300}
                        rank={3}
                    />
                </div>
                <SiteFooter autoHide={-1} />
            </div>
        </ThemeProvider >
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
