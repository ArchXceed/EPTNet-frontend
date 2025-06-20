
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { JSX, StrictMode, useState } from "react";
import "./globals.css";
import MenuHeader from "./components/menu-header";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    SidebarProvider
} from "@/components/ui/sidebar"
import { CodeIcon, LaughIcon, NotebookIcon } from "lucide-react";
import MemeCreator from "@/components/memecreator";
import { SidebarItem } from "./globals";
import { MultiFileWebEditor } from "./components/web-code-editor";
import { MultiFilePyEditor } from "./components/python-code-editor";
import HomeworkForm from "./components/homework-form";

// Menu items.
const items: Array<SidebarItem> = [
    {
        title: "Scrollcode (Web)",
        icon: <CodeIcon />,
        renderedContent: <MultiFileWebEditor />
    },
    {
        title: "Scrollcode (Python)",
        icon: <CodeIcon />,
        renderedContent: <MultiFilePyEditor />
    },
    {
        title: "Jokescroll",
        icon: <LaughIcon />,
        renderedContent: <MemeCreator />
    },
    {
        title: "Homework",
        icon: <NotebookIcon />,
        renderedContent: <HomeworkForm />
    }
]

export function AppSidebar() {
    const [activeItem, setActiveItem] = useState<SidebarItem | null>(null);
    return (
        <SidebarProvider>

            <div className="flex w-full">

                <Sidebar variant="sidebar" collapsible="icon">
                    <SidebarHeader>
                        <div className="p-4 font-bold text-lg">EPTNet Post</div>
                    </SidebarHeader>
                    <SidebarContent style={{ height: "10vh", overflowY: "hidden" }}>
                        <SidebarGroup>
                            <SidebarGroupLabel>Post something!</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild onClick={() => setActiveItem(item)}>
                                                <a className="cursor-pointer flex items-center gap-2">
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="p-4 text-xs text-muted-foreground">
                        EPTNet by <a href="https://youtube.com/@Loines" target="_blank" rel="noopener noreferrer">Lyam Zambaz</a>
                        License: <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">CC BY 4.0</a>
                    </SidebarFooter>

                    <SidebarRail />
                </Sidebar>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <SidebarTrigger className="-ml-1" />
                    </header>
                    <div className="flex-1 p-6 w-full">
                        {activeItem ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">{activeItem.title}</h2>
                                {activeItem.renderedContent}
                            </div>
                        ) : (
                            <div className="text-muted-foreground">Sélectionne une option dans la sidebar</div>
                        )}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider >
    )
}

function ScrollcodePage(): JSX.Element {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div>
                {/* Header */}
                <MenuHeader isAdmin={true} isConnected={true} displayThemeToggle={true}></MenuHeader>

                {/* Centered Login Card */}
                <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen bg-[--background] p-4 sm:p-6">
                    <AppSidebar></AppSidebar>
                </div>
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

// If on desktop, disable scrolling
function checkDesktop() {
    if (window.innerWidth > 640) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}
window.onresize = checkDesktop;
checkDesktop();