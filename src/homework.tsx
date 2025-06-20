
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { ChevronUpDownIcon, CheckIcon, EyeIcon } from "@heroicons/react/24/solid"
import { JSX, StrictMode, useState } from "react";
import "./globals.css";
import MenuHeader from "./components/menu-header";
import { SiteFooter } from "./components/footer";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "./lib/utils";
import { Card } from "./components/ui/card";
import LikeButton from "./components/likebutton";

const classes: { value: string; label: string }[] = [
    {
        value: "in1a",
        label: "Informatique 1A",
    },
    {
        value: "in2a",
        label: "Informatique 2A",
    },
    {
        value: "in3a",
        label: "Informatique 3A",
    },
    {
        value: "in4a",
        label: "Informatique 4A",
    },
    {
        value: "mp1a",
        label: "Maturise Professionnelle 1A",
    }
    // Static, for now
]

const courses = [
    {
        value: "algorithms",
        label: "Algorithms",
    },
    {
        value: "data-structures",
        label: "Data Structures",
    },
    {
        value: "web-development",
        label: "Web Development",
    },
    {
        value: "machine-learning",
        label: "Machine Learning",
    },
    {
        value: "databases",
        label: "Databases",
    },
    {
        value: "allemand",
        label: "Allemand",
    }
    // Static, for now
]

export function Combobox(props: { list: { value: string; label: string }[], name: string }): JSX.Element {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? props.list.find((listElement) => listElement.value === value)?.label
                        : `Select ${props.name}...`}
                    <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={`Search ${props.name}...`} className="h-9" />
                    <CommandList>
                        <CommandEmpty>No {props.name} found.</CommandEmpty>
                        <CommandGroup>
                            {props.list.map((listElement) => (
                                <CommandItem
                                    key={listElement.label}
                                    value={`${listElement.value} ${listElement.label}`}
                                    onSelect={(currentValue) => {
                                        // Extract just the label part from the combined search value
                                        const selectedItem = props.list.find(item =>
                                            currentValue.includes(item.label));
                                        setValue(selectedItem?.value || "");
                                        setOpen(false);
                                    }}
                                >
                                    {listElement.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto",
                                            value === listElement.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


function SearchBar(): JSX.Element {
    return (
        <Card className="w-full max-w-3xl mx-auto sm:my-8 p-6">
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between sm:mb-4">
                <Combobox list={classes} name="class" />
                <Combobox list={courses} name="course" />
            </div>
            <Input placeholder="Search..." />
            <div className="sm:mt-4 flex flex-col gap-4 sm:flex-row justify-between">
                <Button className="pointer">Deep Search</Button>
                <Button className="pointer">I'm feeling lucky</Button>
            </div>
        </Card>
    )
}

function ResultCard({ title, description, img, views, likes }: { title: string; description: string; img: string; views: number; likes: number }): JSX.Element {
    return (
        <Card className="mb-4 p-4 w-[100%] sm:w-[50vw]">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
            <img src={img} alt={title} className="m-auto h-100" />
            <div className="flex justify-around text-bm border-t pt-2 mt-2">
                <span><EyeIcon className="inline-block mr-1 h-4 w-4" /> {views}</span>
                <span className="flex items-center w-20 justify-between"><LikeButton bundled={true}></LikeButton> {likes}</span>
            </div>
        </Card>
    )
}

function ScrollcodePage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true} />
                <SearchBar />
                <div className="flex flex-col items-center h-100 overflow-y-auto w-[100%] sm:w-[50vw]">
                    <ResultCard
                        title="Introduction to Algorithms"
                        description="La théorie d'introduction au algorithmes en M199."
                        img="/memes/_0200403.jijf"
                        views={1234}
                        likes={56}
                    />
                    <ResultCard
                        title="M106 Devois"
                        description="Réponses des devoirs."
                        img="/memes/_0200403.jijf"
                        views={5678}
                        likes={78}
                    />
                    <ResultCard
                        title="Correction de l'examen de M444"
                        description="Correction de l'examen de M444."
                        img="/memes/_0200403.jijf"
                        views={91011}
                        likes={90}
                    />
                </div>
                <SiteFooter autoHide={-1} />
            </div>
        </ThemeProvider >
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
