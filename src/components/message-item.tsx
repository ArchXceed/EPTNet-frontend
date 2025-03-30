import { cn } from "@/lib/utils";

interface MessageItemProps {
    sender: string;
    message: string;
    isCurrentUser: boolean;
  }
  
  export function MessageItem({ sender, message, isCurrentUser }: MessageItemProps) {
    return (
      <div className={cn("flex flex-col gap-1", isCurrentUser ? "items-end" : "items-start")}>
        <div className="text-sm text-muted-foreground">{sender}</div>
        <div
          className={cn(
            "p-3 rounded-lg max-w-[70%]",
            isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
          )}
        >
          {message}
        </div>
      </div>
    );
  }