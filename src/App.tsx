/* eslint-disable no-magic-numbers */
import { useState } from "react"

import { Image, ImageKind } from "image-js"

import ImageOutput from "./components/ImageOutput"
import InputChannel from "./components/InputChannel"
import MixButton from "./components/MixButton"
import { TChannel } from "./types/types"

interface ImageBlueprint {
	r: string | undefined
	rIsWhite: boolean
	g: string | undefined
	gIsWhite: boolean
	b: string | undefined
	bIsWhite: boolean
	a: string | undefined
	aIsWhite: boolean
}

export default function App() {

	console.log("Renderizou App.tsx")

	const [preview, setPreview] = useState<string | undefined>(undefined)

	// const [redInputString, setRedInputString] = useState<string | "white" | "black" | undefined>("black")
	// const [greenInputString, setGreenInputString] = useState<string | "white" | "black" | undefined>("black")
	// const [blueInputString, setBlueInputString] = useState<string | "white" | "black" | undefined>("black")
	// const [alphaInputString, setAlphaInputString] = useState<string | "white" | "black" | undefined>("black")

	const imageBlueprint:ImageBlueprint = {
		r: undefined,
		rIsWhite: false,
		g: undefined,
		gIsWhite: false,
		b: undefined,
		bIsWhite: false,
		a: undefined,
		aIsWhite: false,
	}

	function SetInputString (channel:TChannel, value:string) {
		if (channel == "red")
			// setRedInputString(value)
			imageBlueprint.r = value
		if (channel == "green")
			// setGreenInputString(value)
			imageBlueprint.g = value
		if (channel == "blue")
			// setBlueInputString(value)
			imageBlueprint.b = value
		if (channel == "alpha")
			// setAlphaInputString(value)
			imageBlueprint.a = value
	}

	async function Mix() {
		try {

			// ETAPAS

			// Carregar todos os arquivos de imagem carregados
			let r, g, b, a : Image | undefined = undefined

			if (redInputString !== "white" && redInputString !== "black" && redInputString !== undefined)
				r = await Image.load(redInputString)
			if (greenInputString !== "white" && greenInputString !== "black" && greenInputString !== undefined)
				g = await Image.load(greenInputString)
			if (blueInputString !== "white" && blueInputString !== "black" && blueInputString !== undefined)
				b = await Image.load(blueInputString)
			if (alphaInputString !== "white" && alphaInputString !== "black" && alphaInputString !== undefined)
				a = await Image.load(alphaInputString)

			// Barrar se houver tamanhos diferentes
			// eslint-disable-next-line array-element-newline, array-bracket-newline
			const filteredChannelsWithImage = [r, g, b, a].filter(image => image) as Image[]
			if (filteredChannelsWithImage.every( v => v.width === filteredChannelsWithImage[0].width) === false) {
				throw new Error("Different width")
			} else if (filteredChannelsWithImage.every( v => v.height === filteredChannelsWithImage[0].height) === false) {
				throw new Error("Different height")
			}

			// Converter elas para cinza com 1 canal só por segurança
			const greyedImages = filteredChannelsWithImage.map(image => {
				if (image.components === 1)
					return image
				else
					return image.grey()
			})

			// Criar uma imagem ou preta ou branca para os restantes

			// Criar uma IMAGE e aplicar os 4 canais nela

			// let rFill, gFill, bFill, aFill: "white" | "black"

			// Loads the input files
			if(redInputString === "white")
				r = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(255), { kind: "RGB" as ImageKind})
			else if(redInputString === "black")
				r = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(0), { kind: "RGB" as ImageKind})
			else
				r = await Image.load(redInputString as string)

			if(greenInputString === "white")
				g = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(255), { kind: "RGB" as ImageKind})
			else if(greenInputString === "black")
				g = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(0), { kind: "RGB" as ImageKind})
			else
				g = await Image.load(greenInputString as string)

			if(blueInputString === "white")
				b = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(255), { kind: "RGB" as ImageKind})
			else if(blueInputString === "black")
				b = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(0), { kind: "RGB" as ImageKind})
			else
				b = await Image.load(blueInputString as string)

			if(alphaInputString === "white")
				a = new Image(512, 512, new Array(512 * 512 * 1).fill(255), { kind: "GREY" as ImageKind})
			else if(alphaInputString === "black")
				a = new Image(512, 512, new Array(512 * 512 * 1).fill(0), { kind: "GREY" as ImageKind})
			else
				a = await Image.load(alphaInputString as string)

			// Makes sure all of them are grey
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
			console.log(dataUrlImage)

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