/* eslint-disable no-magic-numbers */
import { useState } from "react"

import { Image, ImageKind } from "image-js"

import ImageOutput from "./components/ImageOutput"
import InputChannel from "./components/InputChannel"
import MixButton from "./components/MixButton"
import { TChannel } from "./types/types"

interface IChannelBlueprint {
	dataURL: string | undefined
	image: Image | undefined
	isWhite: boolean
}

interface IImageBlueprint {
	red: IChannelBlueprint,
	green: IChannelBlueprint,
	blue: IChannelBlueprint,
	alpha: IChannelBlueprint,
}

export default function App() {

	console.log("Renderizou App.tsx")

	const [preview, setPreview] = useState<string | undefined>(undefined)

	// const [redInputString, setRedInputString] = useState<string | "white" | "black" | undefined>("black")
	// const [greenInputString, setGreenInputString] = useState<string | "white" | "black" | undefined>("black")
	// const [blueInputString, setBlueInputString] = useState<string | "white" | "black" | undefined>("black")
	// const [alphaInputString, setAlphaInputString] = useState<string | "white" | "black" | undefined>("black")

	const imageBlueprint:IImageBlueprint = {
		red: {dataURL: undefined, image: undefined, isWhite: false},
		green: {dataURL: undefined, image: undefined, isWhite: false},
		blue: {dataURL: undefined, image: undefined, isWhite: false},
		alpha: {dataURL: undefined, image: undefined, isWhite: false},
	}

	function SetImageBlueprint (channel:TChannel, value:string | undefined, isWhite:boolean) {
		if (channel == "red") {
			// setRedInputString(value)
			imageBlueprint.red.dataURL = value
			imageBlueprint.red.isWhite = isWhite
		}
		else if (channel == "green") {
			// setGreenInputString(value)
			imageBlueprint.green.dataURL = value
			imageBlueprint.green.isWhite = isWhite
		}
		else if (channel == "blue") {
			// setBlueInputString(value)
			imageBlueprint.blue.dataURL = value
			imageBlueprint.blue.isWhite = isWhite
		}
		else if (channel == "alpha") {
			// setAlphaInputString(value)
			imageBlueprint.alpha.dataURL = value
			imageBlueprint.alpha.isWhite = isWhite
		}
	}

	async function Mix() {
		try {

			// ETAPAS

			// Carregar todos os arquivos de imagem carregados
			if (imageBlueprint.red.dataURL !== undefined)
				imageBlueprint.red.image = await Image.load(imageBlueprint.red.dataURL)
			if (imageBlueprint.green.dataURL !== undefined)
				imageBlueprint.green.image = await Image.load(imageBlueprint.green.dataURL)
			if (imageBlueprint.blue.dataURL !== undefined)
				imageBlueprint.blue.image = await Image.load(imageBlueprint.blue.dataURL)
			if (imageBlueprint.alpha.dataURL !== undefined)
				imageBlueprint.alpha.image = await Image.load(imageBlueprint.alpha.dataURL)

			// Barrar se houver tamanhos diferentes
			const arrayOfTex = [
				imageBlueprint.red.image,
				imageBlueprint.green.image,
				imageBlueprint.blue.image,
				imageBlueprint.alpha.image,
			].filter(image => image !== undefined) as Image[]

			if (arrayOfTex.every( v => v.width === arrayOfTex[0].width) === false)
				throw new Error("Different width")
			else if (arrayOfTex.every( v => v.height === arrayOfTex[0].height) === false)
				throw new Error("Different height")

			// Converter elas para cinza (1 canal) só por segurança
			const greyedImages = arrayOfTex.map(image => {
				if (image.components === 1)
					return image
				else
					return image.grey()
			})

			if(imageBlueprint.red.image?.components === 1)
				imageBlueprint.red.image = imageBlueprint.red.image.grey()
			if(imageBlueprint.green.image?.components === 1)
				imageBlueprint.green.image = imageBlueprint.green.image.grey()
			if(imageBlueprint.blue.image?.components === 1)
				imageBlueprint.blue.image = imageBlueprint.blue.image.grey()
			if(imageBlueprint.alpha.image?.components === 1)
				imageBlueprint.alpha.image = imageBlueprint.alpha.image.grey()

			// Criar uma imagem ou preta ou branca para os restantes

			// Criar uma IMAGE e aplicar os 4 canais nela

			// let rFill, gFill, bFill, aFill: "white" | "black"

			// Loads the input files
			if(redInputString === "white")
				rTex = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(255), { kind: "RGB" as ImageKind})
			else if(redInputString === "black")
				rTex = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(0), { kind: "RGB" as ImageKind})
			else
				rTex = await Image.load(redInputString as string)

			if(greenInputString === "white")
				gTex = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(255), { kind: "RGB" as ImageKind})
			else if(greenInputString === "black")
				gTex = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(0), { kind: "RGB" as ImageKind})
			else
				gTex = await Image.load(greenInputString as string)

			if(blueInputString === "white")
				bTex = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(255), { kind: "RGB" as ImageKind})
			else if(blueInputString === "black")
				bTex = new Image(512, 512, new Uint8Array(512 * 512 * 3).fill(0), { kind: "RGB" as ImageKind})
			else
				bTex = await Image.load(blueInputString as string)

			if(alphaInputString === "white")
				aTex = new Image(512, 512, new Array(512 * 512 * 1).fill(255), { kind: "GREY" as ImageKind})
			else if(alphaInputString === "black")
				aTex = new Image(512, 512, new Array(512 * 512 * 1).fill(0), { kind: "GREY" as ImageKind})
			else
				aTex = await Image.load(alphaInputString as string)

			// Makes sure all of them are grey
			const greyR = rTex.grey()
			const greyG = gTex.grey()
			const greyB = bTex.grey()
			const greyA = aTex.grey()

			// eslint-disable-next-line no-magic-numbers
			const newImage = new Image(rTex.height, rTex.width, new Uint8Array(rTex.height * rTex.width * 4).fill(255), { kind: "RGBA" as ImageKind })

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
				<InputChannel channel="red" SetImageBlueprint={(channel, value, isWhite) => SetImageBlueprint(channel, value, isWhite)}/>
				<InputChannel channel="green" SetImageBlueprint={(channel, value, isWhite) => SetImageBlueprint(channel, value, isWhite)}/>
				<InputChannel channel="blue" SetImageBlueprint={(channel, value, isWhite) => SetImageBlueprint(channel, value, isWhite)}/>
				<InputChannel channel="alpha" SetImageBlueprint={(channel, value, isWhite) => SetImageBlueprint(channel, value, isWhite)}/>
			</section>
			<section id="output" className="flex flex-row gap-3">
				<MixButton handleClick={() => Mix()}/>
				<ImageOutput preview={preview}/>
			</section>
		</main>
	)
}