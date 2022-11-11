import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        /* font-family: 'Open Sans', sans-serif;  */
        font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    }
    #root{
        margin:0 auto;
        padding-top: 86px;
    }
    body {
    }
    h1 {
        font-size: 24px;
        font-weight: 800;
        color: rgba(31,41,55);
    }
 `
