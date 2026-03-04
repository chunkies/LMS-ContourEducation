import { LoginForm } from "@/components/login-form";
import Box from "@mui/material/Box";

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
        <LoginForm />
      </Box>
    </Box>
  );
}
