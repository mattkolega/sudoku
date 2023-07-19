import { style, globalStyle, createVar } from "@vanilla-extract/css";

globalStyle("body", {
  textAlign: "center",
});

globalStyle("main", {
  margin: "0.6em",
});

export const innerTableBorderColor = createVar();

export const heading = style({
  fontFamily: "'Space Grotesk Variable', sans-serif",
  fontWeight: "bold",
  fontSize: "2.5em",
  margin: 0,
});

export const footer = style({
  bottom: "0.6em",
  left: "0.6em",
  position: "fixed",
  "@media": {
    "(max-width: 600px)": {
      display: "none",
    }
  }
});

export const footerLink = style({
  fontSize: "0.8em",
  alignItems: "center",
  display: "flex",
  selectors: {
    "&:link, &:visited, &:hover, &:active": {
      color: "inherit",
    }
  }
});

export const themeSwitcher = style({
  top: "0.6em",
  right: "0.6em",
  position: "fixed",
  "@media": {
    "(max-width: 600px)": {
      display: "none",
    }
  }
});

export const sudokuTable = style({
  margin: 0,
  padding: 0,
  fontFamily: "'Noto Sans Mono Variable', sans-serif",
  border: "solid",
  boxShadow: "var(--mantine-shadow-xs)",
  borderWidth: "4px",
  borderCollapse: "collapse",
  textAlign: "center",
  width: "100%",
  height: "100%",
  aspectRatio: "1 / 1",
});

export const sudokuTableCell = style({
  padding: 0,
  boxSizing: "border-box",
  border: "solid",
  borderColor: innerTableBorderColor,
  borderWidth: "1px",
  width: "calc(100% / 9)",
  height: "calc(100% / 9)",
  ":focus": {
    outline: "none",
  }
});

globalStyle(`${sudokuTable} tr:nth-child(3n) td`, {
  borderBottomColor: "inherit",
  borderBottomWidth: "2px",
});

globalStyle(`${sudokuTable} td:nth-child(3n)`, {
  borderRightColor: "inherit",
  borderRightWidth: "2px",
});

export const cellSelection = style({
  boxShadow: "inset 0px 0px 0px 3px #b5b5b588",
});

export const sameValue = style({
  backgroundColor: "#b5b5b588",
});

export const editableCell = style({
  color: "rgb(39, 125, 255)",
});

export const incorrectValue = style({
  color: "rgb(196, 41, 41)",
});

export const notesGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  fontSize: "0.6em",
  lineHeight: "1em",
});

export const numberSelectorContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const numberSelectorRow = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
});

export const numberSelectorButton = style({
  padding: 0,
  width: "15%",
});

export const gameInfoDisplay = style({
  display: "flex",
  flexDirection: "row",
});

globalStyle(`${gameInfoDisplay} div`, {
  flex: 1,
});

globalStyle(`${gameInfoDisplay} div:first-child`, {
  textAlign: "left",
});

globalStyle(`${gameInfoDisplay} div:last-child`, {
  textAlign: "right",
});