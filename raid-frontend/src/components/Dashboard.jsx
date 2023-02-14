import { SimpleGrid, Box, HStack, VStack, Heading } from "@chakra-ui/react"
import HangoutCard from "./HangoutCard"

export default function Dashboard() {
    const mockUpDB = [
        {
            "author": "Devan",
            "title": "Friday Raid Night",
            "description": "come bingChilling",
            "date": "2023-02-17",
            "time": "13:00pm - 20:00pm",
            "location": "1234 house ave."
        },
        {
            "author": "Alex",
            "title": "Leetcode Session",
            "description": "Leetcode grind time!!",
            "date": "2023-02-15",
            "time": "12:00pm - 15:00pm",
            "location": "Discord"
        },
        {
            "author": "Bry-guy",
            "title": "Antman Movie",
            "description": "Cineplex!",
            "date": "2023-02-14",
            "time": "20:00pm - 23:00pm",
            "location": "Silvercity Cineplex"
        }
    ]
    return (
        <VStack>
            <Box>
                <SimpleGrid columns={3} spacing={10}>
                    {mockUpDB.map((plan, idx) => {
                        return (
                            <HangoutCard key={idx} author={plan.author} title={plan.title} description={plan.description}
                                date={plan.date}
                                time={plan.time}
                                location={plan.location} />
                        )
                    })}
                </SimpleGrid>
            </Box>
        </VStack>
    )
}