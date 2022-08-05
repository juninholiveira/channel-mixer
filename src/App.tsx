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

	const [preview, setPreview] = useState<string | undefined>(undefined)

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

			// Criar um clone do ImageBlueprint para usar no processamento
			const image : IImageBlueprint = Object.assign({}, imageBlueprint)
			console.log(image)

			// Carregar todos os arquivos de imagem carregados
			if (image.red.dataURL !== undefined)
				image.red.image = await Image.load(image.red.dataURL)
			if (image.green.dataURL !== undefined)
				image.green.image = await Image.load(image.green.dataURL)
			if (image.blue.dataURL !== undefined)
				image.blue.image = await Image.load(image.blue.dataURL)
			if (image.alpha.dataURL !== undefined)
				image.alpha.image = await Image.load(image.alpha.dataURL)

			// Barrar se houver tamanhos diferentes
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

			// Salvar no topo do objeto o Width e Height

			// Converter elas para cinza (1 canal) só por segurança
			if(image.red.image?.components === 1)
				image.red.image = image.red.image.grey()
			if(image.green.image?.components === 1)
				image.green.image = image.green.image.grey()
			if(image.blue.image?.components === 1)
				image.blue.image = image.blue.image.grey()
			if(image.alpha.image?.components === 1)
				image.alpha.image = image.alpha.image.grey()

			// Criar uma imagem ou preta ou branca para os restantes
			if(image.red.image === undefined)
				image.red.image = new Image(512, 512, new Uint8Array(512 * 512).fill(image.red.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(image.green.image === undefined)
				image.green.image = new Image(512, 512, new Uint8Array(512 * 512).fill(image.green.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(image.blue.image === undefined)
				image.blue.image = new Image(512, 512, new Uint8Array(512 * 512).fill(image.blue.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})
			if(image.alpha.image === undefined)
				image.alpha.image = new Image(512, 512, new Uint8Array(512 * 512).fill(image.alpha.isWhite ? 255 : 0), {kind: "GREY" as ImageKind})

			// Criar uma IMAGE e aplicar os 4 canais nela
			const finalTexture = new Image(512, 512, new Uint8Array(512 * 512 * 4), {kind: "RGBA" as ImageKind})
				.setChannel(0, image.red.image)
				.setChannel(1, image.green.image)
				.setChannel(2, image.blue.image)
				.setChannel(3, image.alpha.image)

			// Encoda para DataURL
			const dataUrlImage = finalTexture.toDataURL()

			// Exibe na interface
			setPreview(dataUrlImage)
			console.log(dataUrlImage)

			// Reseta tudo
			// TO DO = Durante o processo de Mix eu to alterando o objeto original, isso ta dando problema na hora de mixar pela segunda vez.
			// preciso dar um jeito de salvar as configurações do usuário de forma fixa
			// e configurar o mix num objeto diferente
			// image = undefined

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