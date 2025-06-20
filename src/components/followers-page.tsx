import { useState } from "react";
import { SearchBar } from "../components/search-bar";
import { FollowersList, Follower } from "../components/followers-list";

export function FollowersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [followers, setFollowers] = useState<Follower[]>([
    { id: "1", name: "Alice", isFollowing: true, isPublic: true },
    { id: "2", name: "Bob", isFollowing: false, isPublic: false },
    { id: "3", name: "Charlie", isFollowing: true, isPublic: true },
  ]);

  const handleFollowToggle = (id: string) => {
    setFollowers((prev) =>
      prev.map((follower) =>
        follower.id === id
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );
  };

  const handleVisibilityToggle = (id: string) => {
    setFollowers((prev) =>
      prev.map((follower) =>
        follower.id === id
          ? { ...follower, isPublic: !follower.isPublic }
          : follower
      )
    );
  };

  const filteredFollowers = followers.filter((follower) =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Followers</h1>
      <SearchBar
        placeholder="Search followers..."
        value={searchQuery}
        onChange={setSearchQuery}
      />
      <FollowersList
        followers={filteredFollowers}
        onFollowToggle={handleFollowToggle}
        onVisibilityToggle={handleVisibilityToggle}
      />
    </div>
  );
}