import { Center, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Game from "../components/Game";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [data, setData] = useState()

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

      <main>
        <Center h="100vh">
          <Stack spacing="6" maxWidth="1024px" textAlign="center">
            <Game data={data} />
          </Stack>
        </Center>
      </main>
    </>
  );
}
