import { styled, Box } from "@mui/material";

export const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

export const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export const LeftSidebarWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 2,
}));

export const RightSidebarWrapper = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 2,
  }));