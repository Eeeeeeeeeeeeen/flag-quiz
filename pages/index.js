import { Center, Flex, Grid, Stack, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Game from "../components/Game";
import Header from "../components/Header";

export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) => {
        setData(res.filter((country) => country.independent === true));
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Eeyan's Flag Quiz</title>
        <link rel="icon" href="/me.webp" />
      </Head>
      <Grid h="100vh" templateRows="4rem 1fr">
        <Header />
        <Flex as="main" flexDirection="column" justifyContent="center">
          <Center verticalAlign="center">
            <Stack spacing="6" maxWidth="1024px" textAlign="center" m="0 10px">
              {isLoading ? <Spinner /> : <Game data={data} />}
            </Stack>
          </Center>
        </Flex>
      </Grid>
    </>
  );
}
