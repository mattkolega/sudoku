import { useEffect, Dispatch, SetStateAction } from "react";
import { shallow } from "zustand/shallow";
import { Modal, Button, Text, Title, Space, Container, Code } from "@mantine/core";
import useSudokuStore from "../sudokuStore";
import { convertGameClockToString } from "../utils";

type FinishGameModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  clockIsRunning: boolean;
  setClockIsRunning: Dispatch<SetStateAction<boolean>>;
}

const FinishGameModal = ({ isOpen, setIsOpen, clockIsRunning, setClockIsRunning }: FinishGameModalProps) => {
  const { gameClock } = useSudokuStore(state => ({
    gameClock: state.gameClock
  }), shallow);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen && clockIsRunning) setClockIsRunning(false);
  }, [isOpen, clockIsRunning, setClockIsRunning]);

  return (
    <Modal opened={isOpen} onClose={handleClose} centered padding="xl">
      <Container size="90%">
        <Title order={1} size="h2">&#127881; Nice Job! &#127881;</Title>
        <Space h="md" />
        <Text align="left">You have solved the puzzle with a time of {convertGameClockToString(gameClock)}. After closing this popup, you can click on the <Code>New Game</Code> button to generate a new puzzle.</Text>
        <Space h="xl" />
        <Button onClick={handleClose}>Close</Button>
      </Container>
    </Modal>
  );
}

export default FinishGameModal;