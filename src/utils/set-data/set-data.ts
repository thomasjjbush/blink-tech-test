import { Endpoints } from '../../../types';

export const setData = (endpoint: Endpoints | string, method: string, body: unknown): Promise<Response> =>
    fetch(`http://localhost:3000/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
