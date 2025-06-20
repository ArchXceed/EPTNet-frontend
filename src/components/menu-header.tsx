import ModeToggle from "./mode-toggle";;
import { JSX, useState } from "react";
import Menu from "./menu";
import { MenuIcon } from "lucide-react";

function MenuHeader(props: { isConnected: boolean, isAdmin: boolean, displayThemeToggle: boolean }): JSX.Element {
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const menuClass =
        "duration-[0.3s] main-menu border py-6 shadow-sm flex flex-col sm:flex-row items-center justify-between p-4 bg-[var(--card)] absolute sm:relative w-[100vw] z-[5]";
    const logo = (
        <a href="/"><img src="/favicon.png" width={50} alt="Logo" className="rounded-full mb-4 sm:mb-0" /></a>
    );
    const menuContent = (
        <>
            {logo}
            <Menu isConnected={props.isConnected} isAdmin={props.isAdmin} />
            {props.displayThemeToggle && <ModeToggle />}
        </>
    );

    return (
        <>
            {isMobile ? (
                <div>
                    <div
                        className={menuClass}
                        style={{ top: menuOpen ? "0" : "-1000px" }}
                    >
                        {menuContent}
                    </div>
                    <button
                        className="mb-4 absolute text-5xl"
                        style={{ zIndex: 1000, top: "0", left: "0" }}
                        aria-label="Toggle menu"
                        onClick={() => setMenuOpen(open => !open)}
                    >
                        <MenuIcon width={50} height={50} style={{ color: "white" }}></MenuIcon>
                    </button>
                </div>
            ) : (
                <div className={menuClass} style={{ top: "0" }}>
                    {menuContent}
                </div>
            )}
        </>
    );
}

export default MenuHeader;