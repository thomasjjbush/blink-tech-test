import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    html, body, #root {
        margin: 0;
        height: 100%;
        font-family: sans-serif;
    }
    *:focus {
        backdrop-filter: contrast(0.1);
        outline: none;
        
    }
`;
