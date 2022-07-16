/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow } = require("electron")
const path = require("path")

function createWindow() {

	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
	})

	// and load the index.html of the app.
	mainWindow.loadURL(
		app.isPackaged ? `file://${path.join(__dirname, "../build/index.html")}` : "http://localhost:3000"
	)

	// Open the DevTools.
	if (!app.isPackaged) {
		mainWindow.webContents.openDevTools({ mode: "detach" })
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
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