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
import { FC, KeyboardEvent, useEffect, useState } from "react";
import useGameReducer, {
  GameActions,
  GameStatus,
} from "../hooks/useGameReducer";
import { Country } from "../pages";
import SkippedCountries from "./SkippedCountries";

interface GameProps {
  countries: Country[];
}

const Game: FC<GameProps> = ({ countries }) => {
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
      dispatch({ type: GameActions.END_GAME });
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
      {gameState === GameStatus.NOT_STARTED && (
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
            There are {countries.length} flags in this quiz, this might take a
            while!
          </Heading>
          <Center>
            <Button
              colorScheme={color}
              size="lg"
              onClick={() => {
                return dispatch({
                  type: GameActions.INIT_GAME,
                  countries: countries,
                  gameLength: countries.length,
                });
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
                dispatch({
                  type: GameActions.INIT_GAME,
                  countries: countries,
                  gameLength: 25,
                })
              }
            >
              25
            </Button>
            <Button
              colorScheme={color}
              size="lg"
              onClick={() =>
                dispatch({
                  type: GameActions.INIT_GAME,
                  countries: countries,
                  gameLength: 50,
                })
              }
            >
              50
            </Button>
            <Button
              colorScheme={color}
              size="lg"
              onClick={() =>
                dispatch({
                  type: GameActions.INIT_GAME,
                  countries: countries,
                  gameLength: 100,
                })
              }
            >
              100
            </Button>
          </HStack>
        </>
      )}
      {gameState === GameStatus.STARTED && countryList.length > 0 && (
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
                dispatch({
                  type: GameActions.TYPE_ANSWER,
                  payload: e.currentTarget.value,
                })
              }
              onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  dispatch({
                    type: GameActions.SUBMIT_ANSWER,
                  });
                }
              }}
            />
            <Button
              size="lg"
              colorScheme={color}
              onClick={(e) => dispatch({ type: GameActions.SUBMIT_ANSWER })}
            >
              Submit
            </Button>
            <Button
              size="lg"
              colorScheme={color}
              onClick={() => dispatch({ type: GameActions.SKIP_COUNTRY })}
            >
              Skip
            </Button>
          </HStack>

          <HStack spacing="15px" justifyContent="center" fontSize="xl">
            <Button
              colorScheme="red"
              onClick={() => dispatch({ type: GameActions.END_GAME })}
              variant="ghost"
            >
              Give Up!
            </Button>
          </HStack>
        </>
      )}
      {gameState === GameStatus.FINISHED && (
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
            onClick={() => dispatch({ type: GameActions.RESTART_GAME })}
          >
            Play again!
          </Button>
          <SkippedCountries countries={skipped} />
        </>
      )}
    </>
  );
};

export default Game;
