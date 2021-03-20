// @flow
import React from "react";
import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    primary: "#2B2ECF",
    secondary: "#FF0066",
    white: "#FFFFFF",
    tagBg: "#40f637",
    grey: "#C5D3E8",
    background: "#E7EDF6",
    darkGrey: "#7F8A9C",
    purple: "#5d2bcfb5",
  },
  breakpoints: {
    mobile: 480,
  },
};

type Props = {
  children: Element<*>,
};
const Theme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
