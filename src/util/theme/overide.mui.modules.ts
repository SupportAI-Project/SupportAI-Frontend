import { SimplePaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    note: SimplePaletteColorOptions;
    gold: SimplePaletteColorOptions;
  }
  interface PaletteOptions {
    note?: SimplePaletteColorOptions;
    gold?: SimplePaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    note: true;
  }
}
