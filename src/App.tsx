import ImageOutput from "./components/ImageOutput"
import InputChannel from "./components/InputChannel"
import MixButton from "./components/MixButton"

export default function App() {

	return (
		<main className="flex flex-col gap-8 w-full h-full items-center justify-center">
			<section id="input" className="flex flex-row gap-3">
				<InputChannel channel="red"/>
				<InputChannel channel="green"/>
				<InputChannel channel="blue"/>
				<InputChannel channel="alpha"/>
			</section>
			<section id="output" className="flex flex-row gap-3">
				<MixButton />
				<ImageOutput />
			</section>
		</main>
	)
}