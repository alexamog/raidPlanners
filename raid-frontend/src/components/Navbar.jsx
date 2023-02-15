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

export default function Navbar() {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
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

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Developer</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem onClick={() => navigate({ to: "/hangouts", replace: true })}>Hangouts</MenuItem>
                                    <MenuItem onClick={() => navigate({ to: "/create", replace: true })}>Create Hangout</MenuItem>
                                    <MenuItem onClick={(() => {
                                        alert("You don't get to log out yet hehe (functionality not implemented yet.)");
                                        navigate({ to: "/", replace: true })
                                    })
                                    }>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
