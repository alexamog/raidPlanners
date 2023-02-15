import { VStack, Text, Box } from "@chakra-ui/react";
import DiscordButton from "./socialButtons/DiscordButton";

export default function Footer() {
    return (
        <Box
            clear="both"
            position={"relative"}
            height="200px">
            <VStack position="absolute" left="0" right="0" bottom="0">
                <Text>Made with love ❤️ </Text>
            </VStack>
        </Box>
    );
}