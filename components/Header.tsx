import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Spacer, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import GithubIcon from "./Icons/GithubIcon"

const Header = () => {
    const { toggleColorMode, colorMode } = useColorMode()
    const color = useColorModeValue("blue", "teal")

    return (
        <Box as="header">
            <Flex m="0 10px" height="100%" alignItems="center">
                <Text as="a" href="/" fontSize="xl" fontWeight="bold">Flag Quiz</Text>
                <Spacer />
                <HStack spacing="5px">
                    <Button as="a" size="lg" colorScheme={color} href="https://github.com/eeeeeeeeeeeeen/flag-quiz" target="_blank" rel="noopener noreferrer">
                        <GithubIcon boxSize="8" colorMode={colorMode} />
                    </Button>
                    <Button colorScheme={color} onClick={toggleColorMode} ml="40px" size="lg">
                        {colorMode !== 'dark' ? <MoonIcon boxSize="8" /> : <SunIcon boxSize="8" />}
                    </Button>
                </HStack>
            </Flex>
        </Box>
    )
}

export default Header;