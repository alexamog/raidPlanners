import { v4 as uuidv4 } from "uuid";
import create from "zustand";
import produce from "immer";

export const useDB = create((set) => ({
    mockUpDB: [{
        id: "12",
        author: "Bry-guy",
        authorId: "100319324333432832",
        discriminator: "831",
        avatar: "a57b03dcb179eb2ca827f55fbb828b08",
        title: "Raid Event",
        description: "Raid with the boys!",
        datetime: "2023-02-21T15:40",
        location: "98311 Young more ave.",
        attending: ["100319324333432832"]
      }],
    updateCard: (cardId, userId, attending) =>
        set(
            produce((state) => {
                const card = state.mockUpDB.find((card) => card.id == cardId)
                if (attending && !card.attending.includes(userId)) {
                    card.attending.push(userId);
                }
                if (!attending && card.attending.includes(userId)) {
                    const idx = card.attending.indexOf(userId)
                    card.attending.pop(idx)
                }
            })
        ),
    deleteCard: (cardId) =>
        set(
            produce((state) => {
                const idx = state.mockUpDB.indexOf(state.mockUpDB.find((plan) => plan.id == cardId))
                state.mockUpDB.splice(idx, 1)
            })
        ),
    addCard: (card) =>
        set(
            produce((state) => {
                state.mockUpDB.push({
                    id: uuidv4(),
                    author: card.author,
                    authorId: card.authorId,
                    title: card.title,
                    description: card.desc,
                    datetime: card.datetime,
                    location: card.location,
                    attending: card.attending
                })
                console.log(console.log(state.mockUpDB[-1])
                )
            })
        )
}));