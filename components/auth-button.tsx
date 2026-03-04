"use client";

import { createClient } from "@/lib/supabase/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthButton({ email }: { email: string | null }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  if (!email) {
    return (
      <Button variant="outlined" size="small" component={Link} href="/auth/login">
        Sign in
      </Button>
    );
  }

  const logout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      Hey, {email}!
      <Button variant="outlined" onClick={logout} disabled={loggingOut}>
        {loggingOut ? <CircularProgress size={20} /> : "Logout"}
      </Button>
    </Box>
  );
}
