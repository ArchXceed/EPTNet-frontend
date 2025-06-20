import React, { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import MenuHeader from "./components/menu-header";
import { GetAccountCard } from "./components/dashboard-forms";

const userInfo = {
    username: "john_doe",
    first_name: "John",
    last_name: "Doe",
    rank: 5,
    posts: [
        { id: 1, title: "First Post", content: "This is the content of the first post." },
        { id: 2, title: "Second Post", content: "This is the content of the second post." }
    ]
}

export function UserProfile(): JSX.Element {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Profil de l'utilisateur</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <GetAccountCard></GetAccountCard>
                    <Input placeholder="Search posts..." />
                    <div className="space-y-2">
                        {userInfo.posts.map(post => (
                            <Card key={post.id} className="p-4">
                                <h3 className="font-semibold">{post.title}</h3>
                                <Button variant="outline" className="mt-2">
                                    <span>View Post</span>
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true}></MenuHeader>
                <UserProfile />
            </div>
        </ThemeProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);