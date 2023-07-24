import { Paper, Anchor, Text } from "@mantine/core";
import { BiLogoReact, BiLogoTypescript } from "react-icons/bi";
import { footer, footerLink } from "../styles.css.ts";

const Footer = () => {
  return (
    <footer className={footer}>
      <Paper shadow="xs" radius="md" p="sm">
        <Anchor className={footerLink} href="https://github.com/mattkolega/sudoku" target="_blank" color="black">
          <Text>Built by Matthew Kolega using&nbsp;</Text>
          <BiLogoReact color="#61DBFB" />
          <Text>&nbsp;and&nbsp;</Text>
          <BiLogoTypescript color="#2D79C7" />
        </Anchor>
      </Paper>
    </footer>
  );
}

export default Footer;