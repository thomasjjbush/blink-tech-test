import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { conversationsReducer } from '../modules/conversations/conversations-redux';
import { messagesReducer } from '../modules/messages/messages-redux';
import { errorReducer } from '../modules/error/error-redux';

export const store = createStore(
    combineReducers({
        conversations: conversationsReducer,
        error: errorReducer,
        messages: messagesReducer,
    }),
    applyMiddleware(thunk),
);
