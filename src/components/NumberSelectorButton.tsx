import { Button } from "@mantine/core";
import { TbEraser } from "react-icons/tb";
import { numberSelectorButton } from "../styles.css.ts";

type NumberSelectorButtonProps = {
  buttonValue: string;
  handleButtonPress: (buttonValue: string) => void;
}

const NumberSelectorButton = ({ buttonValue, handleButtonPress }: NumberSelectorButtonProps) => {
  return (
    <Button className={`${numberSelectorButton} cellEditButton`} onClick={() => handleButtonPress(buttonValue)}>
      { buttonValue === "Erase" ? <TbEraser /> : buttonValue }
    </Button>
  );
}

export default NumberSelectorButton;