import { Button, Center, Flex, Heading, Spacer, Text, Image, Input, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGameReducer from "../hooks/useGameReducer";

export default function Game({ data }) {
  const [state, dispatch] = useGameReducer();
  const [firstLoad, setFirstLoad] = useState(true);

  const { gameState, answer, score, countryList, correct, skipped } = state;

  //TODO: Fix this, it's not very efficient
  useEffect(() => {
    if (countryList.length === 0 && !firstLoad) {
      dispatch({ type: "END_GAME" });
    }
    if (firstLoad)
      setFirstLoad(false);
  }, [score, JSON.stringify(countryList)]);

  function getProgress() {
    const current = correct.length + skipped.length + 1;

    return <Text fontSize="lg" fontWeight="bold">You're on {current} / {data.length}</Text>
  }

  return (
    <>
      {gameState === "NOT_STARTED" && (
        <>
          <Heading as="h1" size="2xl">Eeyan's Flag Quiz!</Heading>
          <Heading as="h2" size="md">There are 196 flags in this quiz, this might take a while!</Heading>
          <Center>
            <Button
              colorScheme="pink"
              size="lg"
              onClick={() => dispatch({ type: "INIT_GAME", countries: data })}
            >
              START
            </Button>
          </Center>

        </>
      )}

      {gameState === "STARTED" && countryList.length > 0 && (
        <>
          <Flex>
            {getProgress()}
            <Spacer />
            <Text fontSize="lg" fontWeight="bold">Score: {score}</Text>
          </Flex>

          <Image border="black solid 5px" borderRadius="xl" src={countryList[0].flag} w="500px" />

          <Center>
            <Input
              textAlign="center"
              fontWeight="bold"
              width="200px"
              value={answer}
              onChange={(e) =>
                dispatch({ type: "TYPE_ANSWER", answer: e.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  dispatch({ type: "SUBMIT_ANSWER", country: e.target.value });
                }
              }}
            />
          </Center>

          <HStack spacing="15px" justifyContent="center" fontSize="xl">
            <Button size="lg" colorScheme="pink" onClick={() => dispatch({ type: "SKIP_COUNTRY" })}>
              Skip
            </Button>
            <Button colorScheme="red" onClick={() => dispatch({ type: "END_GAME" })} variant="ghost">
              Give Up!
            </Button>
          </HStack>
        </>
      )
      }

      {
        gameState === "FINISHED" && (
          <>
            <Heading as="h1" size="2xl">Thanks for playing!</Heading>
            <Heading as="h2" size="xl">You scored {score}!</Heading>
            <Button size="lg" colorScheme="pink" onClick={() => dispatch({ type: "RESTART" })}>
              Try again?
            </Button>
          </>
        )
      }
    </>
  );
}
