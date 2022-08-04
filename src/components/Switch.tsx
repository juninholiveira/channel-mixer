interface ISwitchProps {
	isWhite: boolean
	isEnable: boolean
	handleSwitch: () => void
}

export default function Switch({ isWhite, isEnable, handleSwitch }:ISwitchProps) {

	return (
		<label className={"inline-flex relative items-center cursor-pointer border-2 rounded-md p-0 m-0" + " " + (isEnable ? "border-light-accent" : "border-zinc-500")}>
			<input
				type="checkbox"
				className="sr-only peer"
				checked={isWhite}
				readOnly
			/>
			<div
				{...(isEnable && { onClick: () => handleSwitch()})}
				className={
					"w-9 h-5 m-0 bg-light-background rounded-md peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:rounded-sm after:h-4 after:w-4 after:transition-all"
					+ " " +
					(isEnable ? "after:bg-light-accent" : "after:bg-zinc-500")
				}
			></div>
		</label>
	)
}