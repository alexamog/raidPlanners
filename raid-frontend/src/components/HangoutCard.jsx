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
import axios from 'axios';

export default function HangoutCard({ id, author, title, description, datetime, location, authorId, avatar, authorDiscriminator }) {
    const profile = useStore((state) => state.profile);
    const [attending, setAttending] = useState(null);
    const [existing, setExisting] = useState(true);
    const [attendees, setAttendees] = useState([]);
    const fetchAttendees = async () => {
        const data = await axios.get(`http://localhost:3001/db/getAttendees/${id}`, { withCredentials: true })
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
                setExisting(false)
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
                    handleAttendee()
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
                    handleAttendee()
                })
                .catch((err) => {
                    console.log(err.data)
                })
        }
    }
    if (existing) {
        return (
            <Center py={6}>
                <Box
                    maxW={'320px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    p={6}
                    textAlign={'center'}>
                    <Avatar
                        size={'xl'}
                        src={
                            `https://cdn.discordapp.com/avatars/${authorId}/${avatar}.png`
                        }
                        alt={'Avatar Alt'}
                        mb={4}
                        pos={'relative'}
                    />
                    <Heading fontSize={'2xl'} fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text fontWeight={600} color={'gray.500'} mb={4}>
                        @{author}#{authorDiscriminator}
                    </Text>
                    <Text>
                        {description}
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
                            fontWeight={'400'}>
                            {location}
                        </Badge>

                    </Stack>
                    <Stack m="2em">
                        <Badge
                            px={2}
                            py={1}
                            bg={useColorModeValue('gray.50', 'gray.800')}
                            fontSize={"1em"}
                            fontWeight={'200'}
                            color={"white"}
                        >
                            {new Date(datetime).toLocaleString('en-us', { timeZone: "UTC" })}
                        </Badge>
                        {attending && <Text fontSize={"2xl"} fontWeight={"black"} color={"green.400"}>Attending</Text>}
                    </Stack>

                    {authorId != profile.id && <Stack mt={8} direction={'row'} spacing={4}>
                        <Button onClick={() => handleClick(id, profile.id, true)}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'green.400'}
                            color={'white'}
                        >
                            Yes
                        </Button>
                        <Button onClick={() => handleClick(id, profile.id, false)}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}>
                            No
                        </Button>
                        <Button onClick={() => {
                            navigator.clipboard.writeText(`http://localhost:5173/card/${id}`)
                            alert("Copied to clipboard!")
                        }}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                        >
                            Share
                        </Button>
                    </Stack>}
                    {authorId == profile.id && <Stack mt={8} direction={'row'} spacing={4}>
                        <Button onClick={() => {
                            deleteCard(id)
                        }
                        }
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            _focus={{
                                bg: 'red.200',
                            }}>
                            Cancel event
                        </Button>
                        <Button onClick={() => {
                            navigator.clipboard.writeText(`http://localhost:5173/card/${id}`)
                            alert("Copied to clipboard!")
                        }}
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                        >
                            Share
                        </Button>
                    </Stack>}
                </Box>
            </Center>
        );
    }
}
