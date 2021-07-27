import { Box, Button, Center, Flex, Grid, HStack, Spacer, Stack, Text, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Game from "../components/Game";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [data, setData] = useState()
  const { toggleColorMode } = useColorMode()

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
        <Box as="header" backgroundColor="teal">
          <Flex m="0 10px" height="100%" alignItems="center">
            <Text as="span" textColor="white">Header tbc</Text>
            <Spacer />
            <Button colorScheme="cyan" onClick={toggleColorMode}>Toggle Dark Mode</Button>
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
