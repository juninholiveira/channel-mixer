import { ipcRenderer, contextBridge } from "electron"

contextBridge.exposeInMainWorld("api", {
	saveFile: (file: string[]) => ipcRenderer.send("save", file),
})