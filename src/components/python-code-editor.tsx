import { useEffect, useState, useRef } from "react"
import { usePython } from "../react-py/dist"
import AceEditor from "react-ace";
import Controls from "../components/controls"
import Loader from "../components/loader"
import { Tab } from "@headlessui/react"
import { ArrowPathIcon, PlayIcon, StopIcon, PlusIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import ace from "ace-builds/src-noconflict/ace"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-idle_fingers"
import "ace-builds/src-noconflict/ext-language_tools"
import Alert, { AlertHandle } from "./alert"
import { Input } from "./ui/input";

ace.config.set("basePath", "/ace")

const editorOptions = {
}

function editorOnLoad(editor: { renderer: { setScrollMargin: (arg0: number, arg1: number, arg2: number, arg3: number) => void }; moveCursorTo: (arg0: number, arg1: number) => void }) {
  editor.renderer.setScrollMargin(10, 10, 0, 0)
  editor.moveCursorTo(0, 0)
}

const mainCode = `from numbers import multiply
from strings import reverse_string

numbers = [1, 2, 3, 4, 5]
result = multiply(numbers)
print("Result of multiplication:", result)

string_to_reverse = "Hello, World!"
reversed_string = reverse_string(string_to_reverse)
print("Reversed string:", reversed_string)`

const numbersCode = `def multiply(numbers_list):
  result = 1
  for num in numbers_list:
      result *= num
  return result`

const stringsCode = `def reverse_string(input_string):
  return input_string[::-1]`
type File = {
  name: string;
  code: string;
};




export function MultiFilePyEditor({ runWhenReady = false, fullscreen = false }: { runWhenReady?: boolean, fullscreen?: boolean }) {
  const [showOutput, setShowOutput] = useState(false)
  const alertRef = useRef<AlertHandle>(null)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertDescription, setAlertDescription] = useState('')
  const [newFileName, setNewFileName] = useState("")
  const [files, setFiles] = useState<File[]>([
    { name: 'main.py', code: mainCode },
    { name: 'numbers.py', code: numbersCode },
    { name: 'strings.py', code: stringsCode }
  ]);
  function updateFileCode(name: string, newCode: string) {
    setFiles(files =>
      files.map(f => f.name === name ? { ...f, code: newCode } : f)
    );
  }
  const {
    runPython,
    stdout,
    stderr,
    isLoading,
    isRunning,
    interruptExecution,
    writeFile,
    watchModules,
    isReady
  } = usePython()

  useEffect(() => {
    let hasRun = false;
    if (isReady && runWhenReady && !hasRun) {
      hasRun = true;
      run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, runWhenReady]);

  useEffect(() => {
    const moduleNames = files
      .map(f => f.name.replace(/\.py$/, ''))
      .filter(name => name !== "main");
    watchModules(moduleNames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  function addFile() {
    setNewFileName("")
    alertRef.current?.showAlert()
  }

  function run() {
    files.forEach(file => writeFile(file.name, file.code))
    const mainFile = files.find(f => f.name === "main.py")
    if (mainFile) {
      runPython(mainFile.code)
      setShowOutput(true)
    }
  }

  function stop() {
    interruptExecution()
    setShowOutput(false)
  }

  function reset() {
    setShowOutput(false)
    setFiles([
      { name: 'main.py', code: mainCode },
      { name: 'numbers.py', code: numbersCode },
      { name: 'strings.py', code: stringsCode }
    ])
  }

  function confirmAddFile() {
    console.log("confirmAddFile", newFileName);

    const trimmed = newFileName.trim()
    if (!trimmed) return

    if (files.some(f => f.name === trimmed)) {
      setAlertTitle('Duplicate Filename')
      setAlertDescription(`The file "${trimmed}" already exists.`)
      alertRef.current?.showAlert()
      return
    }

    setFiles([...files, { name: trimmed, code: '' }])
  }


  // const tabs = [
  //   {
  //     name: "main.py",
  //     code: main,
  //     setter: setMain
  //   },
  //   {
  //     name: "numbers.py",
  //     code: numbers,
  //     setter: setNumbers
  //   },
  //   {
  //     name: "strings.py",
  //     code: strings,
  //     setter: setUtils
  //   }
  // ]

  return (
    <div className="relative mb-10 w-[100vw] overflow-hidden">
      <Alert
        ref={alertRef}
        alertTitle={alertTitle}
        alertDescription={alertDescription}
        content={<Input
          id="fileNameInput"
          placeholder="Le nom du fichier:"
          value={newFileName}
          onChange={e => setNewFileName(e.target.value)}
        />}
        callback={confirmAddFile}
      />

      {isLoading && <Loader />}

      <div>
        {(() => {
          return (
            <div className="flex flex-col">
              <Controls
                className="background absolute right-0 top-0 h-[75px] translate-y-[100%]"
                items={[
                  {
                    label: "Executer",
                    icon: PlayIcon,
                    onClick: run,
                    disabled: isLoading || isRunning,
                    hidden: isRunning
                  },
                  {
                    label: "Stopper",
                    icon: StopIcon,
                    onClick: stop,
                    hidden: !isRunning
                  },
                  {
                    label: "Reset",
                    icon: ArrowPathIcon,
                    onClick: reset,
                    disabled: isRunning
                  },
                  {
                    label: "Créer un fichier",
                    icon: PlusIcon,
                    onClick: addFile,
                    disabled: false
                  }
                ]}
              />

              <Tab.Group>
                <Tab.List className="flex h-[4.25rem] space-x-2 rounded-t background p-3 w-full overflow-scroll">
                  {files.map(({ name }) => (
                    <Tab
                      key={name}
                      className={({ selected }) =>
                        clsx(
                          "flex cursor-pointer items-center rounded border-none px-4 py-1 text-sm font-medium ring-1 ring-inset ring-neutral-900 transition-all",
                          selected
                            ? "background foreground scale-110"
                            : "background foreground hover:scale-110"
                        )
                      }
                    >
                      {name}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  {files.map(({ name, code }) => (
                    <Tab.Panel key={name}>
                      <div style={{ height: fullscreen ? "30vh" : "50vh", overflow: "scroll", position: "relative" }} className="flex-1 overflow-scroll">
                        <AceEditor
                          style={{ height: "100%", width: "100%" }}
                          value={code}
                          mode="python"
                          name={`editor-${name}`}
                          fontSize="0.9rem"
                          className="overflow-clip rounded shadow-md"
                          theme={document.documentElement.classList.contains("dark") ? "idle_fingers" : "dark"}
                          onChange={(newCode) => updateFileCode(name, newCode)}
                          width="100%"
                          maxLines={Infinity}
                          onLoad={editorOnLoad}
                          editorProps={{ $blockScrolling: false }}
                          setOptions={editorOptions}
                        />
                      </div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
          )
        })()}
      </div>

      {showOutput && (
        <pre style={{ height: fullscreen ? "40vh" : "20vh" }} className="mt-4 text-left overflow-y-scroll rounded background p-4 text-sm foreground">
          <code>{stdout}</code>
          <code className="text-red-500">{stderr}</code>
        </pre>
      )}
    </div>
  )
}