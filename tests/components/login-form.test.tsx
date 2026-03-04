import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import { LoginForm } from "@/components/login-form";

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: { signInWithOtp: vi.fn().mockResolvedValue({ error: null }) },
  }),
}));

it("submits email and shows confirmation", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(screen.getByLabelText(/email/i), "test@example.com");
  await user.click(screen.getByRole("button", { name: /send link/i }));

  await waitFor(() => {
    expect(screen.getByText("Check your email")).toBeInTheDocument();
  });
});
