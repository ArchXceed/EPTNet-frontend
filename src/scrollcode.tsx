import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; // Button component from Shadcn/UI
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode } from "react";
import "./globals.css";
import MenuHeader from "./components/menu-header";
import { SiteFooter } from "./components/footer";

// Function to generate iframe with a dynamic ID
const createIframe = (id: string) => (
    <iframe
        src={`https://example.com/video/${id}`} // Replace with the URL of your iframe
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

const Scrollcode = () => {
    const [items, setItems] = useState<string[]>([]); // Array of video IDs
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Index of the current video

    let currentHeight: number = 0;

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
    

    // Load initial items when the component mounts
    useEffect(() => {
        loadMoreItems();
    }, []);

    return (
        <div
            ref={containerRef}
            onWheel={handleScroll}
            onScroll={handleScroll}
            style={{
                height: "80vh",
                overflowY: "scroll", // Allow vertical scroll
                padding: 0,
                margin: 0,
            }}
        >
            {/* Container for all iframes */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                {items.map((item, index) => (
                    <div
                        key={item}
                        style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            top: currentHeight + "%",
                            left: "0"
                        }}
                    >
                        {createIframe(item)}
                        {currentHeight += 100}
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
                    onClick={() => alert(`You liked ${items[currentIndex]}`)}
                    variant="outline"
                    style={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    Like
                </Button>
                <Button
                    onClick={() => window.location.href = `/usr?id=${items[currentIndex]}`}
                    variant="outline"
                    style={{ color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    Go to /usr?id={items[currentIndex]}
                </Button>
            </div>

            {loading && <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>}
        </div>
    );
};

function ScrollcodePage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true} />
                <Scrollcode />
                <SiteFooter autoHide={-1} />
            </div>
        </ThemeProvider>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <ScrollcodePage />
        </StrictMode>
    );
} else {
    console.error("Root element not found");
}
