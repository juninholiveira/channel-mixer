export interface IAPI {
	saveFile: (file: string, suffix: string) => void,
}

declare global {
	interface Window {
		api: IAPI
	}
}