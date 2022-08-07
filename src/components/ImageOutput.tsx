import { FloppyDisk } from "phosphor-react"

interface IImageOutputProps {
	preview: string | undefined
}

export default function ImageOutput({preview}:IImageOutputProps) {

	function handleSave() {
		if (preview)
			window.api.saveFile(preview, "ORM")
	}

	return (
		<div
			className="relative group w-36 h-36 border-2 border-light-accent rounded-md flex items-center justify-center hover:cursor-pointer"
			// Conditionally add a onClick to save the iamge if there's any image
			{...(preview && { onClick: () => handleSave()})}
		>
			{
				// Shows a Save icon when hovering the container with an image loaded
				preview && <FloppyDisk color="#CFF465" weight="regular" size={32} className="hidden group-hover:block"/>
			}
			<div className={"absolute -z-10 h-full w-full m-0 p-0 flex"}>
				{ preview && <img src={`data:image/png;base64,${preview}`} alt="image" className="max-w-full max-h-full m-auto group-hover:brightness-50" /> }
			</div>
		</div>
	)
}