// import { useState } from "react"

// import { Image, ImageKind } from "image-js"

import ImageOutput from "./components/ImageOutput"
import InputChannel from "./components/InputChannel"
import MixButton from "./components/MixButton"

export default function App() {

	// const [file, setFile] = useState<string | Promise<string>>("")

	// const [redChannel, setRedChannel] = useState<string | Promise<string>>("")
	// const [greenChannel, setGreenChannel] = useState<string | Promise<string>>("")
	// const [blueChannel, setBlueChannel] = useState<string | Promise<string>>("")
	// const [alphaChannel, setAlphaChannel] = useState<string | Promise<string>>("")

	// async function Mix() {
	// 	try {

	// 		const image = await Image.load("X:/Pessoal/Dev/channel-mixer/src/T_RockyGround_4K_Albedo.jpg")
	// 		const r = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_AO.jpg")
	// 		const g = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_Roughness.jpg")
	// 		const b = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_Bump.jpg")
	// 		// const a = await Image.load("X:/Pessoal/Dev/channel-mixer/data/T_RockyGround_4K_Depth.png")

	// 		const greyR = r.grey()
	// 		const greyG = g.grey()
	// 		const greyB = b.grey()
	// 		const greyA = image.grey()

	// 		// eslint-disable-next-line no-magic-numbers
	// 		const newImage = new Image(4096, 4096, new Uint8Array(4096 * 4096 * 4).fill(255), { kind: "RGBA" as ImageKind })
	// 		console.log(newImage.channels)

	// 		const mixedImage = newImage.setChannel(0, greyR).setChannel(1, greyG).setChannel(2, greyB).setChannel(3, greyA)

	// 		const dataUrlImage = mixedImage.toDataURL()

	// 		// saveBlobToFile(await mixedImage.toBlob())

	// 		// window.fs.writeFile()

	// 		console.log(dataUrlImage)

	// 		setFile(dataUrlImage)

	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	return (
		<main className="flex flex-col gap-8 w-full h-full items-center justify-center">
			<section id="input" className="flex flex-row gap-3">
				<InputChannel channel="red"/>
				<InputChannel channel="green"/>
				<InputChannel channel="blue"/>
				<InputChannel channel="alpha"/>
			</section>
			<section id="output" className="flex flex-row gap-3">
				<MixButton />
				<ImageOutput />
			</section>
		</main>
	)
}