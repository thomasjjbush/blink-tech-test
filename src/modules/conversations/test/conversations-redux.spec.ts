import { MockStore, mockStore, runReducer } from '../../../../test/jest.utils';
import { getData } from '../../../utils/get-data/get-data';
import { conversationsReducer, loadConversations } from '../conversations-redux';

jest.mock('../../../utils/get-data/get-data', () => ({
    getData: jest.fn().mockResolvedValue([{ name: 'name', id: 'iddddd' }]),
}));

describe('conversation redux', () => {
    let store: MockStore;

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore();
    });

    describe('loadConversations', () => {
        it('should dispatch LOADED action with correct payload if conversations request resolves and update store correctly', async () => {
            await store.dispatch(loadConversations());

            expect(store.getActions()).toEqual([
                { type: 'conversation/LOADED', payload: [{ name: 'name', id: 'iddddd' }] },
            ]);
            expect(runReducer(store, conversationsReducer)).toEqual([{ name: 'name', id: 'iddddd' }]);
        });

        it('should dispatch ERROR action if conversations request rejects and update store correctly', async () => {
            (getData as jest.Mock).mockRejectedValueOnce('errrrrr');
            await store.dispatch(loadConversations());

            expect(store.getActions()).toEqual([{ type: 'error/FATAL' }]);
        });
    });
});
