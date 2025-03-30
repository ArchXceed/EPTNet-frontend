import ModeToggle from "./mode-toggle";;
import { JSX } from "react";
import Menu from "./menu";

function MenuHeader(props: { isConnected: boolean, isAdmin: boolean, displayThemeToggle: boolean }): JSX.Element {
    return (
        <div className="main-menu border py-6 shadow-sm flex flex-col sm:flex-row items-center justify-between p-4 bg-[--card]">
            <a href="/"><img src="./favicon.png" width={50} alt="Logo" className="rounded-full mb-4 sm:mb-0" /></a>
            <Menu isConnected={props.isConnected} isAdmin={props.isAdmin} />
            {props.displayThemeToggle && <ModeToggle />}
        </div>
    );
}

export default MenuHeader;