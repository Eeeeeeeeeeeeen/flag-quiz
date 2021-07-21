import { useReducer } from "react";

export default function useGameReducer() {
  let initialState = {
    answer: "",
    countryList: [],
    currentCountry: {},
    correct: [],
    score: 0,
  };

  let [state, dispatch] = useReducer((state, action) => {
    console.log(action.type);
    switch (action.type) {
      case "SUBMIT_ANSWER": {
        let newScore = state.score;

        if (
          action.country.toLowerCase() ===
            state.currentCountry.name.toLowerCase() ||
          state.currentCountry.altSpellings.findIndex(
            (c) => c.toLowerCase() === action.country.toLowerCase()
          ) !== -1
        ) {
          newScore += 1;

          const index = state.countryList.findIndex(
            (country) => country.name.toLowerCase() === action.country
          );
          const newArray = state.countryList;
          newArray.splice(index, 1);

          const newCurrent =
            newArray[Math.floor(Math.random() * newArray.length)];

          return {
            answer: "",
            score: newScore,
            countryList: newArray,
            currentCountry: newCurrent,
          };
        } else {
          return {
            ...state,
          };
        }
      }
      case "TYPE_ANSWER": {
        return { ...state, answer: action.answer };
      }
      case "SKIP_COUNTRY": {
        const index = state.countryList.findIndex(
          (country) => country.name.toLowerCase() === action.country
        );
        const newArray = state.countryList;
        newArray.splice(index, 1);

        const newCurrent =
          newArray[Math.floor(Math.random() * newArray.length)];

        return {
          ...state,
          currentCountry: newCurrent,
        };
      }
      case "INIT_GAME": {
        let countries = action.countries;
        return {
          ...state,
          countryList: countries,
          currentCountry:
            countries[Math.floor(Math.random() * countries.length)],
        };
      }
    }
  }, initialState);

  return [state, dispatch];
}
