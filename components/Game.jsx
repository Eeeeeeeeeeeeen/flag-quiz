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
    if(firstLoad)
      setFirstLoad(false);
  }, [score, JSON.stringify(countryList)]);

  return (
    <>
      {gameState === "NOT_STARTED" && (
        <>
          <h1 className="title">Welcome to my exciting flag quiz!</h1>

          <button
            onClick={() => dispatch({ type: "INIT_GAME", countries: data })}
          >
            START
          </button>
        </>
      )}

      {gameState === "STARTED" && countryList.length > 0 && (
        <>
          <h1 className="title">Welcome to my exciting flag quiz!</h1>
          <h2>Score: {score}</h2>
          <img style={{ maxWidth: "400px" }} src={countryList[0].flag} />

          <input
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

          <button onClick={() => dispatch({ type: "SKIP_COUNTRY" })}>
            Skip
          </button>
          <button onClick={() => dispatch({ type: "END_GAME" })}>
            Give Up!
          </button>
        </>
      )}

      {gameState === "FINISHED" && (
        <>
          <h1 className="title">Thanks for playing my exciting flag quiz!</h1>
          <h2>You scored {score}!</h2>
          <button onClick={() => dispatch({ type: "RESTART" })}>
            RETURN TO MAIN MENU
          </button>
        </>
      )}

      <style jsx>{`
        input {
          margin-top: 30px;
          text-align: center;
          font-size: 1.5rem;
        }

        img {
          maxwidth: 400px;
          border: 3px solid #000;
          border-radius: 10px;
        }

        button {
          margin-top: 10px;
          padding: 1.25rem 2.5rem;
          font-size: 1.5rem;
          border: 4px solid #494949;
          color: #494949;
          background: white;
          text-transform: uppercase;
        }

        button:hover {
          color: #ffffff;
          background: #f6b93b;
          border-color: #f6b93b;
          transition: all 0.2s ease 0s;
        }
      `}</style>
    </>
  );
}
