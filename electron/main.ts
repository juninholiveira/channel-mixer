import { app, BrowserWindow, ipcMain, dialog } from "electron"
import * as path from "path"

import SaveFile from "../src/services/SaveFile"

let mainWindow: BrowserWindow

function createWindow() {

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		backgroundColor: "#1E1E1E",
		title: "Channel Mixer",
		frame: true,
		fullscreen: false,
		fullscreenable: false,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	})

	mainWindow.setMenuBarVisibility(false)

	// Load index.html
	mainWindow.loadURL(
		app.isPackaged ? `file://${__dirname}/../index.html` : "http://localhost:3000/index.html",
	)

	// Open the DevTools in a separate window, only in development mode
	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools({ mode: "detach" })
	}
}

// Called when Electron finishes its initialization
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on MacOS
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit()
	}
})

app.on("activate", () => {

	const maxNumberOfWindows = 0

	if (BrowserWindow.getAllWindows().length === maxNumberOfWindows) {
		createWindow()
	}
})

ipcMain.on("save", (event, args) => {

	const file = args[0]
	const suffix = args[1]

	const returnedPath = dialog.showSaveDialogSync(mainWindow, {
		title: "Save the mixed image",
		filters: [
			{ name: "JPEG", extensions: ["jpg", "jpeg"] },
			{ name: "PNG", extensions: ["png"] },
			{ name: "All Files", extensions: ["*"] },
		],
		message: "message",
		buttonLabel: "buttonLabel",
	})

	if (returnedPath)
		SaveFile(file, returnedPath, suffix)
})