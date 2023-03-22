import { useNavigate } from "@tanstack/react-location";
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useStore } from "../store";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Navbar() {
    const setProfile = useStore((store) => store.setProfile);
    const profile = useStore((state) => state.profile);
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        axios.get("http://44.225.181.153/auth/user", { withCredentials: true })
            .then((resp) => {
                if (resp.data != "Not logged in") {
                    setProfile(resp.data)
                    setAuth(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Avatar onClick={() => navigate({ to: "/", replace: true })}
                            size={'md'}
                            src={'https://cdn.discordapp.com/icons/100319471859666944/fa5992cd4155c293f1dc7b8fb8e0fde9.webp?size=96'}
                        />
                    </Box>
                    <Box><Heading onClick={() => navigate({ to: "/", replace: true })}>Raid Planner</Heading></Box>
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            {auth && <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={`https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{profile.username}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={() => navigate({ to: "/hangouts", replace: true })}>Hangouts</MenuItem>
                                    <MenuItem onClick={() => navigate({ to: "/create", replace: true })}>Create Hangout</MenuItem>
                                    <MenuItem onClick={() => {
                                        axios.get("http://44.225.181.153/auth/logout", { withCredentials: true })
                                        navigate({ to: "/", replace: true })
                                        window.location.reload();
                                    }}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                            }
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
