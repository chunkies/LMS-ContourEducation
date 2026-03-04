import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import { ThemeSwitcher } from "@/components/theme-switcher";

vi.mock("@mui/material/styles", () => ({
  useColorScheme: () => ({ mode: "light", setMode: vi.fn() }),
}));

it("renders theme toggle buttons", () => {
  render(<ThemeSwitcher />);
  expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "dark" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "system" })).toBeInTheDocument();
});
