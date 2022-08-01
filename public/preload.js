/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge } = require("electron")
const fs = require("fs")

process.once("loaded", () => {
	contextBridge.exposeInMainWorld("fs", fs)
})