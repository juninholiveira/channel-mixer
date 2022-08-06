import { ipcRenderer, contextBridge } from "electron"

contextBridge.exposeInMainWorld("api", {
	sendFile: (file: string) => ipcRenderer.send("file", file),
})