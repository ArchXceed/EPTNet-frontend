
import { JSX, useRef, useState, useEffect } from "react";
import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

let lastElementFontFunction: Function | null = null;

let imgRef: React.RefObject<HTMLImageElement | null>;

export default function MemeCreator(): JSX.Element {
    const memeTexts = [
        {
            text: "When you finally understand recursion",
            position: { x: 0, y: 50 },
            size: 10
        },
        {
            text: "When your code runs without errors",
            position: { x: 50, y: 100 },
            size: 12
        },
        {
            text: "When you find a bug in your code",
            position: { x: 50, y: 150 },
            size: 24
        }
    ];
    const [memeImage, setMemeImage] = useState("/memes/_0200403.jijf");

    const [texts, setTexts] = useState(memeTexts);
    const addText = (text: string) => {
        const newText = {
            text: text,
            position: { x: 50, y: 50 + texts.length * 50 }, // Stacking texts vertically
            size: 24
        };
        setTexts([...texts, newText]);
    };

    imgRef = useRef<HTMLImageElement | null>(null);

    const [imageBounds, setImageBounds] = useState({ top: 0, left: 0, width: 0, height: 0 });

    const updateImageBounds = () => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            setImageBounds({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        }
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <Card className="w-[75vw] relative">
                <div className="flex justify-around items-center p-4">
                    <img src={memeImage} alt="Meme Image" style={{ height: "50vh" }} draggable={false} ref={imgRef} onLoad={updateImageBounds} />
                    <div className="flex flex-col gap-10 w-[50%]">

                        <div className="border p-4 w-[50%] rounded-lg flex flex-col gap-4 m-auto">
                            <Input placeholder="Enter meme text" ref={inputRef} />
                            <Button onClick={() => addText(inputRef.current?.value || "")}>
                                Add Text
                            </Button>
                        </div>
                        <div className="border w-[75%] rounded-lg flex flex-col gap-4 m-auto h-[50px] relative">
                            <span className="absolute translate-y-[-50%]">Font Size:</span>
                            <Slider
                                defaultValue={[24]}
                                max={100}
                                min={10}
                                step={1}
                                onValueChange={(value) => {
                                    if (lastElementFontFunction) {
                                        lastElementFontFunction(value[0]);
                                    }
                                }}
                                className="m-auto w-[90%]"
                            />
                        </div>
                    </div>
                </div>
                <Button className="absolute bottom-4 right-4">
                    Post it!
                </Button>
            </Card>
            <div className="texts" style={{ position: "fixed", top: imageBounds.top + "px", left: imageBounds.left + "px", width: imageBounds.width + "px", height: imageBounds.height + "px" }} >
                {texts.map((text, index) => (
                    <Text key={index} text={text.text} position={text.position} size={text.size} />
                ))}
            </div>
        </>
    )
}

function Text(props: { text: string; position: { x: number; y: number }, size: number }): JSX.Element {

    const [position, setPosition] = useState<{ x: number; y: number }>(props.position);

    const [isDragging, setIsDragging] = useState(false);

    const [lastMousePosition, setLastMousePosition] = useState<{ x: number; y: number } | null>(null);

    const [zIndex, setZIndex] = useState(1);

    const [textSize, setTextSize] = useState(props.size);
    function handleTouchStart(event: React.TouchEvent) {
        lastElementFontFunction = (size: number) => {
            setTextSize(size);
        };
        setIsDragging(true);
        setZIndex(10);
        setLastMousePosition({
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        });
    }

    function handleTouchMove(event: React.TouchEvent) {
        if (isDragging) {
            if (lastMousePosition) {
                const rect = (event.target as HTMLElement).parentElement?.getBoundingClientRect();
                if (!rect) return;

                const scaleX = 300 / rect.width;
                const scaleY = 300 / rect.height;

                const deltaX = (event.touches[0].clientX - lastMousePosition.x) * scaleX;
                const deltaY = (event.touches[0].clientY - lastMousePosition.y) * scaleY;

                const newX = position.x + deltaX;
                const newY = position.y + deltaY;

                const constrainedX = Math.max(0, Math.min(newX, 300));
                const constrainedY = Math.max(0, Math.min(newY, 300));

                setPosition({ x: constrainedX, y: constrainedY });
                setLastMousePosition({
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                });
            } else {
                setLastMousePosition({
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                });
            }
        }
        event.preventDefault();
    }

    function handleTouchEnd() {
        setIsDragging(false);
        setLastMousePosition(null);
        setZIndex(0);
    }

    function handleMouseDown(event: React.MouseEvent) {
        lastElementFontFunction = (size: number) => {
            setTextSize(size);
        };
        setIsDragging(true);
        setZIndex(10);
    }

    function handleMouseMove(event: React.MouseEvent) {
        if (isDragging && lastMousePosition) {
            const rect = (event.target as HTMLElement).parentElement?.getBoundingClientRect();
            if (!rect) return;

            const scaleX = 300 / rect.width;
            const scaleY = 300 / rect.height;

            const deltaX = (event.clientX - lastMousePosition.x) * scaleX;
            const deltaY = (event.clientY - lastMousePosition.y) * scaleY;

            const newX = position.x + deltaX;
            const newY = position.y + deltaY;

            const constrainedX = Math.max(0, Math.min(newX, 300));
            const constrainedY = Math.max(0, Math.min(newY, 300));

            setPosition({ x: constrainedX, y: constrainedY });
            setLastMousePosition({ x: event.clientX, y: event.clientY });
        } else if (isDragging) {
            setLastMousePosition({ x: event.clientX, y: event.clientY });
        }
    }

    function handleMouseUp() {
        setIsDragging(false);
        setLastMousePosition(null);
        setZIndex(0);
    }

    function handleMouseLeave() {
        if (isDragging) {
            setIsDragging(false);
            setLastMousePosition(null);
            setZIndex(0);
        }
        document.body.addEventListener("click", () => {
            if (textRef.current) {
                textRef.current.contentEditable = "false";
            }
        }, { once: true });
    }

    function handleDoubleClick() {
        lastElementFontFunction = (size: number) => {
            setTextSize(size);
        };
        if (textRef.current) {
            textRef.current.contentEditable = "true";
        }
    }

    const textRef = useRef<HTMLDivElement | null>(null);
    // Update font size on component render, not just on image load
    const [calculatedFontSize, setCalculatedFontSize] = useState<string>(`${textSize}px`);

    // Update font size when textSize changes or when image loads
    React.useEffect(() => {
        if (textRef.current?.parentElement) {
            const parentWidth = textRef.current.parentElement.getBoundingClientRect().width;
            setCalculatedFontSize(`${(textSize / 300) * parentWidth}px`);
        }

    }, [textSize, imgRef.current?.getBoundingClientRect().width]);



    return (
        <div
            style={{
                position: "absolute",
                left: `${(position.x / 300) * (textRef.current?.parentElement?.getBoundingClientRect().width || 300)}px`,
                top: `${(position.y / 300) * (textRef.current?.parentElement?.getBoundingClientRect().height || 300)}px`,
                color: "white",
                border: "2px dotted white",
                textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                fontWeight: "bold",
                cursor: "move",
                userSelect: "none",
                zIndex: zIndex,
                fontSize: calculatedFontSize,
                transformOrigin: "left top",
                touchAction: "none"
            }}
            ref={textRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onDoubleClick={handleDoubleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            draggable={false}
        >
            {props.text}
        </div>
    );
}