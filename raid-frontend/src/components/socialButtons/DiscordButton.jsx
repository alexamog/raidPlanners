import { FaDiscord } from 'react-icons/fa';
import { Button, Center, Text } from '@chakra-ui/react';

export default function DiscordButton() {
  return (
    <Center p={8}>
      <Button
        w={'full'}
        maxW={'md'}
        colorScheme={'facebook'}
        leftIcon={<FaDiscord />}>
        <Center>
          <Text>Continue with Discord</Text>
        </Center>
      </Button>
    </Center>
  );
}
