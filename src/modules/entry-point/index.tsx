import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Global } from '../../components/global/global';
import { store } from '../../store/store';
import { App } from '../app/app';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={{ brightBlue: '#004bd6', darkBlue: '#011041', lightBlue: '#e0f4ff' }}>
            <Global />
            <App />
        </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);
