import { useCallback, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"

import { TChannel } from "../types/types"

interface IInputChannelProps {
	channel: TChannel
}

export default function InputChannel({ channel }:IInputChannelProps) {

	const [isWhite, setIsWhite] = useState(false)

	function handleSwitch() {
		setIsWhite(!isWhite)
	}

	const onDrop = useCallback((acceptedFiles:any) => {

		// Do something with the files
		acceptedFiles.forEach((file:any) => {
			const reader = new FileReader()

			reader.onabort = () => console.log("file reading was aborted")
			reader.onerror = () => console.log("file reading has failed")
			reader.onload = () => {
				// Do whatever you want with the file contents
				const binaryStr = reader.result
				console.log(binaryStr)
			}
			reader.readAsArrayBuffer(file)
		})
	}, [])

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop,
		multiple: false,
		accept: {
			"image/jpeg": [],
			"image/png": [],
			// "image/tiff": [],
			// "image/pipeg": [],
			// "image/bmp": [],
		},
	})

	return (
		<div id="input-channel" className="flex flex-col gap-3 w-36">
			<div id="image-input" {...getRootProps()}
				className={
					"w-full h-36 border-2 rounded-md"
					+ " " +
					(isDragAccept ? "drag-accept" : isDragReject ? "drag-reject" : "neutral")
				}
			>
				<input {...getInputProps()} />
				{
					isDragActive ?
						<p>Drop the files here ...</p> :
						<p>Drag n drop some files here, or click to select files</p>
				}
			</div>
			<div id="bottom" className="flex flex-row gap-2">
				<textarea id="channel-suffix"
					className="
						resize-none p-1 border-2 h-6 border-light-accent bg-light-background overflow-hidden rounded-md
						text-xs text-light-accent leading-3
						focus:outline-none focus:border-green-800"
					maxLength={10} placeholder={`${channel} suffix...`}/>
				<label className="inline-flex relative items-center cursor-pointer border-2 border-light-accent rounded-md p-0 m-0">
					<input
						type="checkbox"
						className="sr-only peer"
						checked={isWhite}
						readOnly
					/>
					<div
						onClick={() => {
							handleSwitch()
						}}
						className="w-9 h-5 m-0 bg-light-background rounded-sm
						peer peer-checked:after:translate-x-full
						after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-light-accent after:border after:rounded-sm after:h-4 after:w-4 after:transition-all"
					></div>
				</label>
			</div>
		</div>
	)
}