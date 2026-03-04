import type { Metadata } from "next";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { MuiThemeProvider } from "@/components/mui-theme-provider";

const defaultUrl = `https://${process.env.VERCEL_URL}`;


export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Contour LMS",
  description: "Contour LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
