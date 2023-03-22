import { Card, CardBody, CardFooter, useColorModeValue, Stack, Heading, Divider, ButtonGroup, Button, Text, HStack, VStack } from '@chakra-ui/react'
import { useState, useRef } from 'react';
import { useStore } from "../store";
import Landing from "../components/landingPage/Landing"
import { useNavigate } from "@tanstack/react-location";
import axios from 'axios';


export default function CreatePlan() {
    const navigate = useNavigate();
    const profile = useStore((state) => state.profile);
    const cardRef = useRef();
    const [cardInfo, setCardInfo] = useState({
        authorId: profile.id,
        title: null,
        desc: null,
        datetime: null,
        location: null,
    });

    const handleClick = async (e) => {
        e.preventDefault();
        await axios.post("http://44.225.181.153/db/addcard", cardInfo, {withCredentials: true})
            .then((resp) => {
                navigate({ to: "/hangouts", replace: true })
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (profile.username == null) {
        return <Landing />
    }

    return (
        <div>
            <VStack>
                <HStack>
                    <Card maxW='sm' m="1em" align="center"
                        justify={{ base: "center", md: "space-around", xl: "space-between" }}
                        direction={{ base: "column-reverse", md: "row" }}
                        mb={16}
                    >
                        <form ref={cardRef} onSubmit={(e) => {
                            handleClick(e);
                        }}>
                            <CardBody textAlign={"center"} bg={useColorModeValue('white', 'gray.900')} >
                                <Stack mt='6' spacing='3'>
                                    <Heading>Create an event</Heading>
                                    <Text size='md'>Title:  <br /> <input required onChange={(e) => setCardInfo({ ...cardInfo, title: e.target.value })} minLength={"5"} maxLength={"25"} placeholder='Enter a title' /></Text>
                                    <Text>
                                        Description: <br />  <input required onChange={(e) => setCardInfo({ ...cardInfo, desc: e.target.value })} minLength={"5"} maxLength={"33"} placeholder='Enter a short description' />
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
                                        Location: <br /> <input required onChange={(e) => setCardInfo({ ...cardInfo, location: e.target.value })} minLength={"5"} maxLength={"25"} placeholder='Enter a location' />
                                    </Text>
                                </Stack>
                            </CardBody>
                            <Divider />
                            <CardFooter bg={useColorModeValue('white', 'gray.900')} >
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
