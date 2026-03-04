import { render, screen } from "@testing-library/react";
import { it, expect, vi } from "vitest";
import { ConsultationCard } from "@/components/consultation-card";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: () => ({ update: vi.fn().mockReturnValue({ eq: vi.fn().mockResolvedValue({ error: null }) }) }),
  }),
}));

it("renders consultation details", () => {
  render(
    <ConsultationCard
      consultation={{
        id: "abc-123",
        first_name: "John",
        last_name: "Doe",
        reason: "Need help with math",
        consultation_datetime: "2026-04-01T10:00:00Z",
        is_complete: false,
      }}
    />
  );
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Need help with math")).toBeInTheDocument();
});
