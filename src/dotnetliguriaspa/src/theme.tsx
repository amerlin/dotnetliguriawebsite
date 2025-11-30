import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: '"Titillium Web", Arial, sans-serif',
        body2: {
            color: "red"
        }
    },
    palette: {
        primary: {
            main: "#648B2D",
            light: "sky",
        },
        secondary: {
            main: "#15c630"
        },
    },
});

export default theme;