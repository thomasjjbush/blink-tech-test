import { AnyAction } from 'redux';
import { ErrorState, ErrorActions } from '../../../types';

export const errorReducer = (state: ErrorState = {}, { payload, type }: AnyAction): ErrorState => {
    switch (type) {
        case ErrorActions.FATAL:
            return { code: 400, fatal: true, message: payload || 'Oooops, something went wrong.' };
        default:
            return state;
    }
};
