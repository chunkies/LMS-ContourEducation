"use client";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useColorScheme } from "@mui/material/styles";
import { Laptop, Moon, Sun } from "lucide-react";

const options = [
  { value: "light", icon: <Sun size={16} /> },
  { value: "dark", icon: <Moon size={16} /> },
  { value: "system", icon: <Laptop size={16} /> },
] as const;

export function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={(_e, value) => value && setMode(value)}
      size="small"
    >
      {options.map(({ value, icon }) => (
        <ToggleButton key={value} value={value} aria-label={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
