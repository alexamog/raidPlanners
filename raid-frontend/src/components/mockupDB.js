import create from "zustand";
import produce from "immer";
import { v4 as uuidv4 } from 'uuid';

export const useDB = create((set) => ({
    mockUpDB: [],
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