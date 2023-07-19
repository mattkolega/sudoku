import { Dispatch, SetStateAction } from "react";
import { Button, Text } from "@mantine/core";
import { shallow } from "zustand/shallow";
import useSudokuStore from "../sudokuStore";
import { convertGameClockToString } from "../utils.ts";
import { gameInfoDisplay } from "../styles.css.ts";

type GameInfoDisplayProp = {
  setModalState: Dispatch<SetStateAction<boolean>>;
}

const GameInfoDisplay = ({ setModalState }: GameInfoDisplayProp ) => {
  const { difficulty, gameClock } = useSudokuStore(state => ({
    difficulty: state.difficulty,
    gameClock: state.gameClock
  }), shallow);

  return (
    <div className={gameInfoDisplay}>
      <Text>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Text>
      <Button variant="light" color="#228be6" compact onClick={() => setModalState(true)}>New Game</Button>
      <Text>
        {convertGameClockToString(gameClock)}
      </Text>
    </div>
  );
}

export default GameInfoDisplay;