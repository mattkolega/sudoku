import { useEffect, Dispatch, SetStateAction } from "react";
import { shallow } from "zustand/shallow";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import SudokuCell from "./SudokuCell";
import useSudokuStore from "../sudokuStore";
import "@fontsource-variable/noto-sans-mono"
import { sudokuTable } from "../styles.css";

type SudokuTableProp = {
  notesEnabled: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
}

const SudokuTable = ({ notesEnabled, setModalState }: SudokuTableProp) => {
  const { puzzle, solution, notes, editableCells, selectedCell, setPuzzle, setNotes, setSelectedCell } = useSudokuStore(state => ({
    puzzle: state.puzzle,
    solution: state.solution,
    notes: state.notes,
    editableCells: state.editableCells,
    selectedCell: state.selectedCell,
    setPuzzle: state.setPuzzle,
    setNotes: state.setNotes,
    setSelectedCell: state.setSelectedCell
  }), shallow);

  const convertIntoChunks = (array: string[], chunkSize: number): string[][] => {
    const resultingArray = [];
    for (let i = 0; i < puzzle.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      resultingArray.push(chunk);
    }
    return resultingArray;
  };

  useEffect(() => {
    let isSolved = true;
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[i] !== solution[i]) {
        isSolved = false;
        break;
      }
    }
    if (isSolved) setModalState(true);
  }, [puzzle, solution, setModalState]);

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if ((event.target as HTMLElement).matches(".cellEditButton, .cellEditButton *, .toggleNotesButton, .toggleNotesButton *")) {
      return;
    }
    setSelectedCell(NaN);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    const numberRegex = new RegExp(/^[1-9]$/);
    if (numberRegex.test(event.key) || event.key === "Backspace" || event.key === "Delete") {
      handleCellInput(event.key);
    } else if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
      navigateTable(event.key);
    }
  }

  const handleCellInput = (key: string): void => {
    if (isNaN(selectedCell)) return;
    if (editableCells[selectedCell] === "n") return;
    if (notesEnabled) {
      let cellNotes = [...notes[selectedCell]]
      if (key === "Backspace" || key === "Delete") {
        cellNotes = Array(9).fill(["-"]);
      } else {
        const numberRegex = new RegExp(/^[1-9]$/);
        numberRegex.test(cellNotes[parseInt(key) - 1]) ? cellNotes[parseInt(key) - 1] = "-" : cellNotes[parseInt(key) - 1] = key
      }
      const updatedNotes = [...notes];
      updatedNotes[selectedCell] = cellNotes.join("");
      setNotes(updatedNotes);
    } else {
      const updatedPuzzle = [...puzzle];
      updatedPuzzle[selectedCell] = (key === "Backspace" || key === "Delete") ? "-" : key;
      setPuzzle(updatedPuzzle.join(""));
    }
  }

  const navigateTable = (key: string): void => {
    switch(key) {
      case "ArrowUp":
        if (selectedCell - 9 < 0) return;
        setSelectedCell(selectedCell - 9);
        break;
      case "ArrowDown":
        if (selectedCell + 9 > puzzle.length - 1) return;
        setSelectedCell(selectedCell + 9);
        break;
      case "ArrowLeft":
        if (selectedCell - 1 < 0 || selectedCell % 9 === 0) return;
        setSelectedCell(selectedCell - 1);
        break;
      case "ArrowRight":
        if (selectedCell + 1 > puzzle.length - 1 || (selectedCell + 1) % 9 === 0) return;
        setSelectedCell(selectedCell + 1);
        break;
    }
  }

  return (
    <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
      <table className={sudokuTable} onKeyDown={handleKeyDown}>
        <tbody>
          {convertIntoChunks([...puzzle], 9).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cellValue, columnIndex) => (
                <SudokuCell key={columnIndex} cellValue={cellValue} cellNotes={notes[9 * rowIndex + columnIndex]} rowIndex={rowIndex} columnIndex={columnIndex} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ClickAwayListener>
  );
}

export default SudokuTable;