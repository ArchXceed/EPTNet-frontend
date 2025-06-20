import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; // Button component from Shadcn/UI
import "../infinitescroll.css"
import LikeButton from "./likebutton";

// Function to generate iframe with a dynamic ID
const createIframe = (id: string) => (
    <iframe
        src={`/iframes/jokescroll.html?id=${id}`} // Replace with the URL of your iframe
        width="100%"
        height="100%"
        title={`Video ${id}`}
        style={{
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            maxHeight: "80vh",
        }}
    />
);



export const Scroll = () => {
    const [items, setItems] = useState<string[]>([]); // Array of video IDs
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex] = useState(0); // Index of the current video
    const [clicked, setClicked] = useState(false);


    // Function to load more items (simulating an API call)
    const loadMoreItems = async () => {
        setLoading(true);
        setTimeout(() => {
            setItems((prevItems) => [
                ...prevItems,
                ...Array.from({ length: 5 }, (_, i) => `ID-${prevItems.length + i + 1}`)
            ]);
            setLoading(false);
        }, 1000);
    };

    let lastScroll = 0;

    const handleScroll = (event: React.UIEvent) => {
        event.preventDefault(); // Prevent default scrolling behavior

        const scrollTop = containerRef.current?.scrollTop

        if (scrollTop !== undefined) {
            if (lastScroll > scrollTop) {

            } else {

            }
        }
    };

    const handleClick = () => {
        setClicked(true);
        // onLike();

        setTimeout(() => {
            setClicked(false);
        }, 200); // durée de l'effet
    };
    // Load initial items when the component mounts
    useEffect(() => {
        loadMoreItems();
    }, []);

    return (
        <div
            ref={containerRef}
            onWheel={handleScroll}
            onScroll={handleScroll}
        >
            {/* Container for all iframes */}
            <div
                className="scroll-container"
                style={{
                    width: "100vw",
                    boxSizing: "border-box",
                    overflowY: "scroll",
                    maxHeight: "80vh",
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={item}
                        className="post"
                        id={"post-" + index}
                    >
                        {createIframe(item)}
                    </div>
                ))}
            </div>

            {/* Navigation buttons for interaction */}
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >


                <Button
                    onClick={() => window.location.href = `/usr?id=${items[currentIndex]}`}
                    variant="outline"
                    style={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.5)", cursor: "pointer" }}
                >
                    Visit profile
                </Button>
            </div>

            {loading && <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>}
            <LikeButton>

            </LikeButton>
        </div>
    );
};