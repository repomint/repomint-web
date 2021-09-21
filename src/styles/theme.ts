import { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
      white: string;
      black: string;
      mintGreen: string;
      lightPurple: string;
      darkBlue: string;
      gray: string;
      lightGray: string;
      paleGray: string;
      darkGray: string;
      darkerGray: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    fontWeights: {
      normal: number;
      semiBold: number;
      bold: number;
      bolder: number;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xl2: string;
      xxl: string;
    };
    border: {
      "10px": string;
    };
    spacing: {
      "50px": string;
      md: string;
      md2: string;
      lg: string;
    };
    width: {
      main: string;
    };
    zIndex: {
      [key: string]: number;
      "1st": number;
      "2nd": number;
      "3rd": number;
      "4th": number;
      "5th": number;
      "6th": number;
      "7th": number;
      "8th": number;
      "9th": number;
      "10th": number;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    mintGreen: "#8FFAF3",
    lightPurple: "#F168F3",
    darkBlue: "#061833",
    gray: "#464646", // dashboard bg
    lightGray: "#E5E5E5", // icons (not pure white)
    paleGray: "#4F4F4F", // left small sidebar
    darkGray: "#303133", // right sidebar
    darkerGray: "#282828", // main bg
  },
  breakpoints: {
    xs: "360px",
    sm: "600px",
    md: "992px",
    lg: "1200px",
  },
  fontSizes: {
    xs: "0.75rem", //12px
    sm: "0.875rem", //14px
    md: "1rem", //16px
    lg: "1.125rem", //18px
    xl: "1.25rem", //20px
    xl2: "1.5rem", //24px
    xxl: "2.25rem", //36px
  },
  fontWeights: {
    normal: 400,
    semiBold: 500,
    bold: 600,
    bolder: 700,
  },
  border: {
    "10px": "0.625rem",
  },
  width: {
    main: "83.5rem", // 1336px
  },
  spacing: {
    "50px": "3.125rem",
    md: "1.5rem",
    md2: "2rem",
    lg: "3.5rem",
  },
  zIndex: {
    "1st": 0,
    "2nd": 1,
    "3rd": 2,
    "4th": 3,
    "5th": 4,
    "6th": 5,
    "7th": 6,
    "8th": 7,
    "9th": 8,
    "10th": 9,
  },
};
