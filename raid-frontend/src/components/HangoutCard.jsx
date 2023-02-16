import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Image, Divider, ButtonGroup, Button, Text, HStack } from '@chakra-ui/react'

export default function HangoutCard({ author, title, description, datetime, location }) {
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
                    <Text color='blue.600' fontSize='2xl'>
                        Author: {author}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='green'>
                        Yes
                    </Button>
                    <Button variant='solid' colorScheme='red'>
                        No
                    </Button>
                    <Button variant='solid' colorScheme='yellow'>
                        Maybe
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card >
    )
}