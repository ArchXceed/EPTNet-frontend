import { JSX } from "react";

export function SiteFooter(props: { autoHide: number }): JSX.Element {
    window.onresize = () => {
        if (window.innerHeight < props.autoHide) {
            document.querySelector("footer")?.classList.add("hidden");
        } else {
            document.querySelector("footer")?.classList.remove("hidden");
        }
    };
    return (
        <footer className={window.innerHeight < props.autoHide ? "footer hidden" : "footer border-grid border-t py-6 md:py-0"} style={{ zIndex: -1, position: 'absolute', bottom: "0%", width: '100%', textAlign: 'center' }}>
            <div className="container-wrapper">
                <div className="container py-4">
                    <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built with{" "}
                        <a
                            href="https://shadcn.com"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium hover:underline underline-offset-4"
                        >
                            Shadcn/ui
                        </a>
                        .{" "}
                        <a href="https://eptnet.loines.ch/" className="font-medium hover:underline underline-offset-4"
                            target="_blank" rel="noopener noreferrer">
                            EPTNet{" "}
                        </a>
                        by {" "}
                        <a href="https://youtube.com/@Loines" className="font-medium hover:underline underline-offset-4"
                            target="_blank" rel="noopener noreferrer">
                            Lyam Zambaz
                        </a>
                        . The source code is available on{" "}
                        <a
                            href="https://gitlab.com/loines"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium hover:underline underline-offset-4"
                        >
                            GitLab
                        </a>
                        . is licensed under{" "}
                        <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" className="inline-flex hover:underline items-center font-medium" target="_blank" rel="license noopener noreferrer">
                            CC BY 4.0
                            <img
                                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                                alt="Creative Commons"
                                className="h-[22px] ml-1 align-text-bottom"
                            />
                            <img
                                src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                                alt="Attribution"
                                className="h-[22px] ml-1 align-text-bottom"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// Code from: https://github.com/shadcn-ui/ui/blob/main/apps/www/components/site-footer.tsx