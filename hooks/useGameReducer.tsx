import { useReducer } from "react";
import { Country } from "../pages";
import useTextUtils from "./useTextUtils";

interface GameState {
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

enum GameStatus {
  NOT_STARTED,
  STARTED,
  FINISHED
}

export default function useGameReducer() {
  const [sanitiseText] = useTextUtils()
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

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SUBMIT_ANSWER": {
        let newScore = state.score;
        let country = sanitiseText(action.country.toLowerCase())

        if (
          country ===
          sanitiseText(state.countryList[0].name.common.toLowerCase()) || country ===
          sanitiseText(state.countryList[0].name.official.toLowerCase())
        ) {
          newScore += 1;

          const newArray = [...state.countryList];
          const c = newArray.splice(0, 1);
          state.correct.push(c);

          return {
            ...state,
            answer: "",
            score: newScore,
            countryList: newArray,
            wrongAnswer: false,
          };
        } else {
          return {
            ...state,
            wrongAnswer: true,
          };
        }
      }
      case "TYPE_ANSWER": {
        return { ...state, answer: action.answer };
      }
      case "SKIP_COUNTRY": {
        const newArray = [...state.countryList];
        const c = newArray.splice(0, 1);

        const newSkipped = [...state.skipped];
        newSkipped.push(c);

        return {
          ...state,
          countryList: newArray,
          skipped: newSkipped,
          answer: "",
          wrongAnswer: false,
        };
      }
      case "INIT_GAME": {
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
      }
      case "END_GAME": {
        return {
          ...state,
          gameState: GameStatus.FINISHED,
        };
      }
      case "RESTART": {
        return {
          ...state,
          gameState: GameStatus.NOT_STARTED,
        };
      }
    }
  }, initialState);

  return [state, dispatch];
}

function shuffle(a: Country[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
