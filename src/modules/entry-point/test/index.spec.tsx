import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Global } from '../../../components/global/global';
import { store } from '../../../store/store';
import { App } from '../../app/app';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Entry point', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        spy = jest.spyOn(document, 'getElementById').mockReturnValue(document.createElement('div'));
    });

    it('ReactDOM should be invoked with the correct arguments', async () => {
        await import('../');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('root');
        expect(ReactDOM.render).toHaveBeenCalledTimes(1);
        expect(ReactDOM.render).toHaveBeenCalledWith(
            <Provider store={store}>
                <ThemeProvider theme={{ brightBlue: '#004bd6', darkBlue: '#011041', lightBlue: '#e0f4ff' }}>
                    <Global />
                    <App />
                </ThemeProvider>
            </Provider>,
            document.createElement('div'),
        );
    });
});
