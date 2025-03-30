import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";

export function EmojiSelector({ emojis }: { emojis: { id: string; name: string }[] }) {
    const [inputValue, setInputValue] = useState("");

    const handleSelectEmoji = (emojiId: string) => {
        setInputValue((prev) => `${prev} $(${emojiId}) `);
    };

    return (
        <div className="space-y-4">
            <Combobox
                options={emojis.map((emoji) => ({ value: emoji.id, label: emoji.name }))}
                onSelect={handleSelectEmoji}
                placeholder="Rechercher un emoji..."
            />
            <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Écrivez quelque chose..."
            />
        </div>
    );
}