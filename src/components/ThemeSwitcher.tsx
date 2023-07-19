import { Paper, ActionIcon, useMantineColorScheme, Tooltip } from "@mantine/core";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";
import { themeSwitcher } from "../styles.css.ts";

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Paper shadow="xs" radius="md" p="xs" className={themeSwitcher}>
      <Tooltip label={colorScheme === "light" ? "Dark Mode" : "Light Mode"} openDelay={500}>
        <ActionIcon onClick={() => toggleColorScheme()}>
          { colorScheme === "light" ? <TbMoonFilled /> : <TbSunFilled /> }
        </ActionIcon>
      </Tooltip>
    </Paper>
  );
}

export default ThemeSwitcher;