import { create } from "zustand";

export type TAuthState = {
  jwt: string;
  loader: boolean;
};

export type TAuthStoreActions = {
  setJwt: (jwt: string) => void;
  setLoader: (loader: boolean) => void;
  clearState: () => void;
};

const initialState: TAuthState = {
  jwt: "",
  loader: false,
};

const useAuthStore = create<TAuthState & TAuthStoreActions>((set) => ({
  ...initialState,
  setJwt: (jwt) => set({ jwt }),
  setLoader: (loader) => set({ loader }),
  clearState: () => set(initialState),
}));

export default useAuthStore;
