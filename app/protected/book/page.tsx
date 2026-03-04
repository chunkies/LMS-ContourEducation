"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ArrowLeft } from "lucide-react";

export default function BookConsultationPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const reason = formData.get("reason") as string;
    const datetime = formData.get("datetime") as string;

    if (!firstName || !lastName || !reason || !datetime) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedReason = reason.trim();

    if (trimmedFirst.length > 100 || trimmedLast.length > 100) {
      setError("Names must be 100 characters or fewer.");
      setIsSubmitting(false);
      return;
    }

    if (trimmedReason.length > 2000) {
      setError("Reason must be 2000 characters or fewer.");
      setIsSubmitting(false);
      return;
    }

    if (new Date(datetime) <= new Date()) {
      setError("Consultation date must be in the future.");
      setIsSubmitting(false);
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to book a consultation.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("consultations")
      .insert({
        user_id: user.id,
        first_name: trimmedFirst,
        last_name: trimmedLast,
        reason: trimmedReason,
        consultation_datetime: datetime,
      });

    if (insertError) {
      setError(insertError.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/protected");
    router.refresh();
  }

  return (
    <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 4, maxWidth: 600, mx: "auto" }}>
      <div>
        <Button
          variant="text"
          size="small"
          component={Link}
          href="/protected"
          startIcon={<ArrowLeft size={16} />}
        >
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader title="Book a Consultation" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              placeholder="Enter first name"
              required
              fullWidth
              slotProps={{ htmlInput: { maxLength: 100 } }}
            />

            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              required
              fullWidth
              slotProps={{ htmlInput: { maxLength: 100 } }}
            />

            <TextField
              id="reason"
              name="reason"
              label="Reason for Consultation"
              placeholder="Describe the reason for your consultation"
              multiline
              rows={4}
              required
              fullWidth
              slotProps={{ htmlInput: { maxLength: 2000 } }}
            />

            <TextField
              id="datetime"
              name="datetime"
              label="Date & Time"
              type="datetime-local"
              required
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
            >
              {isSubmitting ? "Booking..." : "Book Consultation"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
