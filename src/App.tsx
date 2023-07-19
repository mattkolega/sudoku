import { useState } from "react";
import { shallow } from "zustand/shallow";
import { ColorSchemeProvider, ColorScheme, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useInterval } from "usehooks-ts";
import useSudokuStore from "./sudokuStore";
import GameContainer from "./components/GameContainer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Footer from "./components/Footer";
import NewGameModal from "./components/NewGameModal";
import FinishGameModal from "./components/FinishGameModal";

function App() {
  const { gameClock, incrementGameClock } = useSudokuStore(state => ({
    gameClock: state.gameClock,
    incrementGameClock: state.incrementGameClock
  }), shallow);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [newGameModalIsOpen, setNewGameModalIsOpen] = useState<boolean>(false);
  const [finishGameModalIsOpen, setFinishGameModalIsOpen] = useState<boolean>(false);
  const [clockIsRunning, setClockIsRunning] = useState<boolean>(gameClock > 0 ? true : false);

  useInterval(() => {incrementGameClock()}, clockIsRunning ? 1000 : null);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          globalStyles: (theme) => ({
            body: {
              backgroundColor: theme.colorScheme === "dark" ? theme.black : "#f2f2f2",
            },
            table: {
              borderColor: theme.colorScheme === "dark" ? `${theme.colors.dark[0]} !important` : `${theme.black} !important`
            }
          })
        }}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        <GameContainer setNewGameModalState={setNewGameModalIsOpen} setFinishGameModalState={setFinishGameModalIsOpen}/>
        <ThemeSwitcher />
        <Footer />
        <NewGameModal
          isOpen={newGameModalIsOpen}
          setIsOpen={setNewGameModalIsOpen}
          clockIsRunning={clockIsRunning}
          setClockIsRunning={setClockIsRunning}
        />
        <FinishGameModal
          isOpen={finishGameModalIsOpen}
          setIsOpen={setFinishGameModalIsOpen}
          clockIsRunning={clockIsRunning}
          setClockIsRunning={setClockIsRunning}
        />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;