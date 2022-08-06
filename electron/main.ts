import { app, BrowserWindow, ipcMain } from "electron"
import * as path from "path"

function createWindow() {

	const mainWindow = new BrowserWindow({
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

ipcMain.on("file", (event, args) => {
	console.log(args)
})