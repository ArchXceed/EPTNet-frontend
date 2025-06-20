import { useState } from "react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail, SidebarProvider, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarGroupContent } from "@/components/ui/sidebar";
import { sidebarItems, SidebarItem } from "@/globals";


export default function AppSidebar() {
    const [activeItem, setActiveItem] = useState<SidebarItem | null>(null);

    return (
        <SidebarProvider>
            <div className="flex w-full">
                <Sidebar variant="sidebar" collapsible="icon" style={{ zIndex: 6 }}>
                    <SidebarHeader>
                        <div className="p-4 font-bold text-lg">EPTNet Account</div>
                    </SidebarHeader>

                    <SidebarContent className="overflow-y-auto">
                        {sidebarItems.map((category) => (
                            <SidebarGroup key={category.title}>
                                <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
                                <SidebarGroupContent>

                                    <SidebarMenu>
                                        {category.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    onClick={() => setActiveItem(item)}
                                                    className={`flex items-center gap-2 ${activeItem?.title === item.title ? "bg-muted" : ""}`}
                                                >
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>

                        ))}
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
    );
}
