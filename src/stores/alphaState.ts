import create from "zustand"

type State = {
	alphaState: boolean
	switchAlphaState: (newAlphaState: boolean) => void
}

const useAlphaStateStore = create<State>((set) => ({

	alphaState: false,

	switchAlphaState: (newAlphaState) => set({ alphaState: newAlphaState }),
}))

export default useAlphaStateStore
