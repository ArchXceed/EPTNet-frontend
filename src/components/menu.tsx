import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ListItem from "./list-items"
import { JSX } from "react";
import { pages } from "@/globals";


function Menu(props: { isConnected: boolean, isAdmin: boolean }): JSX.Element {
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex flex-col sm:flex-row">
                {/* Authentication & User Management */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-[--background] text-[--foreground] hover:bg-[--accent]">
                        Autentification et gestion des utilisateurs
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-[--background] w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                        <ul className="grid gap-3 p-2 sm:p-3 md:p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-[.75fr_1fr]">
                            {pages.visitorsPages.map((page) => (
                                <ListItem key={page.title} href={page.href} title={page.title}>
                                    {page.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* User Profile & Social Features */}
                {props.isConnected && (<NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-[--background] text-[--foreground] hover:bg-[--accent]">
                        Profil utilisateur et fonctionnalités sociales
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-[--background] w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                        <ul className="grid gap-3 p-2 sm:p-3 md:p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-[.75fr_1fr]">
                            {pages.userPages.map((page) => (
                                <ListItem key={page.title} href={page.href} title={page.title}>
                                    {page.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>)}

                {/* Social Network & Content Creation */}
                {props.isConnected && (<NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-[--background] text-[--foreground] hover:bg-[--accent]">
                        Réseau social et création de contenu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-[--background] w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                        <ul className="grid gap-3 p-2 sm:p-3 md:p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-[.75fr_1fr]">
                            {pages.networkPages.map((page) => (
                                <ListItem key={page.title} href={page.href} title={page.title}>
                                    {page.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>)}

                {/* Admin & Moderation (Conditional) */}
                {props.isAdmin && (
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-[--background] text-[--foreground] hover:bg-[--accent]">
                            Admin & Modération
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-[--background] w-full sm:w-[300px] md:w-[400px] lg:w-[500px]">
                            <ul className="grid gap-3 p-2 sm:p-3 md:p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-[.75fr_1fr]">
                                {pages.adminPages.map((page) => (
                                    <ListItem key={page.title} href={page.href} title={page.title}>
                                        {page.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                )}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default Menu;