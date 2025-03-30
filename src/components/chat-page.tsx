import { useState } from "react";
import { ChatSidebar } from "../components/chat-sidebar";
import { ChatWindow } from "../components/chat-window";
import { Message } from "./message-list";

export function ChatPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        sender: "You",
        message,
        isCurrentUser: true,
      },
    ]);
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar onSelectChat={setActiveChat} />
      {activeChat ? (
        <ChatWindow messages={messages} onSend={handleSendMessage} />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}