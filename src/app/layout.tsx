"use client";

import { baselightTheme } from "@/util/theme";
import "./globals.css";
import { Providers } from "./providers";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ height: "100vh" }}>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
