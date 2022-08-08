export interface IAPI {
	saveFile: (file: string) => void,
}

declare global {
	interface Window {
		api: IAPI
	}
}