import { create } from "zustand"

const initialState = {
  isSearch: false
}

const useCommonStore = create((set, get) => ({
  ...initialState,
  setState: (nextState) => set(() => ({ ...nextState })),
  getState: () => get(),

}))

export default useCommonStore