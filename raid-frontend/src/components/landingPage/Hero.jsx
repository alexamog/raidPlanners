import React from "react";
import { useNavigate } from "@tanstack/react-location";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Center,
    Flex,
    Image,
    Heading,
    Stack,
    Text
} from "@chakra-ui/react";
import { useStore } from "../../store";
import { FaDiscord } from 'react-icons/fa';


export default function Hero({ title, subtitle, image, ctaLink, ctaText, ...rest }) {
    const navigate = useNavigate();
    const profile = useStore((state) => state.profile);
    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}
            {...rest}
        >
            <Stack
                spacing={4}
                w={{ base: "80%", md: "40%" }}
                align={["center", "center", "flex-start", "flex-start"]}
            >
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    color="primary.800"
                    textAlign={["center", "center", "left", "left"]}
                >
                    {title}
                </Heading>
                <Heading
                    as="h2"
                    size="md"
                    color="primary.800"
                    opacity="0.8"
                    fontWeight="normal"
                    lineHeight={1.5}
                    textAlign={["center", "center", "left", "left"]}
                >
                    {subtitle}
                </Heading>
                {profile.username == null && <Button onClick={() => {
                    window.location.href = "http://localhost:3001/auth/discord";
                }}
                    w={'full'}
                    maxW={'md'}
                    colorScheme={'facebook'}
                    leftIcon={<FaDiscord />}>
                    <Center>
                        <Text>Continue with Discord</Text>
                    </Center>
                </Button>}
                {profile.username != null && <Button                     w={'full'}
                    maxW={'md'} onClick={() => { navigate({ to: "/hangouts", replace: true }) }} variant='solid' colorScheme='green'>
                    Get started
                </Button>}



            </Stack>
            <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                {/* TODO: Make this change every X secs */}
                <Image src={image} size="100%" rounded="1rem" shadow="2xl" />
            </Box>
        </Flex>
    );
}

Hero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string
};

