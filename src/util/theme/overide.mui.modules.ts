import {
  SimplePaletteColorOptions,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    note: SimplePaletteColorOptions;
    gold: SimplePaletteColorOptions;
    bg: PaletteColorOptions;
  }
  interface PaletteOptions {
    note?: SimplePaletteColorOptions;
    gold?: SimplePaletteColorOptions;
    bg?: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    note: true;
  }
}
