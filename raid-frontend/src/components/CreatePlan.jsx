import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Image, Divider, ButtonGroup, Button, Text, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { useStore } from "../store";

export default function CreatePlan() {
    const profile = useStore((state) => state.profile);
    const [cardInfo, setCardInfo] = useState({
        title: "",
        author: "",
        desc: "",
        datetime: "",
        location: ""
    });
    return (
        <div>
            <VStack>
                <HStack>
                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src='https://cdn.discordapp.com/attachments/627599006536695852/957545935708233738/unknown.png'
                                alt='Hangout'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'><CardHeader>Title: <input onChange={(e) => setCardInfo({ ...cardInfo, title: e.target.value })} placeholder='Enter a title' /></CardHeader></Heading>
                                <Text>
                                    Desc:  <input onChange={(e) => setCardInfo({ ...cardInfo, desc: e.target.value })} placeholder='Enter a short description' />
                                </Text>
                                <Text>
                                    Date and time: <input type="datetime-local" onChange={(e) => {
                                        setCardInfo({ ...cardInfo, datetime: e.target.value })
                                    }} onClick={(e) => {
                                        setCardInfo({ ...cardInfo, datetime: e.target.value })
                                    }} placeholder='Enter a date' />
                                </Text>
                                <Text>
                                    Location: <input onChange={(e) => setCardInfo({ ...cardInfo, location: e.target.value })} placeholder='Enter a location' />
                                </Text>
                                <Text color='blue.600' fontSize='2xl'>
                                    Author: {profile.name}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>

                                <Button onClick={() => alert("Card created. Info sent to Database (function needs to be made)")} variant='solid' colorScheme='green'>
                                    Create card
                                </Button>
                                <Button onClick={() => setCardInfo({
                                    title: "",
                                    author: "",
                                    desc: "",
                                    datetime: "",
                                    location: ""
                                })} variant='solid' colorScheme='yellow'>
                                    Reset
                                </Button>

                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </HStack>
            </VStack>

        </div>
    )
}