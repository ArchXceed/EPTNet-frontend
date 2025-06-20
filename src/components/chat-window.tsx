import { MessageList, Message } from "./message-list";
import { MessageInput } from "./message-input";

interface ChatWindowProps {
  messages: Message[];
  onSend: (message: string) => void;
}

export function ChatWindow({ messages, onSend }: ChatWindowProps) {
  return (
    <div className="flex-1 flex flex-col h-[80vh]">
      <MessageList messages={messages} />
      <MessageInput onSend={onSend} />
    </div>
  );
}