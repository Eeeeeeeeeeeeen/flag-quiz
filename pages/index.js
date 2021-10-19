import { Center, Flex, Grid, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Game from "../components/Game";
import Header from "../components/Header";

export default function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((res) =>
        setData(res.filter((country) => country.independent === true))
      );
  }, []);
  console.log(data);

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
              <Game data={data} />
            </Stack>
          </Center>
        </Flex>
      </Grid>
    </>
  );
}
