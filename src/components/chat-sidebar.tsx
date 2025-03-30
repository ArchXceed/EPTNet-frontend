import { Button } from "@/components/ui/button";

interface ChatSidebarProps {
  onSelectChat: (chatId: string) => void;
}

export function ChatSidebar({ onSelectChat }: ChatSidebarProps) {
  const publicRooms = ["General", "Random", "Tech Talk"];
  const privateChats = ["Alice", "Bob", "Charlie"];

  return (
    <div className="w-64 bg-background border-r p-4">
      <h2 className="text-lg font-bold mb-4">Public Salons</h2>
      <div className="space-y-2">
        {publicRooms.map((room) => (
          <Button
            key={room}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onSelectChat(`room:${room}`)}
          >
            # {room}
          </Button>
        ))}
      </div>

      <h2 className="text-lg font-bold mt-6 mb-4">Private Chats</h2>
      <div className="space-y-2">
        {privateChats.map((user) => (
          <Button
            key={user}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onSelectChat(`user:${user}`)}
          >
            @ {user}
          </Button>
        ))}
      </div>
    </div>
  );
}