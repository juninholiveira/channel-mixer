import { useState } from "react"

import { Image } from "image-js"

export default function App() {

	const [file, setFile] = useState<string | Promise<string>>("")

	// function LoadFile(event: File | null) {
	// 	if(event != null) {
	// 		const file = event.target.files[0]
	// 		const reader = new FileReader()
	// 		reader.onload = function(event) {
	// 			setSelectedFile(event?.target?.result ? event.target.result : "")
	// 		}
	// 		reader.readAsText(file)
	// 	}
	// }

	async function Mix() {
		try {
			const image = await Image.load("X:/Pessoal/Dev/channel-mixer/src/T_RockyGround_4K_Albedo.jpg")

			const grey = image
				.grey()
				.resize({ width: 200 })
				.toDataURL("image/png")

			setFile(grey)

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