import { Plus_Jakarta_Sans } from "next/font/google";

export const plusFont = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const appTypography = {
  fontFamily: plusFont.style.fontFamily,
  h1: {
    fontWeight: 600,
    fontSize: "2.25rem",
    lineHeight: "2.75rem",
    fontFamily: plusFont.style.fontFamily,
  },
  h2: {
    fontWeight: 600,
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
    fontFamily: plusFont.style.fontFamily,
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: "1.75rem",
    fontFamily: plusFont.style.fontFamily,
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.3125rem",
    lineHeight: "1.6rem",
    fontFamily: plusFont.style.fontFamily,
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.125rem",
    lineHeight: "1.6rem",
    fontFamily: plusFont.style.fontFamily,
  },
  h6: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "1.2rem",
    fontFamily: plusFont.style.fontFamily,
  },
  button: {
    textTransform: "capitalize" as const,
    fontWeight: 400,
    fontFamily: plusFont.style.fontFamily,
  },
  body1: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.334rem",
    fontFamily: plusFont.style.fontFamily,
  },
  body2: {
    fontSize: "0.75rem",
    letterSpacing: "0rem",
    fontWeight: 400,
    lineHeight: "1rem",
    fontFamily: plusFont.style.fontFamily,
  },
  subtitle1: {
    fontSize: "0.875rem",
    fontWeight: 400,
    fontFamily: plusFont.style.fontFamily,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    fontFamily: plusFont.style.fontFamily,
  },
};
