import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import { FileArrowUp, FileX } from "phosphor-react"

import { TChannel } from "../types/types"

interface IInputChannelProps {
	channel: TChannel
}

export default function InputChannel({ channel }:IInputChannelProps) {

	const [isWhite, setIsWhite] = useState(false)
	const [imageFile, setImageFile] = useState<string | undefined>()

	function handleSwitch() {
		setIsWhite(!isWhite)
	}

	const onDrop = useCallback((acceptedFiles:File[]) => {

		const reader = new FileReader()

		reader.onabort = () => console.log("file reading was aborted")
		reader.onerror = () => console.log("file reading has failed")
		reader.onload = () => {
			setImageFile(reader.result as string)
		}

		reader.readAsDataURL(acceptedFiles[0])

	}, [])

	const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
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
					"w-full h-36 border-2 rounded-md flex items-center justify-center relative"
					+ " " +
					(isDragAccept ? "drag-accept" : isDragReject ? "drag-reject" : "neutral")
				}
			>
				<input {...getInputProps()} />
				{
					isDragAccept ?
						<FileArrowUp color="#00DA16" weight="regular" size={32}/> :
						isDragReject ?
							<FileX color="#DA0000" weight="regular" size={32}/> :
							imageFile == undefined ?
								<p className="text-light-accent text-base">{channel.toUpperCase()}</p> :
								<></>
				}
				<div className={
					"absolute -z-10 h-full w-full m-0 p-0 flex"
						+ " " +
						(isWhite ? "bg-zinc-200" : "bg-black")
				}
				>
					{
						imageFile != undefined ? <img src={imageFile} alt="image" className="max-w-full max-h-full m-auto" /> : <></>
					}
				</div>
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
						className="w-9 h-5 m-0 bg-light-background rounded-md
						peer peer-checked:after:translate-x-full
						after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-light-accent after:border after:rounded-sm after:h-4 after:w-4 after:transition-all"
					></div>
				</label>
			</div>
		</div>
	)
}