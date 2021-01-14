import { AnyAction } from 'redux';
import { ErrorState, ErrorActions } from '../../../types';

export const errorReducer = (state: ErrorState = {}, { payload, type }: AnyAction): ErrorState => {
    switch (type) {
        case ErrorActions.FATAL:
            return {
                code: payload || 404,
                fatal: true,
                message: 'Oooops, something went wrong. Server probs no runnin - Plz run `yarn server` in new terminal',
            };
        default:
            return state;
    }
};
