/* eslint-disable no-magic-numbers */
import { useState } from "react"

import { Image, ImageKind } from "image-js"

export default function App() {

	const [file, setFile] = useState<string | Promise<string>>("")

	// const [redChannel, setRedChannel] = useState<string | Promise<string>>("")
	// const [greenChannel, setGreenChannel] = useState<string | Promise<string>>("")
	// const [blueChannel, setBlueChannel] = useState<string | Promise<string>>("")
	// const [alphaChannel, setAlphaChannel] = useState<string | Promise<string>>("")

	async function Mix() {
		try {

			const image = await Image.load("X:/Pessoal/Dev/channel-mixer/src/T_RockyGround_4K_Albedo.jpg")
			const r = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_AO.jpg")
			const g = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_Roughness.jpg")
			const b = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_Bump.jpg")
			// const a = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_Depth.png")

			const greyR = r.grey()
			const greyG = g.grey()
			const greyB = b.grey()
			const greyA = image.grey()

			// eslint-disable-next-line no-magic-numbers
			const newImage = new Image(4096, 4096, new Uint8Array(4096 * 4096 * 4).fill(255), { kind: "RGBA" as ImageKind })
			console.log(newImage.channels)

			const mixedImage = newImage.setChannel(0, greyR).setChannel(1, greyG).setChannel(2, greyB).setChannel(3, greyA)

			const dataUrlImage = mixedImage.toDataURL()

			// saveBlobToFile(await mixedImage.toBlob())

			// window.fs.writeFile()

			console.log(dataUrlImage)

			setFile(dataUrlImage)

		} catch (error) {
			console.log(error)
		}
	}

	// async function saveBlobToFile(blob : Blob) {
	// 	const fileData = new Int8Array(await blob.arrayBuffer())
	// }

	return (
		<div>
			<h1>channel-mixer</h1>
			<button onClick={Mix} className="bg-zinc-300">
				Mix
			</button>
			{file ? <img src={file as string} alt="preview" /> : null}
		</div>
	)
}