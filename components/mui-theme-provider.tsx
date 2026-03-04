"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: true,
    dark: true,
  },
});

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
