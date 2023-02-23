import { useStore } from '../store';
import { useState, useEffect } from 'react';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from "@tanstack/react-location";
import { FaDiscord } from 'react-icons/fa';

import { useMatch } from '@tanstack/react-location';

export default function ViewCard() {
    const {
        data: { card },
    } = useMatch()
    const navigate = useNavigate();
    const profile = useStore((state) => state.profile);
    const [attending, setAttending] = useState(null);
    const [attendees, setAttendees] = useState([]);
    if (card == undefined) {
        return (<Box>
            <Center>
                <Heading>
                    Card not found.
                </Heading>
            </Center>
        </Box>)
    }

    const fetchAttendees = async () => {
        const data = await axios.get(`http://localhost:3001/db/getAttendees/${card.hangout_id}`, { withCredentials: true })
        return data
    }

    const handleAttendee = async () => {
        await fetchAttendees()
            .then((resp) => {
                if (resp.data.includes(profile.id)) {
                    setAttending(true)
                }
                setAttendees(resp.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchAttendees()
            .then((resp) => {
                if (resp.data.includes(profile.id)) {
                    setAttending(true)
                }
                setAttendees(resp.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    const deleteCard = async (hangoutId) => {
        await axios.post("http://localhost:3001/db/dropCard", { cardId: hangoutId }, { withCredentials: true })
            .then((resp) => {
                alert("Card deleted.")
                navigate({ to: "/hangouts", replace: true })

            })
            .catch((err) => {
                console.log(err.data)
            })
    }

    const handleClick = async (hangoutId, authorId, attending) => {
        if (attending) {
            await axios.post("http://localhost:3001/db/addAttendee", {
                userId: authorId,
                hangoutId: hangoutId
            }, { withCredentials: true })
                .then((resp) => {
                    setAttending(true)
                })
                .catch((err) => {
                    console.log(err.data)
                })
        }
        if (!attending) {
            await axios.post("http://localhost:3001/db/deleteAttendee", {
                userId: authorId,
                hangoutId: hangoutId
            }, { withCredentials: true })
                .then((resp) => {
                    setAttending(false)
                })
                .catch((err) => {
                    console.log(err.data)
                })
        }
    }
    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
                justify={{ base: "center", md: "space-around", xl: "space-between" }}
                direction={{ base: "column-reverse", md: "row" }}
                wrap="no-wrap"
                px={8}
                mb={16}>
                <Avatar
                    size={'xl'}
                    src={
                        `https://cdn.discordapp.com/avatars/${card.user_id}/${card.user_avatar}.png`
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {card.hangout_title}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    @{card.user_name}#{card.user_discriminator}
                </Text>
                <Text>
                    {card.hangout_description}
                </Text>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={"blue.700"}
                        fontWeight={'400'}
                        color={"white"}
                    >
                        Attendees: {attendees.length}
                    </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={"purple.700"}
                        fontWeight={'400'}
                        color={"white"}
                    >
                        {card.hangout_location}
                    </Badge>

                </Stack>
                <Stack m="2em">
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontSize={"1em"}
                        fontWeight={'200'}>
                        {new Date(card.hangout_date).toLocaleString()}
                    </Badge>
                    {attending && <Text fontSize={"3xl"} fontWeight={"black"} color={"green.400"}>Attending</Text>}
                </Stack>
                {profile.username == null && <Button onClick={() => {
                    window.location.href = "http://localhost:3001/auth/discord";
                }}
                    w={'full'}
                    maxW={'md'}
                    colorScheme={'facebook'}
                    leftIcon={<FaDiscord />}>
                    <Center>
                        <Text>Sign in with Discord to attend!</Text>
                    </Center>
                </Button>}
                {card.user_id != profile.id && profile.username != null && <Stack mt={8} direction={'row'} spacing={4}>
                    <Button onClick={() => {
                        handleClick(card.hangout_id, profile.id, true)
                        handleAttendee()
                    }}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'green.400'}
                        color={'white'}
                    >
                        Yes
                    </Button>
                    <Button onClick={() => {
                        handleClick(card.hangout_id, profile.id, false)
                        handleAttendee()

                    }}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}>
                        No
                    </Button>
                </Stack>}
                {card.user_id == profile.id && <Stack mt={8} direction={'row'} spacing={4}>
                    <Button onClick={() => {
                        deleteCard(card.hangout_id)
                    }}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        _focus={{
                            bg: 'red.200',
                        }}>
                        Cancel event
                    </Button>
                </Stack>}
            </Box>
        </Center>
    );
}
