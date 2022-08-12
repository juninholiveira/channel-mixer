/* eslint-disable no-magic-numbers */
import { useState } from "react"

import { GreyAlgorithm, Image, ImageKind } from "image-js"

import ImageOutput from "./components/ImageOutput"
import InputChannel from "./components/InputChannel"
import MixButton from "./components/MixButton"
import useAlphaStateStore from "./stores/alphaState"
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
	width: number | undefined
	height: number | undefined
}

const imageBlueprint:IImageBlueprint = {
	red: {dataURL: undefined, image: undefined, isWhite: false},
	green: {dataURL: undefined, image: undefined, isWhite: false},
	blue: {dataURL: undefined, image: undefined, isWhite: false},
	alpha: {dataURL: undefined, image: undefined, isWhite: false},
	width: undefined,
	height: undefined,
}

export default function App() {

	const [preview, setPreview] = useState<string | undefined>(undefined)
	const alphaState = useAlphaStateStore(state => state.alphaState)
	// let isAlphaActivated = true

	function SetImageBlueprint (channel:TChannel, value:string | undefined, isWhite:boolean) {
		if (channel == "red") {
			imageBlueprint.red.dataURL = value
			imageBlueprint.red.isWhite = isWhite
		}
		else if (channel == "green") {
			imageBlueprint.green.dataURL = value
			imageBlueprint.green.isWhite = isWhite
		}
		else if (channel == "blue") {
			imageBlueprint.blue.dataURL = value
			imageBlueprint.blue.isWhite = isWhite
		}
		else if (channel == "alpha") {
			imageBlueprint.alpha.dataURL = value
			imageBlueprint.alpha.isWhite = isWhite
		}
	}

	// function switchAlphaState() {
	// 	console.log("switchAlphaState called")
	// 	isAlphaActivated = !isAlphaActivated
	// }

	async function Mix() {
		try {
			// Clones the ImageBlueprint to use in the proccessing
			const image : IImageBlueprint = Object.assign({}, imageBlueprint)

			image.red.image = undefined
			image.green.image = undefined
			image.blue.image = undefined
			image.alpha.image = undefined

			// Loads all the image files textures inputed from the user
			if (image.red.dataURL !== undefined)
				image.red.image = await Image.load(image.red.dataURL)
			if (image.green.dataURL !== undefined)
				image.green.image = await Image.load(image.green.dataURL)
			if (image.blue.dataURL !== undefined)
				image.blue.image = await Image.load(image.blue.dataURL)
			if (image.alpha.dataURL !== undefined)
				image.alpha.image = await Image.load(image.alpha.dataURL)

			// Cancel if found different sizes
			const arrayOfTex = [
				image.red.image,
				image.green.image,
				image.blue.image,
				image.alpha.image,
			].filter(image => image !== undefined) as Image[]

			if (arrayOfTex.every( v => v.width === arrayOfTex[0].width) === false)
				throw new Error("Different width")
			else if (arrayOfTex.every( v => v.height === arrayOfTex[0].height) === false)
				throw new Error("Different height")

			// Saves width and height at the top of the object
			image.width = arrayOfTex.length > 0 ? arrayOfTex[0].width : 512
			image.height = arrayOfTex.length > 0 ? arrayOfTex[0].height : 512

			// Convert the colored images to grey (1 channel)
			// if(image.red.image?.components !== undefined && image.red.image.components > 1)
			// 	image.red.image = image.red.image.grey()
			// if(image.green.image?.components !== undefined && image.green.image.components > 1)
			// 	image.green.image = image.green.image.grey()
			// if(image.blue.image?.components !== undefined && image.blue.image.components > 1)
			// 	image.blue.image = image.blue.image.grey()
			// if(image.alpha.image?.components !== undefined && image.alpha.image.components > 1)
			// 	image.alpha.image = image.alpha.image.grey()
			if(image.red.image?.components !== undefined && image.red.image.components > 1)
				image.red.image = image.red.image.grey({algorithm: "red" as GreyAlgorithm})
			if(image.green.image?.components !== undefined && image.green.image.components > 1)
				image.green.image = image.green.image.grey({algorithm: "green" as GreyAlgorithm})
			if(image.blue.image?.components !== undefined && image.blue.image.components > 1)
				image.blue.image = image.blue.image.grey({algorithm: "blue" as GreyAlgorithm})
			if(image.alpha.image?.components !== undefined && image.alpha.image.components > 1)
				image.alpha.image = image.alpha.image.grey()

			// Creates a new black or white image for the remaining
			if(image.red.image === undefined)
				image.red.image = new Image(image.width, image.height, new Uint8Array(image.width * image.height).fill(image.red.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(image.green.image === undefined)
				image.green.image = new Image(image.width, image.height, new Uint8Array(image.width * image.height).fill(image.green.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(image.blue.image === undefined)
				image.blue.image = new Image(image.width, image.height, new Uint8Array(image.width * image.height).fill(image.blue.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(image.alpha.image === undefined)
				image.alpha.image = new Image(image.width, image.height, new Uint8Array(image.width * image.height).fill(image.alpha.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})

			// Join the channels
			let finalTexture
			if(alphaState) {
				finalTexture = new Image(image.width, image.height, new Uint8Array(image.width * image.height * 4).fill(0), {kind: "RGBA" as ImageKind})
					.setChannel(0, image.red.image)
					.setChannel(1, image.green.image)
					.setChannel(2, image.blue.image)
					.setChannel(3, image.alpha.image)
			}
			else {
				finalTexture = new Image(image.width, image.height, new Uint8Array(image.width * image.height * 3).fill(0), {kind: "RGB" as ImageKind})
					.setChannel(0, image.red.image)
					.setChannel(1, image.green.image)
					.setChannel(2, image.blue.image)
			}

			// Encode to DataURL
			const dataUrlImage = await finalTexture.toBase64()

			// Show on interface
			setPreview(dataUrlImage)

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