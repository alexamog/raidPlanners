import { Card, CardHeader, CardBody, CardFooter, useColorModeValue, Stack, Heading, Image, Divider, ButtonGroup, Button, Text, HStack, VStack } from '@chakra-ui/react'
import { useState, useRef } from 'react';
import { useStore } from "../store";
import { useDB } from "./mockupDB";
import Landing from "../components/landingPage/Landing"
import { useNavigate } from "@tanstack/react-location";


export default function CreatePlan() {
    const navigate = useNavigate();
    const profile = useStore((state) => state.profile);
    const addCard = useDB((store) => store.addCard);
    const cardRef = useRef();
    const [cardInfo, setCardInfo] = useState({
        title: null,
        author: profile.username,
        authorId: profile.id,
        desc: null,
        datetime: null,
        location: null,
        attending: [profile.id]
    });
    const onSubmit = (e) => {
        e.preventDefault()
        addCard(cardInfo)
        navigate({ to: "/hangouts", replace: true })
    }
    if (profile.username == null) {
        return <Landing />
    }
    return (
        <div>
            <VStack>
                <HStack>
                    <Card maxW='sm' m="1em">
                        <form ref={cardRef} onSubmit={(e) => {
                            onSubmit(e);
                        }}>
                            <CardBody textAlign={"center"} bg={useColorModeValue('white', 'gray.900')}>
                                <Stack mt='6' spacing='3'>
                                    <Heading>Create an event</Heading>
                                    <Text size='md'>Title:  <br /> <input required onChange={(e) => setCardInfo({ ...cardInfo, title: e.target.value })} placeholder='Enter a title' /></Text>
                                    <Text>
                                        Description: <br />  <input required onChange={(e) => setCardInfo({ ...cardInfo, desc: e.target.value })} placeholder='Enter a short description' />
                                    </Text>
                                    <Text>
                                        Date and time: <br />
                                        <input required type="datetime-local" onChange={(e) => {
                                            setCardInfo({ ...cardInfo, datetime: e.target.value })
                                        }} onClick={(e) => {
                                            setCardInfo({ ...cardInfo, datetime: e.target.value })
                                        }} placeholder='Enter a date' />
                                    </Text>
                                    <Text>
                                        Location: <br /> <input required onChange={(e) => setCardInfo({ ...cardInfo, location: e.target.value })} placeholder='Enter a location' />
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter bg={useColorModeValue('white', 'gray.900')}>
                                <ButtonGroup spacing='2'>
                                    <Button type="submit" variant='solid' colorScheme='green'>
                                        Create card
                                    </Button>
                                    <Button onClick={() => {
                                        cardRef.current.reset()
                                        setCardInfo({
                                            title: "",
                                            author: profile.username,
                                            authorId: profile.id,
                                            desc: "",
                                            datetime: "",
                                            location: ""
                                        })
                                    }} variant='solid' colorScheme='yellow'>
                                        Reset
                                    </Button>
                                </ButtonGroup>

                            </CardFooter>
                        </form>
                    </Card>
                </HStack>
            </VStack>

        </div >
    )
}