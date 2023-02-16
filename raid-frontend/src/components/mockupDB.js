import { v4 as uuidv4 } from 'uuid';

const mockUpDB = [
    {
        id: "1",
        author: "Devan",
        title: "Friday Raid Night",
        description: "come bingChilling",
        datetime: "2023-02-08T12:12",
        location: "1234 house ave.",
        attending: ["165897917004120064"]
    },
    {
        id: "2",
        author: "Alex",
        title: "Leetcode Session",
        description: "Leetcode grind time!!",
        datetime: "2023-02-08T12:12",
        location: "Discord",
        attending: []
    },
    {
        id: "3",
        author: "Bry-guy",
        title: "Antman Movie",
        description: "Cineplex!",
        datetime: "2023-02-08T12:12",
        location: "Silvercity Cineplex",
        attending: ["165897917004120064"]
    }
]

const addCard = (card) => {
    mockUpDB.push({
        id: uuidv4(),
        author: card.author,
        title: card.title,
        description: card.desc,
        datetime: card.datetime,
        location: card.location,
        attending: card.attending
    })
}
export {
    mockUpDB,
    addCard
}