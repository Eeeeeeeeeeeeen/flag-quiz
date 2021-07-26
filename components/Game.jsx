import { Button, Center, Flex, Heading, Spacer, Text, Image, Input, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGameReducer from "../hooks/useGameReducer";

export default function Game({ data }) {
  const [state, dispatch] = useGameReducer();
  const [firstLoad, setFirstLoad] = useState(true);

  const { gameState, answer, score, countryList, correct, skipped, gameLength } = state;

  //TODO: Fix this, it's not very efficient
  useEffect(() => {
    if (correct.length + skipped.length === gameLength && !firstLoad) {
      dispatch({ type: "END_GAME" });
    }
    if (firstLoad)
      setFirstLoad(false);
  }, [score, JSON.stringify(countryList)]);

  function getProgress() {
    const current = correct.length + skipped.length + 1;

    return <Text fontSize="lg" fontWeight="bold">You're on {current} / {gameLength}</Text>
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
          <Heading as="h2" size="md">Not got time for that? Try a shorter game</Heading>
          <HStack spacing="5px" justifyContent="center">
            <Button
              colorScheme="orange"
              size="lg"
              onClick={() => dispatch({ type: "INIT_GAME", countries: data, gameLength: 25 })}
            >
              25
            </Button>
            <Button
              colorScheme="orange"
              size="lg"
              onClick={() => dispatch({ type: "INIT_GAME", countries: data, gameLength: 50 })}
            >
              50
            </Button>
            <Button
              colorScheme="orange"
              size="lg"
              onClick={() => dispatch({ type: "INIT_GAME", countries: data, gameLength: 100 })}
            >
              100
            </Button>
          </HStack>

        </>
      )}

      {gameState === "STARTED" && countryList.length > 0 && (
        <>
          <Flex>
            {getProgress()}
            <Spacer />
            <Text fontSize="lg" fontWeight="bold">Score: {score}</Text>
          </Flex>

          <Image border="black solid 5px" borderRadius="xl" src={countryList[0].flag} maxW="500px" maxH="500px" />
          {/* <img style={{ maxWidth: "500px", border: "black solid 5px", maxHeight: "500px" }} src={countryList[0].flag} /> */}
          <Center>
            <Input
              textAlign="center"
              size="lg"
              fontWeight="bold"
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
            <Button size="lg" colorScheme="pink" onClick={() =>
              dispatch({ type: "SKIP_COUNTRY" })
            }>
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
