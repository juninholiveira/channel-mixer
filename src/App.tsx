import { TitleBar } from "react-desktop/windows"

export default function App() {
	return (
		<div>
			<TitleBar
				title="Channel Mixer"
				controls={true}
				isMaximized={true}
				theme={"light"}
				background={"#CFF465"}
				onCloseClick={() => {console.log("close")}}
				onMinimizeClick={() => {console.log("minimize")}}
				onMaximizeClick={() => {console.log("maximize")}}
				onRestoreDownClick={() => {console.log("restoreDownClick")}}
			/>
			<h1>channel-mixer</h1>
		</div>
	)
}