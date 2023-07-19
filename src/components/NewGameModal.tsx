import { useEffect, Dispatch, SetStateAction, useState } from "react";
import { shallow } from "zustand/shallow";
import { Modal, Select, Button, Text, Title, Space, Container } from "@mantine/core";
import { getSudoku } from "sudoku-gen";
import { Difficulty } from "sudoku-gen/dist/types/difficulty.type";
import useSudokuStore from "../sudokuStore";

type NewGameModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  clockIsRunning: boolean;
  setClockIsRunning: Dispatch<SetStateAction<boolean>>;
}

const DifficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "expert", label: "Expert" }
]

const NewGameModal = ({ isOpen, setIsOpen, clockIsRunning, setClockIsRunning }: NewGameModalProps) => {
  const { createGame } = useSudokuStore(state => ({
    createGame: state.createGame
  }), shallow);

  const [difficulty, setDifficulty] = useState<string>("");
  const [wasClockRunning, setWasClockRunning] = useState<boolean>(false);

  const handleClick = () => {
    if (difficulty === "") return;
    const { puzzle, solution } = getSudoku(difficulty as Difficulty);
    createGame(puzzle, solution, difficulty);
    setDifficulty("");
    setClockIsRunning(true);
    setIsOpen(false);
  }

  const handleClose = () => {
    setIsOpen(false);
    setDifficulty("");
    if (wasClockRunning) {
      setClockIsRunning(true);
      setWasClockRunning(false);
    }
  }

  useEffect(() => {
    if (isOpen && clockIsRunning) {
      setClockIsRunning(false);
      setWasClockRunning(true);
    }
  }, [isOpen, clockIsRunning, setClockIsRunning]);

  return (
    <Modal opened={isOpen} onClose={handleClose} centered padding="xl">
      <Container size="90%">
        <Title order={1} size="h2">New Game</Title>
        <Space h="md" />
        <Text align="left">Please Select A Difficulty:</Text>
        <Space h="sm" />
        <Select
          data-autofocus
          placeholder="Select..."
          data={DifficultyOptions}
          onChange={(value) => setDifficulty(value || "")}
          dropdownPosition="bottom"
          withinPortal={true}
        />
        <Space h="xl" />
        <Button onClick={handleClick}>Create Game</Button>
      </Container>
    </Modal>
  );
}

export default NewGameModal;