import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

import { FileArrowUp, FileX, Trash } from "phosphor-react"

import { TChannel } from "../types/types"
import Switch from "./Switch"

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
		noClick: imageFile != undefined,
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
					"w-full h-36 border-2 rounded-md flex items-center justify-center relative group"
					+ " " +
					(isDragAccept ? "border-[#00DA16] border-dashed" : isDragReject ? "border-[#DA0000] border-dashed" : "border-light-accent")
				}
				// Conditionally add an onClick event only if there's an image loaded, or else it would interfere with the click to open file system dialog
				{...(imageFile != undefined && { onClick: () => setImageFile(undefined)})}

			>
				<input {...getInputProps()}/>
				{
					// Add icons based on the type of the drag
					isDragAccept ? <FileArrowUp color="#00DA16" weight="regular" size={32}/> :
						isDragReject ? <FileX color="#DA0000" weight="regular" size={32}/> :
							// Case there's no image loaded, show a text with the channel name
							imageFile == undefined ? <p className={"text-base" + " " + (isWhite ? "text-light-background" : "text-light-accent")}>{channel.toUpperCase()}</p> :
								<></>
				}
				{
					// Shows a Trash icon when hovering the container with an image loaded
					imageFile != undefined ? <Trash color="#CFF465" weight="regular" size={32} className="hidden group-hover:block"/> : <></>
				}
				<div className={
					"absolute -z-10 h-full w-full m-0 p-0 flex"
					+ " " +
					(isWhite ? "bg-zinc-200" : "bg-black")
				}
				>
					{
						// Case there's an image loaded, show it on the img tag
						imageFile != undefined ? <img src={imageFile} alt="image" className="max-w-full max-h-full m-auto group-hover:brightness-50" /> : <></>
					}
				</div>
			</div>
			<div id="bottom" className="flex flex-row gap-2">
				<textarea id="channel-suffix"
					className="
						resize-none p-1 border-2 h-6 border-light-accent bg-light-background overflow-hidden rounded-md
						text-xs text-light-accent leading-3
						focus:outline-none focus:border-[#00DA16]"
					maxLength={10} placeholder={`${channel} suffix...`}/>
				<Switch isWhite={isWhite} isEnable={imageFile == undefined} handleSwitch={() => handleSwitch()} />
			</div>
		</div>
	)
}