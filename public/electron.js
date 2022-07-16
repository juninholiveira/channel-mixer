/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require("electron")
const path = require("path")

function createWindow() {

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
	})

	// Load index.html
	mainWindow.loadURL(
		app.isPackaged ? `file://${path.join(__dirname, "../build/index.html")}` : "http://localhost:3000"
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
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})