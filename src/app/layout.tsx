"use client";

import { baselightTheme } from "@/util/theme";
import "./globals.css";
import { SocketProvider } from "./providers/SocketProvider/provider";
import { QueryProvider } from "./providers/QueryProvider/provider";
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
          <QueryProvider>
            <SocketProvider>{children}</SocketProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
