import { useState, Dispatch, SetStateAction } from "react";
import { Button, Container, Stack, Paper, Title, Space } from "@mantine/core";
import GameInfoDisplay from "./GameInfoDisplay";
import SudokuTable from "./SudokuTable";
import NumberSelector from "./NumberSelector";
import "@fontsource-variable/space-grotesk";
import { heading } from "../styles.css.ts";

type GameContainerProps = {
  setNewGameModalState: Dispatch<SetStateAction<boolean>>;
  setFinishGameModalState: Dispatch<SetStateAction<boolean>>;
}

const GameContainer = ({ setNewGameModalState, setFinishGameModalState }: GameContainerProps) => {
  const [notesEnabled, setNotesEnabled] = useState<boolean>(false);

  return (
    <main>
      <Container size="23rem">
          <Stack>
            <Paper shadow="xs" radius="md" p="sm">
              <Title className={heading}>Sudoku</Title>
            </Paper>
            <Paper shadow="xs" radius="md" p="sm">
              <GameInfoDisplay setModalState={setNewGameModalState} />
            </Paper>
            <Paper shadow="xs" radius="md" p="sm">
              <SudokuTable notesEnabled={notesEnabled} setModalState={setFinishGameModalState} />
            </Paper>
            <Paper shadow="xs" radius="md" p="sm">
              <NumberSelector notesEnabled={notesEnabled} />
              <Space h="md" />
              <Button className="toggleNotesButton" variant="light" compact onClick={() => setNotesEnabled(!notesEnabled)}>Toggle Notes</Button>
            </Paper>
          </Stack>
        </Container>
    </main>
  );
}

export default GameContainer;