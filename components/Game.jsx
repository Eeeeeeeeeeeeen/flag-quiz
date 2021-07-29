import { Button, Center, Flex, Heading, Spacer, Text, Image, Input, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGameReducer from "../hooks/useGameReducer";
import SkippedCountries from "./SkippedCountries";

export default function Game({ data }) {
  const [state, dispatch] = useGameReducer();
  const [firstLoad, setFirstLoad] = useState(true);

  const { gameState, answer, score, countryList, correct, skipped, gameLength, wrongAnswer } = state;

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

    return <Text fontSize="lg" fontWeight="bold">{current} / {gameLength}</Text>
  }

  return (
    <>
      {gameState === "NOT_STARTED" && (
        <>
          <Heading as="h1" size="4xl" textTransform="uppercase" fontWeight="extrabold">
            Eeyan's <Text as="span" textColor="teal">Flag Quiz</Text>
          </Heading>
          <Heading as="h2" size="md">There are 196 flags in this quiz, this might take a while!</Heading>
          <Center>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => dispatch({ type: "INIT_GAME", countries: data })}
            >
              START
            </Button>
          </Center>
          <Heading as="h2" size="md">Not got time for that? Reduce the flags to</Heading>
          <HStack spacing="5px" justifyContent="center">
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => dispatch({ type: "INIT_GAME", countries: data, gameLength: 25 })}
            >
              25
            </Button>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => dispatch({ type: "INIT_GAME", countries: data, gameLength: 50 })}
            >
              50
            </Button>
            <Button
              colorScheme="teal"
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
          <HStack spacing="10px">
            <Input
              textAlign="center"
              size="lg"
              fontWeight="bold"
              value={answer}
              isInvalid={wrongAnswer}
              errorBorderColor="red.500"
              focusBorderColor={wrongAnswer ? 'red.500' : 'teal.500'}
              onChange={(e) =>
                dispatch({ type: "TYPE_ANSWER", answer: e.target.value })
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  dispatch({ type: "SUBMIT_ANSWER", country: e.target.value });
                }
              }}
            />
            <Button size="lg" colorScheme="teal" onClick={(e) => dispatch({ type: "SUBMIT_ANSWER", country: answer })}>
              Submit
            </Button>
            <Button size="lg" colorScheme="teal" onClick={() =>
              dispatch({ type: "SKIP_COUNTRY" })
            }>
              Skip
            </Button>
          </HStack>

          <HStack spacing="15px" justifyContent="center" fontSize="xl">
            <Button colorScheme="red" onClick={() => dispatch({ type: "END_GAME" })} variant="ghost">
              Give Up!
            </Button>
          </HStack>
        </>
      )}
      {
        gameState === "FINISHED" && (
          <>
            <Heading as="h1" size="2xl">Thanks for playing!</Heading>
            <Heading as="h2" size="xl">You scored {score}!</Heading>
            <Button size="lg" colorScheme="teal" onClick={() => dispatch({ type: "RESTART" })}>
              Try again?
            </Button>
            <SkippedCountries countries={skipped} />
          </>
        )
      }
    </>
  );
}
