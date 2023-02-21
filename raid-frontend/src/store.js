import create from "zustand";
import produce from "immer";

export const useStore = create((set) => ({
    profile: {
        username: null,
        avatar: null,
        id: null,
        discriminator: null
    },
    setProfile: (profile) =>
        set(
            produce((state) => {
                state.profile = {
                    username: profile.user_name,
                    avatar: profile.user_avatar,
                    id: profile.user_id,
                    discriminator: profile.user_discriminator
                }
            })
        ),
}));