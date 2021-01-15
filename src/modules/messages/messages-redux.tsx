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

    // If I had more time I would properly handle this error case in a try/catch block and render a notification informing the user the EDIT failed and undo the optimistic action above
    setData(`${Endpoints.MESSAGES}/${id}`, 'PATCH', { text }).catch(() => dispatch({ type: ErrorActions.FATAL }));
};

export const sendMessage = (conversation: string, text: string): Action => async (dispatch) => {
    const payload = createMessage({ conversation, text });
    dispatch({ type: MessageActions.SEND, payload });

    // If I had more time I would properly handle this error case in a try/catch block and render a notification informing the user the SEND failed and undo the optimistic action above
    Promise.all([
        setData(Endpoints.MESSAGES, 'POST', payload),
        setData(`${Endpoints.CONVERSATIONS}/${conversation}`, 'PATCH', { last_updated: payload.last_updated }),
    ]).catch(() => dispatch({ type: ErrorActions.FATAL }));
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
