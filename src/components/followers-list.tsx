import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface Follower {
  id: string;
  name: string;
  isFollowing: boolean;
  isPublic: boolean;
}

interface FollowersListProps {
  followers: Follower[];
  onFollowToggle: (id: string) => void;
  onVisibilityToggle: (id: string) => void;
}

export function FollowersList({ followers, onFollowToggle, onVisibilityToggle }: FollowersListProps) {
  return (
    <div className="space-y-4">
      {followers.map((follower) => (
        <div key={follower.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <span className="font-medium">{follower.name}</span>
            <Checkbox
              checked={follower.isPublic}
              onCheckedChange={() => onVisibilityToggle(follower.id)}
            />
            <span className="text-sm text-gray-500">
              {follower.isPublic ? "Public" : "Private"}
            </span>
          </div>
          <Button
            variant={follower.isFollowing ? "destructive" : "default"}
            onClick={() => onFollowToggle(follower.id)}
          >
            {follower.isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      ))}
    </div>
  );
}