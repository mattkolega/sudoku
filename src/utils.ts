export const findEditableCells = (puzzle: string[], editableCells: string[]): string[] => {
  const updatedArray = [...editableCells];
  for (let i = 0; i < puzzle.length; i++) {
    (puzzle[i] === "-") ? updatedArray[i] = "y" : updatedArray[i] = "n";
  }
  return updatedArray;
}

export const convertGameClockToString = (gameClock: number): string => {
  const hours = Math.floor(gameClock / 3600);
  const minutes = Math.floor((gameClock % 3600) / 60);
  const seconds = Math.floor((gameClock % 3600) % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}