import { create } from "zustand";
import { devtools, DevtoolsOptions } from "zustand/middleware";
import { User, UserLogin, UserSignUp } from "../types/userType";
import userService from "../api/userService";

interface UserState {
  user: User | null;
  login: (userLogin: UserLogin) => Promise<void>;
  signUp: (userSignUp: UserSignUp) => Promise<void>;
}

const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      login: async (userLogin: UserLogin) => {
        try {
          const user = await userService.login(userLogin);
          set({ user });
        } catch (error) {
          throw error;
        }
      },
      signUp: async (userSignup: UserSignUp) => {
        try {
          const newUser = await userService.signUp(userSignup);
          set({ user: newUser });
        } catch (error) {
          throw error;
        }
      },
    }),

    { name: "UserStore" } as DevtoolsOptions
  )
);

export default useUserStore;

