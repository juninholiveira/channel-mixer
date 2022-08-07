import { ipcRenderer, contextBridge } from "electron"

contextBridge.exposeInMainWorld("api", {
	saveFile: (file: string, suffix: string) => ipcRenderer.send("save", [file, suffix]),
})