import * as fs from "fs"

export default function SaveFile(file: string, path: string) {

	// Strips the MIME type from the string
	const base64Data = file.replace(/^data:image\/png;base64,/, "")

	// Saves to disk on the specified path
	fs.writeFile(path, base64Data, "base64", (err) => {
		console.log(err as Error)
	})
}