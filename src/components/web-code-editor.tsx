import { useState, useRef } from "react"
import AceEditor from "react-ace"
import Controls from "./controls"
import { Tab } from "@headlessui/react"
import { ArrowPathIcon, PlayIcon, PauseIcon, PlusIcon, StopIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import ace from "ace-builds/src-noconflict/ace"
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/theme-idle_fingers"
import "ace-builds/src-noconflict/ext-language_tools"
import Alert, { AlertHandle } from "./alert"
import { Input } from "./ui/input"
import { useEffect } from "react"

ace.config.set("basePath", "/ace")

const htmlCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Web Editor</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1 id="title">Hello, Web!</h1>
    <script src="script.js"></script>
  </body>
</html>
`
const jsCode = `document.getElementById('title').style.color = 'blue';`
const cssCode = `body { background: #222; color: #fff; font-family: sans-serif; }
h1 { transition: color 0.5s; }`

type File = {
    name: string;
    code: string;
};

function getMode(name: string) {
    if (name.endsWith(".js")) return "javascript"
    if (name.endsWith(".css")) return "css"
    if (name.endsWith(".html")) return "html"
    return "text"
}

export function MultiFileWebEditor({ runWhenReady = false, fullscreen = false }: { runWhenReady?: boolean, fullscreen?: boolean }) {
    const [runToggle, setRunToggle] = useState(false);
    const [showOutput, setShowOutput] = useState(false)
    const alertRef = useRef<AlertHandle>(null)
    const [alertTitle, setAlertTitle] = useState('')
    const [alertDescription, setAlertDescription] = useState('')
    const [newFileName, setNewFileName] = useState("")
    const [files, setFiles] = useState<File[]>([
        { name: 'index.html', code: htmlCode },
        { name: 'script.js', code: jsCode },
        { name: 'style.css', code: cssCode }
    ])
    const [activeTab, setActiveTab] = useState(0)
    const [iframeKey, setIframeKey] = useState(0) // for resetting iframe

    function updateFileCode(name: string, newCode: string) {

        setFiles(files =>
            files.map(f => f.name === name ? { ...f, code: newCode } : f)
        )
    }

    function addFile() {
        setNewFileName("")
        alertRef.current?.showAlert()
    }

    function confirmAddFile() {
        const trimmed = newFileName.trim()
        if (!trimmed) return

        if (files.some(f => f.name === trimmed)) {
            setAlertTitle('Duplicate Filename')
            setAlertDescription(`The file "${trimmed}" already exists.`)
            alertRef.current?.showAlert()
            return
        }

        if (!/\.(js|css|html)$/.test(trimmed)) {
            setAlertTitle('Extension invalide')
            setAlertDescription('Le fichier doit se terminer par .js, .css ou .html')
            alertRef.current?.showAlert()
            return
        }

        setFiles([...files, { name: trimmed, code: '' }])
    }

    function toggleRun() {
        if (runToggle) {
            setRunToggle(false);
            setShowOutput(false)
        } else {
            setRunToggle(true);
            setIframeKey(k => k + 1)
            setShowOutput(true)
        }
    }

    function reset() {
        setShowOutput(false)
        setFiles([
            { name: 'index.html', code: htmlCode },
            { name: 'script.js', code: jsCode },
            { name: 'style.css', code: cssCode }
        ])
        setIframeKey(k => k + 1)
    }

    // Compose the HTML for the iframe
    function getIframeSrcDoc() {
        const htmlFile = files.find(f => f.name.endsWith(".html"))?.code || ""
        const cssFiles = files.filter(f => f.name.endsWith(".css"))
        const jsFiles = files.filter(f => f.name.endsWith(".js"))

        // Inline CSS and JS into HTML
        let srcDoc = htmlFile
        const parserCss = document.createElement('div');
        parserCss.innerHTML = htmlFile;
        const linkHrefs = Array.from(parserCss.querySelectorAll('link[rel="stylesheet"][href]'))
            .map((el: any) => (el.getAttribute('href') || '').trim())
            .filter(Boolean);

        cssFiles.forEach(css => {
            if (linkHrefs.includes(css.name)) {
                // Replace the <link rel="stylesheet" href="..."> with an inline style
                srcDoc = srcDoc.replace(
                    new RegExp(`<link\\s+rel=["']stylesheet["']\\s+href=["']${css.name}["']\\s*/?>`, 'g'),
                    `<style>\n${css.code}\n</style>`
                );
            }
        });
        const parser = document.createElement('div');
        parser.innerHTML = htmlFile;
        const scriptSrcs = Array.from(parser.querySelectorAll('script[src]'))
            .map((el: any) => (el.getAttribute('src') || '').trim())
            .filter(Boolean);

        // Only inline JS files that are referenced in the HTML via <script src="...">
        jsFiles.forEach(js => {
            // Check if this file is referenced in the HTML
            if (scriptSrcs.includes(js.name)) {
                // Replace the <script src="..."></script> with an inline script
                // (remove the src attribute and insert the code)
                srcDoc = srcDoc.replace(
                    new RegExp(`<script\\s+src=["']${js.name}["']\\s*></script>`, 'g'),
                    `<script>\n${js.code}\n</script>`
                );
            }
        });

        // Optionally, you could also remove any <script src="..."></script> tags that don't match a file
        // and/or leave other JS files un-included
        return srcDoc
    }

    useEffect(() => {
        if (runWhenReady) {
            toggleRun()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="relative mb-10 flex xl:flex-row flex-col w-[100vw] overflow-hidden" style={{ height: fullscreen ? "90vh" : "unset" }}>
            <Alert
                ref={alertRef}
                alertTitle={alertTitle}
                alertDescription={alertDescription}
                content={<Input
                    id="fileNameInput"
                    placeholder="Nom du fichier (.js, .css, .html):"
                    value={newFileName}
                    onChange={e => setNewFileName(e.target.value)}
                />}
                callback={confirmAddFile}
            />

            <div className="flex-1 h-full">
                <div className="h-full">
                    <Controls
                        className="background absolute right-0 top-0 h-[75px] translate-y-[100%]"
                        items={[
                            {
                                label: showOutput ? "Stopper" : "Afficher",
                                icon: showOutput ? StopIcon : PlayIcon,
                                onClick: toggleRun,
                                disabled: false,
                                hidden: false
                            },
                            {
                                label: "Reset",
                                icon: ArrowPathIcon,
                                onClick: reset,
                                disabled: false
                            },
                            {
                                label: "Créer un fichier",
                                icon: PlusIcon,
                                onClick: addFile,
                                disabled: false
                            }
                        ]}
                    />

                    <Tab.Group selectedIndex={activeTab} onChange={setActiveTab} className={"flex flex-col h-full"}>
                        <Tab.List className="flex h-[4.25rem] space-x-2 rounded-t p-3 w-full overflow-auto">
                            {files.map(({ name }, idx) => (
                                <Tab
                                    key={name}
                                    className={({ selected }) =>
                                        clsx(
                                            "flex cursor-pointer items-center rounded border-none px-4 py-1 text-sm font-medium ring-1 ring-inset ring-neutral-900",
                                            selected
                                                ? "bg-white text-neutral-700"
                                                : "bg-neutral-500 text-zinc-50 hover:bg-white hover:text-neutral-700"
                                        )
                                    }
                                >
                                    {name}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className={"h-full"}>
                            {files.map(({ name, code }) => (
                                <Tab.Panel key={name} className="flex h-full">
                                    <div className="flex-1 h-full overflow-auto relative" style={{ backgroundColor: "var(--background)" }}>
                                        <AceEditor
                                            value={code}
                                            mode={getMode(name)}
                                            name={`editor-${name}`}
                                            fontSize="0.9rem"
                                            className="h-full w-full rounded shadow-md"
                                            theme={document.documentElement.classList.contains("dark") ? "idle_fingers" : "dark"}
                                            onChange={(newCode) => updateFileCode(name, newCode)}
                                            width="100%"
                                            height="100%"
                                            maxLines={Infinity}
                                            editorProps={{ $blockScrolling: false }}
                                            setOptions={{}}
                                        />
                                    </div>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>

            {
                showOutput && (
                    <div className="mt-4 rounded background p-2 flex-1">
                        <iframe
                            key={iframeKey}
                            title="Web Output"
                            srcDoc={getIframeSrcDoc()}
                            style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                )
            }
        </div >
    )
}