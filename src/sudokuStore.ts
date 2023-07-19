import { create } from "zustand";
import { persist } from "zustand/middleware";
import { findEditableCells } from "./utils";

interface SudokuState {
  puzzle: string;
  solution: string;
  difficulty: string;
  notes: string[];
  editableCells: string[];
  selectedCell: number;
  gameClock: number;

  createGame: (puzzle: string, solution: string, difficulty: string) => void;
  setPuzzle: (puzzle: string) => void;
  setSolution: (solution: string) => void;
  setDifficulty: (difficulty: string) => void;
  setNotes: (notes: string[]) => void;
  setSelectedCell: (selectedCell: number) => void;
  incrementGameClock: () => void;
}

const useSudokuStore = create<SudokuState>()(persist(
  (set) => ({
    puzzle: "-".repeat(81),
    solution: "",
    difficulty: "",
    notes: Array(81).fill("---------"),
    editableCells: Array(81).fill("n"),
    selectedCell: NaN,
    gameClock: 0,

    createGame: (puzzle, solution, difficulty) =>
      set((state) => ({
        puzzle: puzzle,
        solution: solution,
        difficulty: difficulty,
        editableCells: findEditableCells([...puzzle], state.editableCells),
        selectedCell: NaN,
        gameClock: 0,
      })),

    setPuzzle: (puzzle) =>
      set((state) => ({
        ...state,
        puzzle: puzzle
      })),

    setSolution: (solution) =>
      set((state) => ({
        ...state,
        solution: solution
      })),

    setDifficulty: (difficulty) =>
      set((state) => ({
        ...state,
        difficulty: difficulty
      })),

    setNotes: (notes) =>
      set((state) => ({
        ...state,
        notes: notes
      })),

    setSelectedCell: (selectedCell) =>
      set((state) => ({
        ...state,
        selectedCell: selectedCell
      })),

    incrementGameClock: () =>
      set((state) => ({
        ...state,
        gameClock: state.gameClock + 1
      }))
  }),
  {
    name: "sudoku-state-storage",
    partialize: (state) =>
    Object.fromEntries(
      Object.entries(state).filter(([key]) => !['selectedCell'].includes(key))
    ),
  }
));

export default useSudokuStore;