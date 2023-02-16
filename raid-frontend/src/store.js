import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
    profile: {
        username: null,
        avatar: ""
    },
    setProfile: (profile) =>
        set(
            produce((state) => {
                state.profile = {
                    username: profile.username,
                    avatar: profile.profilePicture
                }
            })
        ),
}));