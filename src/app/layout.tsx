"use client";

import { baselightTheme } from "@/util/theme";
import "./globals.css";
import { SocketProvider } from "./providers/SocketProvider/provider";
import { QueryProvider } from "./providers/QueryProvider/provider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SelectedContactProvider } from "./providers/SelectedContactProvider/provider";

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
            <SocketProvider>
              <SelectedContactProvider>
                {children}
              </SelectedContactProvider>
            </SocketProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
