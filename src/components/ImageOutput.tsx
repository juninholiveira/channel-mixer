interface IImageOutputProps {
	preview: string | undefined
}

export default function ImageOutput({preview}:IImageOutputProps) {
	return (
		<div className="w-36 h-36 border-2 border-light-accent rounded-md">
			{ preview ? <img src={preview} alt="image" className="max-w-full max-h-full m-auto group-hover:brightness-50" /> : <p>No Preview...</p>}
		</div>
	)
}