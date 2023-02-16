import { SimpleGrid, Box, VStack, Heading } from "@chakra-ui/react"
import HangoutCard from "./HangoutCard"
import { useStore } from "../store";
import Landing from "./landingPage/Landing"
import { useDB } from "./mockupDB";

export default function Dashboard() {
    const profile = useStore((state) => state.profile);
    const mockUpDB = useDB((state) => state.mockUpDB);
    if (profile.username == null) {
        return <Landing />
    }
    return (
        <Box>
            <VStack>
                <Box>
                    <SimpleGrid columns={3} spacing={5} display={{ base: "flex", sm: "grid" }} flexDirection={{ base: "column" }} >
                        {mockUpDB.map(hangout => (
                            <HangoutCard key={hangout.id} id={hangout.id} author={hangout.author} title={hangout.title} description={hangout.description}
                                datetime={hangout.datetime}
                                location={hangout.location}
                                attendees = {hangout.attending}
                            />
                        ))}

                    </SimpleGrid>
                </Box>
            </VStack >
        </Box>
    )
}