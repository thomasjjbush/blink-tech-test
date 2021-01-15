import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    html, body, #root {
        height: 100%;
    }

    body {
        font-family: sans-serif;
        margin: 0;

        *:focus {
            backdrop-filter: contrast(0.1);
            outline: none;
        }
    }
`;
