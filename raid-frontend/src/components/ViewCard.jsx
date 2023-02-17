import { useStore } from '../store';
import { useDB } from "./mockupDB";
import { useState } from 'react';
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

import { useMatch } from '@tanstack/react-location';

export default function ViewCard() {
    const {
        data: { card },
    } = useMatch()
    const profile = useStore((state) => state.profile);
    const updateCard = useDB((store) => store.updateCard);
    const cancelEvent = useDB((store) => store.deleteCard);
    const [attending, setAttending] = useState(card.attending.includes(profile.id));
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
                        `https://cdn.discordapp.com/avatars/${card.authorId}/${card.avatar}.png`
                    }
                    alt={'Avatar Alt'}
                    mb={4}
                    pos={'relative'}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {card.title}
                </Heading>
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    @{card.author}#{card.authorDiscriminator}
                </Text>
                <Text>
                    {card.description}
                </Text>

                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                        px={2}
                        py={1}
                        bg={"blue.700"}
                        fontWeight={'400'}
                    >
                        Attendees: {card.attending.length}
                    </Badge>
                    <Badge
                        px={2}
                        py={1}
                        bg={"purple.700"}
                        fontWeight={'400'}>
                        {card.location}
                    </Badge>

                </Stack>
                <Stack m="2em">
                    <Badge
                        px={2}
                        py={1}
                        bg={useColorModeValue('gray.50', 'gray.800')}
                        fontSize={"1em"}
                        fontWeight={'200'}>
                        {new Date(card.datetime).toLocaleString()}
                    </Badge>
                    {attending && <Text fontSize={"3xl"} fontWeight={"black"} color={"green.400"}>Attending</Text>}
                </Stack>

                {card.authorId != profile.id && <Stack mt={8} direction={'row'} spacing={4}>
                    <Button onClick={() => {
                        updateCard(id, profile.id, true)
                        setAttending(true)
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
                        updateCard(id, profile.id, false)
                        setAttending(false)

                    }}
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}>
                        No
                    </Button>
                </Stack>}
                {card.authorId == profile.id && <Stack mt={8} direction={'row'} spacing={4}>
                    <Button onClick={() => {
                        console.log(id)
                        cancelEvent(id)
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
