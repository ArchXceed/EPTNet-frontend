import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"


export default function ListItem({ href, title, children }: { href: string, title: string, children: React.ReactNode }) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    href={href}
                    className="block p-3 hover:bg-[--accent] rounded-md"
                >
                    <div className="font-semibold text-[--foreground]">{title}</div>
                    <p className="text-sm text-[--muted-foreground]">{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    );
}
