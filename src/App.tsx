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

	let imageBlueprint:IImageBlueprint = {
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
		console.log(imageBlueprint)
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

			// Salvar no topo do objeto o Width e Height

			// Converter elas para cinza (1 canal) só por segurança
			if(imageBlueprint.red.image?.components === 1)
				imageBlueprint.red.image = imageBlueprint.red.image.grey()
			if(imageBlueprint.green.image?.components === 1)
				imageBlueprint.green.image = imageBlueprint.green.image.grey()
			if(imageBlueprint.blue.image?.components === 1)
				imageBlueprint.blue.image = imageBlueprint.blue.image.grey()
			if(imageBlueprint.alpha.image?.components === 1)
				imageBlueprint.alpha.image = imageBlueprint.alpha.image.grey()

			// Criar uma imagem ou preta ou branca para os restantes
			if(imageBlueprint.red.image === undefined)
				imageBlueprint.red.image = new Image(512, 512, new Uint8Array(512 * 512).fill(imageBlueprint.red.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(imageBlueprint.green.image === undefined)
				imageBlueprint.green.image = new Image(512, 512, new Uint8Array(512 * 512).fill(imageBlueprint.green.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(imageBlueprint.blue.image === undefined)
				imageBlueprint.blue.image = new Image(512, 512, new Uint8Array(512 * 512).fill(imageBlueprint.blue.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(imageBlueprint.alpha.image === undefined)
				imageBlueprint.alpha.image = new Image(512, 512, new Uint8Array(512 * 512).fill(imageBlueprint.alpha.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})

			// Criar uma IMAGE e aplicar os 4 canais nela
			const finalTexture = new Image(512, 512, new Uint8Array(512 * 512 * 4), {kind: "RGBA" as ImageKind})
				.setChannel(0, imageBlueprint.red.image)
				.setChannel(1, imageBlueprint.green.image)
				.setChannel(2, imageBlueprint.blue.image)
				.setChannel(3, imageBlueprint.alpha.image)

			// Encoda para DataURL
			const dataUrlImage = finalTexture.toDataURL()

			// Exibe na interface
			setPreview(dataUrlImage)
			console.log(dataUrlImage)

			// Reseta tudo
			// TO DO = Durante o processo de Mix eu to alterando o objeto original, isso ta dando problema na hora de mixar pela segunda vez.
			// preciso dar um jeito de salvar as configurações do usuário de forma fixa
			// e configurar o mix num objeto diferente
			imageBlueprint = {
				red: {dataURL: undefined, image: undefined, isWhite: false},
				green: {dataURL: undefined, image: undefined, isWhite: false},
				blue: {dataURL: undefined, image: undefined, isWhite: false},
				alpha: {dataURL: undefined, image: undefined, isWhite: false},
			}

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