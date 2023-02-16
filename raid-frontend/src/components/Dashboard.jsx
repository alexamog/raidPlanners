import { SimpleGrid, Box, VStack, Heading } from "@chakra-ui/react"
import HangoutCard from "./HangoutCard"
import { useStore } from "../store";
import Landing from "./landingPage/Landing"
import { mockUpDB } from "./mockupDB";

export default function Dashboard() {
    const profile = useStore((state) => state.profile);
    if (profile.username == null) {
        return <Landing />
    }
    return (
        <Box>
            <VStack>
                <Box>
                    <Heading p="0.1em" textAlign={{ base: "center", sm: "left" }}>Attending: </Heading>
                    <SimpleGrid columns={3} spacing={5} display={{ base: "flex", sm: "grid" }} flexDirection={{ base: "column" }} >
                        {mockUpDB.filter(hangout => hangout.attending.includes(profile.id)).map(hangout => (
                            <HangoutCard key={hangout.id} author={hangout.author} title={hangout.title} description={hangout.description}
                                datetime={hangout.datetime}
                                location={hangout.location}
                            />
                        ))}

                    </SimpleGrid>
                </Box>
            </VStack >
            <VStack>
                <Box>
                    <Heading p="0.1em" textAlign={{ base: "center", sm: "left" }}>Available: </Heading>
                    <SimpleGrid columns={3} spacing={5} display={{ base: "flex", sm: "grid" }} flexDirection={{ base: "column" }}>
                        {mockUpDB.filter(hangout => !hangout.attending.includes(profile.id)).map(hangout => (
                            <HangoutCard key={hangout.id} author={hangout.author} title={hangout.title} description={hangout.description}
                                datetime={hangout.datetime}
                                location={hangout.location}
                            />
                        ))}
                    </SimpleGrid>
                </Box>
            </VStack>
        </Box>
    )
}