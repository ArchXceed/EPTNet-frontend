import React, { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import MenuHeader from "./components/menu-header";

export function EmojiManager(): JSX.Element {
    const [emojis, setEmojis] = useState<{ id: string; name: string; url: string }[]>([]);
    const [newEmojiName, setNewEmojiName] = useState("");
    const [newEmojiFile, setNewEmojiFile] = useState<File | null>(null);

    const handleAddEmoji = () => {
        if (!newEmojiName || !newEmojiFile) return;

        const newEmoji = {
            id: `:${newEmojiName.toLowerCase()}:`,
            name: newEmojiName,
            url: URL.createObjectURL(newEmojiFile),
        };

        setEmojis([...emojis, newEmoji]);
        setNewEmojiName("");
        setNewEmojiFile(null);
    };

    const handleDeleteEmoji = (id: string) => {
        setEmojis(emojis.filter((emoji) => emoji.id !== id));
    };

    const handleUpdateEmoji = (id: string, newName: string) => {
        setEmojis(
            emojis.map((emoji) =>
                emoji.id === id ? { ...emoji, name: newName, id: `:${newName.toLowerCase()}:` } : emoji
            )
        );
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Gestionnaire d'Emojis</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <Input
                            type="text"
                            placeholder="Nom de l'emoji"
                            value={newEmojiName}
                            onChange={(e) => setNewEmojiName(e.target.value)}
                        />
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewEmojiFile(e.target.files?.[0] || null)}
                        />
                        <Button onClick={handleAddEmoji}>Ajouter</Button>
                    </div>
                    <div className="space-y-2">
                        {emojis.map((emoji) => (
                            <div key={emoji.id} className="flex items-center justify-between p-2 border rounded">
                                <div className="flex items-center gap-4">
                                    <img src={emoji.url} alt={emoji.name} className="w-8 h-8" />
                                    <Input
                                        type="text"
                                        value={emoji.name}
                                        onChange={(e) => handleUpdateEmoji(emoji.id, e.target.value)}
                                    />
                                </div>
                                <Button variant="destructive" onClick={() => handleDeleteEmoji(emoji.id)}>
                                    Supprimer
                                </Button>
                            </div>
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
                <EmojiManager />
            </div>
        </ThemeProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);