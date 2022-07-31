/* eslint-disable no-magic-numbers */
import { useState } from "react"

import { Image, ImageKind } from "image-js"

export default function App() {

	const [file, setFile] = useState<string | Promise<string>>("")

	const [redChannel, setRedChannel] = useState<string | Promise<string>>("")
	const [greenChannel, setGreenChannel] = useState<string | Promise<string>>("")
	const [blueChannel, setBlueChannel] = useState<string | Promise<string>>("")
	const [alphaChannel, setAlphaChannel] = useState<string | Promise<string>>("")

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

			// const imageToShow = newImage.toDataURL()

			const mixedImage = newImage.setChannel(0, greyR).setChannel(1, greyG).setChannel(2, greyB).setChannel(3, greyA)

			const dataUrlImage = mixedImage.toDataURL()

			console.log(dataUrlImage)

			setFile(dataUrlImage)

			mixedImage.save("output.jpg")

			// return grey.save("output.jpeg", { format: "png", encoder: })

		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<h1>channel-mixer</h1>
			<button onClick={Mix}>Mix</button>
			{/* <input type="file"
				id="avatar" name="avatar"
				onChange={e => {
					if(e != null){
						if(e.target){
							if(e.target.files)
								LoadFile(e.target.files[0])
						}
					}
				}}
				accept="image/png, image/jpeg" /> */}
			{file ?
				<p className="img-preview-wrapper">
					{
						<img src={file as string} alt="preview" />
					}
				</p> : null}
		</div>
	)
}