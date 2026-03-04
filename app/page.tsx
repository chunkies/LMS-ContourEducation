import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

async function RedirectHandler() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect("/protected"); //authed
  } else {
    redirect("/auth/login"); // not authed
  }
  return null;
}

export default function Home() {
  return (
    <Suspense>
      <RedirectHandler />
    </Suspense>
  );
}
