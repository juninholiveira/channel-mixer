import { useState } from "react"

import { Image, ImageKind } from "image-js"

import ImageOutput from "./components/ImageOutput"
import InputChannel from "./components/InputChannel"
import MixButton from "./components/MixButton"
import { TChannel } from "./types/types"

export default function App() {

	const [preview, setPreview] = useState<string | undefined>(undefined)

	const [redInputString, setRedInputString] = useState<string | undefined>(undefined)
	const [greenInputString, setGreenInputString] = useState<string | undefined>(undefined)
	const [blueInputString, setBlueInputString] = useState<string | undefined>(undefined)
	const [alphaInputString, setAlphaInputString] = useState<string | undefined>(undefined)

	function SetInputString (channel:TChannel, value:string) {
		if (channel == "red")
			setRedInputString(value)
		if (channel == "green")
			setGreenInputString(value)
		if (channel == "blue")
			setBlueInputString(value)
		if (channel == "alpha")
			setAlphaInputString(value)
	}

	async function Mix() {
		try {

			// Loads the input files
			const r = await Image.load(redInputString as string)
			const g = await Image.load(greenInputString as string)
			const b = await Image.load(blueInputString as string)
			const a = await Image.load(alphaInputString as string)

			const greyR = r.grey()
			const greyG = g.grey()
			const greyB = b.grey()
			const greyA = a.grey()

			// eslint-disable-next-line no-magic-numbers
			const newImage = new Image(r.height, r.width, new Uint8Array(r.height * r.width * 4).fill(255), { kind: "RGBA" as ImageKind })

			// eslint-disable-next-line no-magic-numbers
			const mixedImage = newImage.setChannel(0, greyR).setChannel(1, greyG).setChannel(2, greyB).setChannel(3, greyA)

			const dataUrlImage = mixedImage.toDataURL()

			setPreview(dataUrlImage)

			// saveBlobToFile(await mixedImage.toBlob())

			// window.fs.writeFile()

			// console.log(dataUrlImage)

			// setFile(dataUrlImage)

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main className="flex flex-col gap-8 w-full h-full items-center justify-center">
			<section id="input" className="flex flex-row gap-3">
				<InputChannel channel="red" setInputString={(channel, value) => SetInputString(channel, value)}/>
				<InputChannel channel="green" setInputString={(channel, value) => SetInputString(channel, value)}/>
				<InputChannel channel="blue" setInputString={(channel, value) => SetInputString(channel, value)}/>
				<InputChannel channel="alpha" setInputString={(channel, value) => SetInputString(channel, value)}/>
			</section>
			<section id="output" className="flex flex-row gap-3">
				<MixButton handleClick={() => Mix()}/>
				<ImageOutput preview={preview}/>
			</section>
		</main>
	)
}