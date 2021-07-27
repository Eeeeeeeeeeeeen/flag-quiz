import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Grid, Spacer, Stack, Text, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function Home() {
  const [data, setData] = useState()
  const { toggleColorMode, colorMode } = useColorMode()

  useEffect(() => {
    fetch("Countries.json")
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])

  return (
    <>
      <Head>
        <title>Eeyan's Flag Quiz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid h="100vh" templateRows="4rem 1fr">
        <Box as="header">
          <Flex m="0 10px" height="100%" alignItems="center">
            <Text as="a" href="/" fontSize="xl" fontWeight="bold">Flag Quiz</Text>
            <Spacer />
            {/* <HStack spacing="5px">
              <Button as="a" colorScheme="teal" href="https://github.com/eeeeeeeeeeeeen/flag-quiz" target="_blank" rel="noopener noreferrer">
                <GithubIcon boxSize="8" colorMode={colorMode} />
              </Button>
              <Button as="a" colorScheme="teal" href="https://twitter.com/eeyan_t" target="_blank" rel="noopener noreferrer">
                <TwitterIcon boxSize="8" colorMode={colorMode} />
              </Button>
            </HStack> */}
            <Button colorScheme="teal" onClick={toggleColorMode} ml="40px" size="lg">
              {colorMode !== 'dark' ? <MoonIcon boxSize="8" /> : <SunIcon boxSize="8" />}
            </Button>

          </Flex>
        </Box>

        <Flex as="main" flexDirection="column" justifyContent="center">
          <Center verticalAlign="center">
            <Stack spacing="6" maxWidth="1024px" textAlign="center" m="0 10px">
              <Game data={data} />
            </Stack>
          </Center>
        </Flex>
      </Grid>
    </>
  );
}
