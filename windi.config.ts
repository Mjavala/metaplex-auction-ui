import { defineConfig } from "windicss/helpers";
import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
  darkMode: "class",
  safelist: "p-3 p-4 p-5",
  theme: {
    extend: {
      colors: {
        teal: {
          100: "#096",
        },
      },
    },
    textColor: {
      primary: "#e8f3f1",
      secondary: "#15263A",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#0C1622",
      secondary: "#15263A",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      primary: "#2B4A6F",
      secondary: "#90B8E8",
    }),
    boxShadowColor: {
      black: "#000",
    },
  },
  plugins: [formsPlugin],
});
