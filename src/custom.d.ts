export interface IAPI {
	sendFile: (file: string) => void,
}

declare global {
	interface Window {
		api: IAPI
	}
}