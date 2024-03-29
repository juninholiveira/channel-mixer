interface IMixButtonProps {
	handleClick: () => void
}

export default function MixButton({ handleClick }:IMixButtonProps) {
	return (
		<button onClick={() => handleClick()} className="bg-light-accent text-lg text-light-background rounded-md w-16 h-full hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-500 hover:text-white">
				MIX
		</button>
	)
}