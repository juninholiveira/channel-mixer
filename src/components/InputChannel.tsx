import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

import { FileArrowUp, FileX, Trash } from "phosphor-react"

import useAlphaStateStore from "../stores/alphaState"
import { TChannel } from "../types/types"
import DeactivatedInputContainer from "./DeactivatedInputContainer"
import Switch from "./Switch"

interface IInputChannelProps {
	channel: TChannel
	SetImageBlueprint: (channel:TChannel, value:string | undefined, isWhite:boolean) => void
}

export default function InputChannel({ channel, SetImageBlueprint }:IInputChannelProps) {

	const [isWhite, setIsWhite] = useState(false)
	const [imageFile, setImageFile] = useState<string | undefined>()

	const alphaState = useAlphaStateStore(state => state.alphaState)
	const switchAlphaState = useAlphaStateStore(state => state.switchAlphaState)

	function handleSwitch() {
		// SetImageBlueprint(channel, undefined, !isWhite)
		setIsWhite(prev => !prev)
		setImageFile(undefined)
	}

	function handleDelete() {
		setImageFile(undefined)
		// SetImageBlueprint(channel, undefined, isWhite)
	}

	useEffect(() => {
		// console.log(channel, isWhite, imageFile ? true : false)
		SetImageBlueprint(channel, imageFile, isWhite)
	}, [isWhite, imageFile])

	const onDrop = useCallback((acceptedFiles:File[]) => {

		const reader = new FileReader()

		reader.onabort = () => console.log("file reading was aborted")
		reader.onerror = () => console.log("file reading has failed")
		reader.onload = () => {
			setImageFile(reader.result as string)
			setIsWhite(false)
			SetImageBlueprint(channel, reader.result as string, isWhite)
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
		},
	})

	return (
		<div id="input-channel" className="flex flex-col gap-3 w-36">
			{
				channel !== "alpha" ?
					<div id="image-input" {...getRootProps()}
						className={
							"group w-full h-36 border-2 rounded-md flex items-center justify-center relative cursor-pointer"
					+ " " +
					(isDragAccept ? "border-[#00DA16] border-dashed" : isDragReject ? "border-[#DA0000] border-dashed" : "border-light-accent")
						}
						// Conditionally add an onClick event only if there's an image loaded, or else it would interfere with the click to open file system dialog
						{...(imageFile != undefined && { onClick: () => handleDelete()})}

					>
						<input {...getInputProps()}/>
						{
							// Add icons based on the type of the drag
							isDragAccept ? <FileArrowUp color="#00DA16" weight="regular" size={32}/> :
								isDragReject ? <FileX color="#DA0000" weight="regular" size={32}/> :
								// Case there's no image loaded, show a text with the channel name
									imageFile == undefined ? <p className={"text-base group-hover:hidden" + " " + (isWhite ? "text-light-background" : "text-light-accent")}>{channel.toUpperCase()}</p> :
										<></>
						}
						{
							// Shows a Trash icon when hovering the container with an image loaded
							imageFile != undefined ? <Trash color="#CFF465" weight="regular" size={32} className="hidden group-hover:block"/> : <></>
						}
						{
							imageFile == undefined ? <FileArrowUp color={isWhite ? "#000000" : "#CFF465"} weight="regular" size={32} className="hidden group-hover:block" /> : <></>
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
					:
					<></>
			}
			{
				channel === "alpha" && alphaState === true ?
					<div id="image-input" {...getRootProps()}
						className={
							"group w-full h-36 border-2 rounded-md flex items-center justify-center relative cursor-pointer"
					+ " " +
					(isDragAccept ? "border-[#00DA16] border-dashed" : isDragReject ? "border-[#DA0000] border-dashed" : "border-light-accent")
						}
						// Conditionally add an onClick event only if there's an image loaded, or else it would interfere with the click to open file system dialog
						{...(imageFile != undefined && { onClick: () => handleDelete()})}

					>
						<input {...getInputProps()}/>
						{
							// Add icons based on the type of the drag
							isDragAccept ? <FileArrowUp color="#00DA16" weight="regular" size={32}/> :
								isDragReject ? <FileX color="#DA0000" weight="regular" size={32}/> :
								// Case there's no image loaded, show a text with the channel name
									imageFile == undefined ? <p className={"text-base group-hover:hidden" + " " + (isWhite ? "text-light-background" : "text-light-accent")}>{channel.toUpperCase()}</p> :
										<></>
						}
						{
							// Shows a Trash icon when hovering the container with an image loaded
							imageFile != undefined ? <Trash color="#CFF465" weight="regular" size={32} className="hidden group-hover:block"/> : <></>
						}
						{
							imageFile == undefined ? <FileArrowUp color={isWhite ? "#000000" : "#CFF465"} weight="regular" size={32} className="hidden group-hover:block" /> : <></>
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
					: channel === "alpha" ?
						<DeactivatedInputContainer />
						:
						<></>
			}
			<div id="bottom" className="flex flex-row gap-2 justify-between">
				<Switch isWhite={isWhite} isEnable={channel !== "alpha" ? imageFile == undefined : alphaState} handleSwitch={() => handleSwitch()} />
				{ channel === "alpha" && <Switch isWhite={alphaState} isEnable={true} handleSwitch={() => switchAlphaState(!alphaState)} />}

			</div>
		</div>
	)
}