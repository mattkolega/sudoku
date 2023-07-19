import { useState } from "react";
import { shallow } from "zustand/shallow";
import { useMantineColorScheme } from "@mantine/core";
import { useUpdateEffect } from "usehooks-ts";
import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import useSudokuStore from "../sudokuStore";
import {
  sudokuTableCell,
  innerTableBorderColor,
  cellSelection,
  incorrectValue,
  editableCell,
  sameValue,
  notesGrid
} from "../styles.css";

type SudokuCellProps = {
  cellValue: string;
  cellNotes: string;
  rowIndex: number;
  columnIndex: number;
}

const SudokuCell = ({ cellValue, cellNotes, rowIndex, columnIndex }: SudokuCellProps) => {
  const { puzzle, solution, editableCells, selectedCell, setSelectedCell} = useSudokuStore(state => ({
    puzzle: state.puzzle,
    solution: state.solution,
    editableCells: state.editableCells,
    selectedCell: state.selectedCell,
    setSelectedCell: state.setSelectedCell
  }), shallow);

  const [displayNotes, setDisplayNotes] = useState<boolean>(false);

  const cellIndex = 9 * rowIndex + columnIndex;

  const { colorScheme } = useMantineColorScheme();

  const cellStyling = clsx({
    [sudokuTableCell] : true,
    [cellSelection] : (selectedCell === cellIndex),
    [sameValue] : (puzzle[selectedCell] === cellValue &&
                          cellValue !== "-" &&
                          cellIndex !== selectedCell),
    [editableCell] : (editableCells[cellIndex] === "y"),
    [incorrectValue] : (cellValue !== solution[cellIndex] && cellValue !== "-"),
  });

  useUpdateEffect(() => {
    setDisplayNotes(false);
  }, [cellValue]);

  useUpdateEffect(() => {
    setDisplayNotes(true);
  }, [cellNotes]);

  const handleFocus = () => { if (selectedCell !== cellIndex) setSelectedCell(cellIndex); }

  return (
    <td
      className={cellStyling}
      style={assignInlineVars({ [innerTableBorderColor]: colorScheme === "light" ? "rgba(64, 64, 64, 0.25)" : "rgba(235, 235, 235, 0.25)" })}
      onMouseDown={handleFocus}
      onTouchStart={handleFocus}
      tabIndex={0}
    >
      {
        !displayNotes
        ? cellValue === "-" ? "" : cellValue
        : <div className={notesGrid}>
            {[...cellNotes].map((num, index) => (
              <div key={index}>
                { num === "-" ? "\u00A0" : num }
              </div>
            ))}
          </div>
      }
    </td>
  );
}

export default SudokuCell;