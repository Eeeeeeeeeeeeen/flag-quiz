import { FunctionComponent, useReducer } from "react";
import { Country } from "../pages";
import useTextUtils from "./useTextUtils";

export interface GameState {
  answer: string;
  countryList: Country[];
  currentCountry: number;
  correct: Country[];
  skipped: Country[];
  gameState: GameStatus;
  score: number;
  gameLength: number;
  wrongAnswer: boolean;
}

type GameAction =
  | {
      type: GameActions.INIT_GAME;
      countries: Country[];
      gameLength: number;
    }
  | {
      type: GameActions.END_GAME;
    }
  | {
      type: GameActions.TYPE_ANSWER;
      payload: string;
    }
  | {
      type: GameActions.SUBMIT_ANSWER;
    }
  | {
      type: GameActions.SKIP_COUNTRY;
    }
  | {
      type: GameActions.RESTART_GAME;
    };

export enum GameStatus {
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export enum GameActions {
  SUBMIT_ANSWER,
  TYPE_ANSWER,
  SKIP_COUNTRY,
  INIT_GAME,
  END_GAME,
  RESTART_GAME,
}

function gameReducer(state: GameState, action: GameAction) {
  const [sanitiseText] = useTextUtils();

  function ContainsCountry(nameArray: string[], name: string): boolean {
    var isInArray = false;

    for (let index = 0; index < nameArray.length; index++) {
      if (sanitiseText(nameArray[index]).toLowerCase() == name) {
        isInArray = true;
        break;
      }
    }
    return isInArray;
  }

  switch (action.type) {
    case GameActions.INIT_GAME:
      let countries = action.countries;
      countries = countries.concat(state.skipped);
      for (var i = 0; i < state.skipped.length; i++) {
        countries.pop();
      }
      shuffle(countries);

      return {
        ...state,
        gameState: GameStatus.STARTED,
        countryList: countries,
        correct: [],
        skipped: [],
        score: 0,
        answer: "",
        gameLength: action.gameLength
          ? action.gameLength
          : action.countries.length,
        wrongAnswer: false,
      };
    case GameActions.END_GAME:
      return {
        ...state,
        gameState: GameStatus.FINISHED,
      };
    case GameActions.TYPE_ANSWER:
      return { ...state, answer: action.payload };
    case GameActions.SUBMIT_ANSWER: {
      let newScore = state.score;
      let country = sanitiseText(state.answer.toLowerCase());

      if (
        country ===
          sanitiseText(state.countryList[0].name.common.toLowerCase()) ||
        country ===
          sanitiseText(state.countryList[0].name.official.toLowerCase()) ||
        ContainsCountry(state.countryList[0].altSpellings, country)
      ) {
        newScore += 1;

        const newArray = [...state.countryList];
        const c = newArray.splice(0, 1);
        const correct = state.correct.concat(c);

        return {
          ...state,
          answer: "",
          score: newScore,
          countryList: newArray,
          wrongAnswer: false,
          correct: correct,
        };
      } else {
        return {
          ...state,
          wrongAnswer: true,
        };
      }
    }
    case GameActions.RESTART_GAME: {
      return { ...state, gameState: GameStatus.NOT_STARTED };
    }
    case GameActions.SKIP_COUNTRY: {
      const newArray = [...state.countryList];
      const c = newArray.splice(0, 1);

      const newSkipped = [...state.skipped.concat(c)];

      return {
        ...state,
        countryList: newArray,
        skipped: newSkipped,
        answer: "",
        wrongAnswer: false,
      };
    }
    default:
      return state;
  }
}

export default function useGameReducer() {
  let initialState: GameState = {
    answer: "",
    countryList: [],
    currentCountry: 0,
    correct: [],
    skipped: [],
    gameState: GameStatus.NOT_STARTED,
    score: 0,
    gameLength: 0,
    wrongAnswer: false,
  };

  let [state, dispatch] = useReducer(gameReducer, initialState);

  return [state, dispatch] as const;
}

function shuffle(a: Country[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
