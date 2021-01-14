import { createStore } from 'redux';
import { store } from './store';

jest.mock('redux', () => ({
    applyMiddleware: jest.fn((args) => args),
    combineReducers: jest.fn((args) => args),
    createStore: jest.fn(),
}));

jest.mock('redux-thunk', () => 'thunk');

jest.mock('../modules/conversations/conversations-redux', () => ({ conversationsReducer: 'conversationsReducer' }));
jest.mock('../modules/error/error-redux', () => ({ errorReducer: 'errorReducer' }));
jest.mock('../modules/messages/messages-redux', () => ({ messagesReducer: 'messagesReducer' }));

describe('store', () => {
    it('createStore should be invoked with correct arguments', () => {
        store;
        expect(createStore).toHaveBeenCalledTimes(1);
        expect(createStore).toHaveBeenLastCalledWith(
            { conversations: 'conversationsReducer', error: 'errorReducer', messages: 'messagesReducer' },
            'thunk',
        );
    });
});
