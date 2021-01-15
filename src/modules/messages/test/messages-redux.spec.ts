import { mockStore, MockStore, runReducer } from '../../../../test/jest.utils';
import { getData } from '../../../utils/get-data/get-data';
import { setData } from '../../../utils/set-data/set-data';
import { editMessage, loadMessages, messagesReducer, sendMessage } from '../messages-redux';

jest.mock('../../../utils/create-message/create-message', () => ({
    createMessage: jest.fn((m) => ({ ...m, last_updated: '77' })),
}));
jest.mock('../../../utils/get-data/get-data', () => ({ getData: jest.fn().mockResolvedValue('messages') }));
jest.mock('../../../utils/set-data/set-data', () => ({ setData: jest.fn().mockResolvedValue('messages') }));

describe('message redux', () => {
    let store: MockStore;

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore();
    });

    describe('loadMessages', () => {
        it('should dispatch correct LOADED action if messages request resolves and update store correctly', async () => {
            await store.dispatch(loadMessages('conversationzzz'));

            expect(getData).toHaveBeenCalledTimes(1);
            expect(getData).toHaveBeenCalledWith('messages', {
                _sort: 'last_updated',
                conversation: 'conversationzzz',
            });

            expect(store.getActions()).toEqual([
                {
                    payload: { key: 'conversationzzz', messages: 'messages' },
                    type: 'messages/LOADED',
                },
            ]);
            expect(runReducer(store, messagesReducer)).toEqual({ conversationzzz: 'messages' });
        });

        it('should dispatch ERROR action if messages request throws', async () => {
            (getData as jest.Mock).mockRejectedValueOnce('errahh');
            await store.dispatch(loadMessages('someString'));

            expect(store.getActions()).toEqual([{ type: 'error/FATAL' }]);
        });
    });

    describe('editMessage', () => {
        const expectedAction = {
            payload: {
                id: 'id',
                key: 'convo',
                text: 'NEW TEXTY',
            },
            type: 'messages/EDIT',
        };

        it('should dispatch correct EDITED action', async () => {
            await store.dispatch(editMessage('convo', 'id', 'NEW TEXTY'));

            expect(setData).toHaveBeenCalledTimes(1);
            expect(setData).toHaveBeenCalledWith('messages/id', 'PATCH', { text: 'NEW TEXTY' });
            expect(store.getActions()).toEqual([expectedAction]);
            expect(
                runReducer(store, messagesReducer, {
                    convo: [
                        { id: 'another-message', text: 'halp' },
                        { id: 'id', text: 'this is gunna go bye bye' },
                    ],
                }),
            ).toEqual({
                convo: [
                    { id: 'another-message', text: 'halp' },
                    { id: 'id', text: 'NEW TEXTY' },
                ],
            });
        });

        it('should dispatch ERROR action if messages PATCH requert fails', async () => {
            (setData as jest.Mock).mockRejectedValueOnce(new Error());
            await store.dispatch(editMessage('convo', 'id', 'NEW TEXTY'));

            expect(store.getActions()).toEqual([expectedAction, { type: 'error/FATAL' }]);
        });
    });

    describe('sendMessage', () => {
        const expectedPayload = {
            conversation: 'key',
            last_updated: '77',
            text: 'BLAH',
        };

        it('should dispatch correct SEND action', async () => {
            await store.dispatch(sendMessage('key', 'BLAH'));

            expect(setData).toHaveBeenCalledTimes(2);
            expect(setData).toHaveBeenNthCalledWith(1, 'messages', 'POST', expectedPayload);
            expect(setData).toHaveBeenNthCalledWith(2, 'conversations/key', 'PATCH', { last_updated: '77' });
            expect(store.getActions()).toEqual([{ type: 'messages/SEND', payload: expectedPayload }]);
            expect(runReducer(store, messagesReducer, { key: [1, 2, 3] })).toEqual({ key: [1, 2, 3, expectedPayload] });
        });
    });
});
