import { MessageItem } from "./message-item";

export interface Message {
  id: string;
  sender: string;
  message: string;
  isCurrentUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          sender={msg.sender}
          message={msg.message}
          isCurrentUser={msg.isCurrentUser}
        />
      ))}
    </div>
  );
}