"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <Card>
      <CardHeader
        title="Sorry, something went wrong."
        slotProps={{ title: { variant: "h5" } }}
      />
      <CardContent>
        {error ? (
          <Typography variant="body2" color="text.secondary">
            Code error: {error}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            An unspecified error occurred.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100svh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 3, md: 5 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Suspense>
          <ErrorContent />
        </Suspense>
      </Box>
    </Box>
  );
}
