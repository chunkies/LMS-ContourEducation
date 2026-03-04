import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

async function UserNav() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email ?? null;

  return <AuthButton email={email} />;
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      component="main"
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        <Box
          component="nav"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
            height: 64,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1280,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
              px: 2.5,
            }}
          >
            <Link
              href="/protected"
              style={{ fontWeight: 600, fontSize: "0.875rem", textDecoration: "none", color: "inherit" }}
            >
              Contour LMS
            </Link>
            <Suspense fallback={<CircularProgress size={20} />}>
              <UserNav />
            </Suspense>
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, maxWidth: 1280, width: "100%", px: 2.5 }}>
          {children}
        </Box>

        <Box
          component="footer"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: 1,
            borderColor: "divider",
            gap: 4,
            py: 8,
          }}
        >
          <ThemeSwitcher />
        </Box>
      </Box>
    </Box>
  );
}
