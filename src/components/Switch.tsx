interface ISwitchProps {
	isWhite: boolean
	handleSwitch: () => void
}

export default function Switch({ isWhite, handleSwitch }:ISwitchProps) {

	return (
		<label className="inline-flex relative items-center cursor-pointer border-2 border-light-accent rounded-md p-0 m-0">
			<input
				type="checkbox"
				className="sr-only peer"
				checked={isWhite}
				readOnly
			/>
			<div
				onClick={() => {handleSwitch()}}
				className="w-9 h-5 m-0 bg-light-background rounded-md
				peer peer-checked:after:translate-x-full
				after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-light-accent after:border after:rounded-sm after:h-4 after:w-4 after:transition-all"
			></div>
		</label>
	)
}