import { SimpleGrid, Box, VStack, Heading, HStack } from "@chakra-ui/react"
import HangoutCard from "./HangoutCard"
import { useStore } from "../store";
import Landing from "./landingPage/Landing"
import { useDB } from "./mockupDB";
import { Text } from "@chakra-ui/react"

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
                        {mockUpDB.length > 0 && mockUpDB.map(hangout => (
                            <HangoutCard key={hangout.id} id={hangout.id} author={hangout.author} title={hangout.title} description={hangout.description}
                                datetime={hangout.datetime}
                                location={hangout.location}
                                attendees={hangout.attending}
                                authorId={hangout.authorId}
                            />
                        ))}
                    </SimpleGrid>
                </Box>
                {mockUpDB.length == 0 &&
                    <VStack>
                        <SimpleGrid columns={1} spacing={5} display={{ base: "flex", sm: "grid" }} flexDirection={{ base: "column" }} >
                            <HStack>
                                <Text fontSize={"3em"}>Uh oh.. looks like its empty 👀</Text>
                            </HStack>

                        </SimpleGrid>
                    </VStack>
                }
            </VStack >
        </Box>
    )
}