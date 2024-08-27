"use client";

import { baselightTheme } from "@/util/theme";
import "./globals.css";
import { SocketProvider } from "./providers/SocketProvider/provider";
import { QueryProvider } from "./providers/QueryProvider/provider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ChatProvider } from "./providers/SelectedContactProvider/provider";
import { GuideProvider } from "./providers/guide";

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
              <ChatProvider>
              <GuideProvider>{children}</GuideProvider>
              </ChatProvider>
            </SocketProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
