import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Image, Divider, ButtonGroup, Button, Text, HStack } from '@chakra-ui/react'
import { useStore } from '../store';
import { useDB } from "./mockupDB";
import { useState } from 'react';
export default function HangoutCard({ id, author, title, description, datetime, location, attendees, authorId }) {
    const profile = useStore((state) => state.profile);
    const updateCard = useDB((store) => store.updateCard);
    const cancelEvent = useDB((store) => store.deleteCard);
    const [attending, setAttending] = useState(attendees.includes(profile.id));

    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src='https://cdn.discordapp.com/attachments/627599006536695852/957545935708233738/unknown.png'
                    alt='Hangout'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'><CardHeader>{title}</CardHeader></Heading>
                    <Text>
                        Desc: {description}
                    </Text>
                    <Text>
                        Date and time: {new Date(datetime).toLocaleString()}
                    </Text>
                    <Text>
                        Location: {location}
                    </Text>
                    <Text>
                        Attendees: {attendees.length}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        Author: {author}
                    </Text>
                    {attending && <Text color="green.100" fontSize="2xl" fontWeight="bold">

                        Attending</Text>}
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                {authorId != profile.id && <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='green' onClick={() => {
                        updateCard(id, profile.id, true)
                        setAttending(true)

                    }}>
                        Yes
                    </Button>
                    <Button variant='solid' colorScheme='red' onClick={() => {
                        updateCard(id, profile.id, false)
                        setAttending(false)
                    }}>
                        No
                    </Button>
                </ButtonGroup>}
                {authorId == profile.id && <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='red' onClick={() => {
                        cancelEvent(id)
                    }}>Cancel event</Button>
                </ButtonGroup>}

            </CardFooter>
        </Card >
    )
}