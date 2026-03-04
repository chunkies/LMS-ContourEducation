import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { ConsultationCard } from "@/components/consultation-card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { CalendarPlus } from "lucide-react";

async function ConsultationList() {
  const supabase = await createClient();
  const { data: consultations } = await supabase
    .from("consultations")
    .select("*")
    .order("consultation_datetime", { ascending: true });

  if (!consultations || consultations.length === 0) return null;

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      {consultations.map((consultation) => (
        <ConsultationCard key={consultation.id} consultation={consultation} />
      ))}
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
        <Typography variant="h5" fontWeight="bold">
          My Consultations
        </Typography>
        <Button
          variant="contained"
          href="/protected/book"
          startIcon={<CalendarPlus size={16} />}
        >
          Book Consultation
        </Button>
      </Box>

      <Suspense fallback={<CircularProgress />}>
        <ConsultationList />
      </Suspense>
    </Box>
  );
}
