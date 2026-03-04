import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import { AuthButton } from "@/components/auth-button";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: { signOut: vi.fn().mockResolvedValue({}) },
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

it("shows sign in link when logged out and email when logged in", () => {
  const { unmount } = render(<AuthButton email={null} />);
  expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  unmount();

  render(<AuthButton email="alice@test.com" />);
  expect(screen.getByText(/alice@test.com/)).toBeInTheDocument();
});
