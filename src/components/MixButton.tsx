import { useState } from "react"

import { CircleNotch } from "phosphor-react"

interface IMixButtonProps {
	handleClick: () => void
	isLoading: boolean
}

export default function MixButton({ handleClick, isLoading }:IMixButtonProps) {

	const [isSpinning, setIsSpinning] = useState(false)

	const loadingIcon = (
		<div className="m-auto p-auto animate-spin">
			<CircleNotch color="#FFFFFF" weight="regular" size={32}/>
		</div>
	)

	function MixClicked() {
		setIsSpinning(true)
		handleClick()
	}

	return (
		<button onClick={() => MixClicked()} className={
			"flex items-center justify-center text-lg text-light-background rounded-md w-16 h-full"
			+ " " +
			"hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white"
			+ " " +
			( isLoading ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white" : "bg-light-accent" )
		}>
			{isLoading ? loadingIcon : "MIX"}
		</button>
	)
}