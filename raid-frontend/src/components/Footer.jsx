import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box mt="1em"
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={10}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ md: 'space-between' }}
                align={{md: 'center' }}>
                <Text>Raid Planner 2023 | Made with ❤️</Text>
            </Container>
        </Box>
    );
}
