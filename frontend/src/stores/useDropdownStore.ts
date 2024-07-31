import { create } from "zustand";
import { DropdownState } from "../types/indext";

const useDropdownStore = create<DropdownState>((set) => ({
  isCommunityOpen: false,
  isShoppingOpen: false,

  toggleCommunity: () =>
    set((state) => ({
      isCommunityOpen: !state.isCommunityOpen,
      isShoppingOpen: false,
    })),

  toggleShopping: () =>
    set((state) => ({
      isShoppingOpen: !state.isShoppingOpen,
      isCommunityOpen: false,
    })),

  closeAll: () => set({ isCommunityOpen: false, isShoppingOpen: false }),
}));

export default useDropdownStore;
