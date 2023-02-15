import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
    token: null,
    profile: {
        name: "Developer",
        avatar: ""
    },
    setToken: (token) => set(
        produce((state) => {
            state.token = token;
        })
    ),
    setProfile: (profile) =>
        set(
            produce((state) => {
                state.profile = {
                    "name": profile.firstName,
                    "avatar": profile.avatar
                }
            })
        ),
}));