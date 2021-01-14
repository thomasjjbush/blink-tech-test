import { AnyAction } from 'redux';
import { getData } from '../../utils/get-data/get-data';
import { setData } from '../../utils/set-data/set-data';
import { createMessage } from '../../utils/create-message/create-message';
import { Action, Endpoints, ErrorActions, Message, MessageActions, MessageState } from '../../../types';

export const loadMessages = (conversation: string): Action => async (dispatch) => {
    try {
        const messages = await getData<Message[]>(Endpoints.MESSAGES, { conversation, _sort: 'last_updated' });
        dispatch({ type: MessageActions.LOADED, payload: { key: conversation, messages } });
    } catch (err) {
        dispatch({ type: ErrorActions.FATAL });
    }
};

export const editMessage = (conversation: string, id: string, text: string): Action => async (dispatch) => {
    dispatch({ type: MessageActions.EDIT, payload: { key: conversation, id, text } });

    try {
        await setData(`${Endpoints.MESSAGES}/${id}`, 'PATCH', { text });
    } catch (err) {
        dispatch({ type: ErrorActions.FATAL });
    }
};

export const sendMessage = (conversation: string, text: string): Action => async (dispatch) => {
    const payload = createMessage({ conversation, text });
    dispatch({ type: MessageActions.SEND, payload });

    try {
        await Promise.all([
            setData(Endpoints.MESSAGES, 'POST', payload),
            setData(`${Endpoints.CONVERSATIONS}/${conversation}`, 'PATCH', { last_updated: payload.last_updated }),
        ]);
    } catch (err) {
        dispatch({ type: ErrorActions.FATAL });
    }
};

export const messagesReducer = (state: MessageState = {}, { payload, type }: AnyAction): MessageState => {
    switch (type) {
        case MessageActions.EDIT:
            return {
                ...state,
                [payload.key]: state[payload.key].map((message) =>
                    message.id === payload.id ? { ...message, text: payload.text } : message,
                ),
            };
        case MessageActions.LOADED:
            return { ...state, [payload.key]: payload.messages };
        case MessageActions.SEND:
            return { ...state, [payload.conversation]: [...state[payload.conversation], payload] };
        default:
            return state;
    }
};
