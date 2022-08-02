import { useEffect, useState } from "react"

import { TChannel } from "../types/types"

interface IInputChannelProps {
	channel: TChannel
}

export default function InputChannel({ channel }:IInputChannelProps) {

	const [isWhite, setIsWhite] = useState(false)

	function handleSwitch() {
		setIsWhite(!isWhite)
	}

	useEffect(() => {
		console.log(isWhite)
	}, [isWhite])

	return (
		<div id="input-channel" className="flex flex-col gap-3 w-32">
			<div id="image-input" className="w-32 h-32 border-2 border-light-accent rounded-md">

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