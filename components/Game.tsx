import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
  Image,
  Input,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from "react";
import useGameReducer, { GameActions } from "../hooks/useGameReducer";
import { Country } from "../pages";
import SkippedCountries from "./SkippedCountries";

export default function Game(countries: Country[]) {
  const [state, dispatch] = useGameReducer();
  const [firstLoad, setFirstLoad] = useState(true);

  const titleColor = useColorModeValue("blue.600", "teal.500");
  const color = useColorModeValue("blue", "teal");

  const {
    gameState,
    answer,
    score,
    countryList,
    correct,
    skipped,
    gameLength,
    wrongAnswer,
  } = state;

  //TODO: Fix this, it's not very efficient
  useEffect(() => {
    if (correct.length + skipped.length === gameLength && !firstLoad) {
      dispatch({ type: "END_GAME" });
    }
    if (firstLoad) setFirstLoad(false);
  }, [score, countryList]);

  function getProgress() {
    const current = correct.length + skipped.length + 1;

    return (
      <Text fontSize="lg" fontWeight="bold">
        {current} / {gameLength}
      </Text>
    );
  }

  return (
    <>
      {gameState === "NOT_STARTED" && (
        <>
          <Heading
            as="h1"
            size="4xl"
            textTransform="uppercase"
            fontWeight="extrabold"
          >
            Eeyan's{" "}
            <Text as="span" textColor={titleColor}>
              Flag Quiz
            </Text>
          </Heading>
          <Heading as="h2" size="md">
            There are 196 flags in this quiz, this might take a while!
          </Heading>
          <Center>
            <Button
              colorScheme={color}
              size="lg"
              onClick={() => {
                return dispatch({ type: GameActions.INIT_GAME, payload: { countries: countries } });
              }}
            >
              START
            </Button>
          </Center>
          <Heading as="h2" size="md">
            Not got time for that? Reduce the flags to
          </Heading>
          <HStack spacing="5px" justifyContent="center">
            <Button
              colorScheme={color}
              size="lg"
              onClick={() =>
                dispatch({ type: "INIT_GAME", countries: countries, gameLength: 25 })
              }
            >
              25
            </Button>
            <Button
              colorScheme={color}
              size="lg"
              onClick={() =>
                dispatch({ type: "INIT_GAME", countries: countries, gameLength: 50 })
              }
            >
              50
            </Button>
            <Button
              colorScheme={color}
              size="lg"
              onClick={() =>
                dispatch({
                  type: "INIT_GAME",
                  countries: countries,
                  gameLength: 100,
                })
              }
            >
              100
            </Button>
          </HStack>
        </>
      )
      }
      {
        gameState === "STARTED" && countryList.length > 0 && (
          <>
            <Flex>
              {getProgress()}
              <Spacer />
              <Text fontSize="lg" fontWeight="bold">
                Score: {score}
              </Text>
            </Flex>

            <Image
              border="black solid 5px"
              borderRadius="xl"
              src={countryList[0].flags.svg}
              maxW="500px"
              maxH="500px"
            />
            <HStack spacing="10px">
              <Input
                textAlign="center"
                size="lg"
                fontWeight="bold"
                value={answer}
                isInvalid={wrongAnswer}
                errorBorderColor="red.500"
                focusBorderColor={wrongAnswer ? "red.500" : "teal.500"}
                placeholder="Country"
                variant="filled"
                onChange={(e) =>
                  dispatch({ type: "TYPE_ANSWER", answer: e.currentTarget.value })
                }
                onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    dispatch({ type: "SUBMIT_ANSWER", country: e.currentTarget.value });
                  }
                }}
              />
              <Button
                size="lg"
                colorScheme={color}
                onClick={(e) =>
                  dispatch({ type: "SUBMIT_ANSWER", country: answer })
                }
              >
                Submit
              </Button>
              <Button
                size="lg"
                colorScheme={color}
                onClick={() => dispatch({ type: "SKIP_COUNTRY" })}
              >
                Skip
              </Button>
            </HStack>

            <HStack spacing="15px" justifyContent="center" fontSize="xl">
              <Button
                colorScheme="red"
                onClick={() => dispatch({ type: "END_GAME" })}
                variant="ghost"
              >
                Give Up!
              </Button>
            </HStack>
          </>
        )
      }
      {
        gameState === "FINISHED" && (
          <>
            <Heading as="h1" size="2xl">
              Thanks for playing!
            </Heading>
            <Heading as="h2" size="xl">
              You scored {score}!
            </Heading>
            <Button
              size="lg"
              colorScheme={color}
              onClick={() => dispatch({ type: "RESTART" })}
            >
              Play again!
            </Button>
            <SkippedCountries countries={skipped} />
          </>
        )
      }
    </>
  );
}
