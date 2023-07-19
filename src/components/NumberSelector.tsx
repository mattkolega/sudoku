import { shallow } from "zustand/shallow";
import NumberSelectorButton from "./NumberSelectorButton";
import useSudokuStore from "../sudokuStore.ts";
import { numberSelectorContainer, numberSelectorRow } from "../styles.css.ts";

type NumberSelectorProp = { notesEnabled: boolean }

const NumberSelector = ({ notesEnabled }: NumberSelectorProp) => {
  const { puzzle, notes, editableCells, selectedCell, setPuzzle, setNotes } = useSudokuStore(state => ({
    puzzle: state.puzzle,
    notes: state.notes,
    editableCells: state.editableCells,
    selectedCell: state.selectedCell,
    setPuzzle: state.setPuzzle,
    setNotes: state.setNotes,
  }), shallow);

  const handleButtonPress = (buttonValue: string): void => {
    if (isNaN(selectedCell)) return;
    if (editableCells[selectedCell] === "n") return;
    if (notesEnabled) {
      let cellNotes = [...notes[selectedCell]]
      if (buttonValue === "Erase") {
        cellNotes = Array(9).fill(["-"]);
      } else {
        const numberRegex = new RegExp(/^[1-9]$/);
        numberRegex.test(cellNotes[parseInt(buttonValue) - 1]) ? cellNotes[parseInt(buttonValue) - 1] = "-" : cellNotes[parseInt(buttonValue) - 1] = buttonValue
      }
      const updatedNotes = [...notes];
      updatedNotes[selectedCell] = cellNotes.join("");
      setNotes(updatedNotes);
    } else {
      const updatedPuzzle = [...puzzle];
      updatedPuzzle[selectedCell] = (buttonValue === "Erase") ? "-" : buttonValue;
      setPuzzle(updatedPuzzle.join(""));
    }
  }

  return (
    <div className={numberSelectorContainer}>
      <div className={numberSelectorRow}>
        <NumberSelectorButton buttonValue="1" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="2" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="3" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="4" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="5" handleButtonPress={handleButtonPress} />
      </div>
      <div className={numberSelectorRow}>
        <NumberSelectorButton buttonValue="6" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="7" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="8" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="9" handleButtonPress={handleButtonPress} />
        <NumberSelectorButton buttonValue="Erase" handleButtonPress={handleButtonPress} />
      </div>
    </div>
  );
}

export default NumberSelector;