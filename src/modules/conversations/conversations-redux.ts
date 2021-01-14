import { getData } from '../../utils/get-data/get-data';
import { Action, Conversation, ConversationActions, Endpoints, ErrorActions, MessageActions } from '../../../types';
import { AnyAction } from 'redux';

export const loadConversations = (): Action => async (dispatch) => {
    try {
        const payload = await getData<Conversation[]>(Endpoints.CONVERSATIONS);
        dispatch({ type: ConversationActions.LOADED, payload });
    } catch (err) {
        dispatch({ type: ErrorActions.FATAL, payload: err });
    }
};

export const conversationsReducer = (state: Conversation[] = [], { payload, type }: AnyAction): Conversation[] => {
    switch (type) {
        case ConversationActions.LOADED:
            return payload;
        case MessageActions.SEND:
            return state.map((convo) =>
                convo.id === payload.conversation ? { ...convo, last_updated: payload.last_updated } : convo,
            );
        default:
            return state;
    }
};
