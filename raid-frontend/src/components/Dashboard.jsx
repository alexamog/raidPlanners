import { SimpleGrid, Box, VStack, HStack, Center, Button } from "@chakra-ui/react"
import HangoutCard from "./HangoutCard"
import { useStore } from "../store";
import { useNavigate } from "@tanstack/react-location";
import Landing from "./landingPage/Landing"
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Dashboard() {
    const profile = useStore((state) => state.profile);
    const navigate = useNavigate();
    const [cardsList, setCardsList] = useState([]);
    if (profile.username == null) {
        return <Landing />
    }
    useEffect( () => {
        const fetchCards = async () => {
            const data = await axios.get("http://localhost:3001/db/getall", {withCredentials: true})
            return data
        }
        fetchCards()
        .then((resp) => {
            setCardsList(resp.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);
    return (
        <Box align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}>
            <VStack>
                <Box>
                    <SimpleGrid columns={3} spacing={5} display={{ base: "flex", sm: "grid" }} flexDirection={{ base: "column" }} >
                        {cardsList.length != 0 && cardsList.map(hangout => {
                            return (
                                <HangoutCard
                                    key={hangout.hangout_id}
                                    id={hangout.hangout_id}
                                    author="Placeholder for now"
                                    title={hangout.hangout_title}
                                    description={hangout.hangout_description}
                                    datetime={hangout.hangout_date}
                                    location={hangout.hangout_location}
                                    attendees={["1", "2", "3"]}
                                    authorId={hangout.hangout_authorId}
                                    avatar={""}
                                    authorDiscriminator={"mock"}
                                />
                            )
                        })}
                    </SimpleGrid>
                </Box>
                {cardsList.length == 0 &&
                    <VStack>
                        <SimpleGrid columns={1} spacing={5} display={{ base: "flex", sm: "grid" }} flexDirection={{ base: "column" }} >
                            <HStack>
                                <VStack>
                                <Center fontSize={"3em"}>Uh oh.. looks like its empty 👀</Center>
                                    <Button onClick={()=>navigate({ to: "/create", replace: true })}>
                                        Create hangout
                                    </Button>
                                </VStack>
                            </HStack>

                        </SimpleGrid>
                    </VStack>
                }
            </VStack >
        </Box>
    )
}