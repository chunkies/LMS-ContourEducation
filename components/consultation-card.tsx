"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

type ConsultationProps = {
  id: string;
  first_name: string;
  last_name: string;
  reason: string;
  consultation_datetime: string;
  is_complete: boolean;
};

export function ConsultationCard({
  consultation,
}: {
  consultation: ConsultationProps;
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function toggleComplete() {
    setIsUpdating(true);
    const supabase = createClient();
    await supabase
      .from("consultations")
      .update({ is_complete: !consultation.is_complete })
      .eq("id", consultation.id);
    router.refresh();
    setIsUpdating(false);
  }

  const datetime = new Date(consultation.consultation_datetime);

  return (
    <Card>
      <CardHeader
        title={`${consultation.first_name} ${consultation.last_name}`}
        action={
          <Chip
            label={consultation.is_complete ? "Complete" : "Pending"}
            color={consultation.is_complete ? "success" : "default"}
            size="small"
          />
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {consultation.reason}
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          {datetime.toLocaleDateString()} at{" "}
          {datetime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <FormControlLabel
          control={
            <Checkbox
              checked={consultation.is_complete}
              disabled={isUpdating}
              onChange={toggleComplete}
            />
          }
          label={`Mark as ${consultation.is_complete ? "incomplete" : "complete"}`}
        />
      </CardActions>
    </Card>
  );
}
