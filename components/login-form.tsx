"use client";

import { createClient } from "@/lib/supabase/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.toLowerCase().includes("rate")) {
        setError("Too many attempts. Please wait a few minutes before trying again.");
      } else {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader
          title="Check your email"
          subheader="A magic link has been sent to your inbox"
          slotProps={{ title: { variant: "h5" } }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            We sent a sign-in link to <strong>{email}</strong>. Click the link
            in your email to sign in.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Sign in"
        subheader="Enter your email to receive a magic link"
        slotProps={{ title: { variant: "h5" } }}
      />
      <CardContent>
        <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="m@example.com"
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
          >
            {isLoading ? "Sending link..." : "Send link"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
