/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge } = require("electron")
const fs = require("fs")

contextBridge.exposeInMainWorld("filesystemexposed", {
	writeFile: (file, data, options, callback) => { fs.writeFile(file, data, options, callback) },
})