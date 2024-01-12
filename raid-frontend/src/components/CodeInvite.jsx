import { Button, Heading, Input } from "@chakra-ui/react";
import { HStack, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react';

import axios from "axios";
export default function CodeInvite() {
    const [inviteCode, setInviteCode] = useState("hiii");
    const codeRef = useRef()

    const postCode = async (e) => {
        e.preventDefault();
        console.log(inviteCode);
        await axios.post("http://localhost:3001/code/invite", inviteCode , { withCredentials: true })
            .then((resp) => {
                console.log(resp.data);
            })
            .catch((err) => {
                console.log(err.data);
            })
    }
    return (
        <div>
            <form onSubmit={(e) => {
                postCode(e);
            }}>
                <VStack margin={"2em"}>
                    <Heading>Enter code</Heading>
                    <Input size={"lg"} width={"lg"} placeholder='Enter code of workspace'
                        onChange={(e) => {
                            setInviteCode({inviteCode: e.target.value })
                        }}
                    />
                </VStack>
                <VStack>
                    <HStack>
                        <Button flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'green.400'}
                            color={'white'}
                            type="submit"
                        >Submit</Button>
                        <Button
                            flex={1}
                            fontSize={'sm'}
                            rounded={'full'}
                            bg={'red.400'}
                            color={'white'}>Clear</Button>
                    </HStack>
                </VStack>
            </form>

        </div >
    )
}