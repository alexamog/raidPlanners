import create from "zustand";
import produce from "immer";
import { v4 as uuidv4 } from 'uuid';

export const useDB = create((set) => ({
    mockUpDB: [
        {
            id: "1",
            author: "Devan",
            authorId: "dev123",
            title: "Friday Raid Night",
            description: "come bingChilling",
            datetime: "2023-02-08T12:12",
            location: "1234 house ave.",
            attending: ["165897917004120064"]
        },
        {
            id: "2",
            author: "Alex",
            authorId: "ale123",
            title: "Leetcode Session",
            description: "Leetcode grind time!!",
            datetime: "2023-02-08T12:12",
            location: "Discord",
            attending: []
        },
        {
            id: "3",
            author: "Bry-guy",
            authorId: "bryguy",
            title: "Antman Movie",
            description: "Cineplex!",
            datetime: "2023-02-08T12:12",
            location: "Silvercity Cineplex",
            attending: []
        }
    ],
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
                const idx = state.mockUpDB.indexOf(state.mockUpDB.find((card) => card.id == cardId))
                state.mockUpDB.pop(idx)
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
            })
        )
}));