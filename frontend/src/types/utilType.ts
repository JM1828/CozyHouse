export interface DropdownState {
  isCommunityOpen: boolean;
  isShoppingOpen: boolean;

  toggleCommunity: () => void;
  toggleShopping: () => void;
  closeAll: () => void;
}

export interface DarkModeState {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

  toggleDarkMode: () => void;
}

export interface SvgState {
  className?: string;
}

