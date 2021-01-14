import thunk from 'redux-thunk';
import createMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { AnyAction } from 'redux';
import { Conversation, Dispatch, Store } from '../types';

export type MockStore = MockStoreEnhanced<Store, Dispatch>;

type Reducer = (state: unknown, action: AnyAction) => unknown;

export const mockStore = (error = {}, conversations: Conversation[] = [], messages = {}): MockStoreEnhanced<Store> =>
    createMockStore<Store, Dispatch>([thunk])({
        error,
        conversations,
        messages,
    });

export const runReducer = (store: MockStore, reducer: Reducer, initialState?: unknown): unknown =>
    store.getActions().reduce(reducer, initialState);
