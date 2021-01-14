import { Endpoints, Options } from '../../../types';

export const getData = async <T>(endpoint: Endpoints, options: Options = {}): Promise<T> => {
    const params = Object.keys(options).reduce((acc, key, i) => `${acc}${i ? '&' : '?'}${key}=${options[key]}`, '');
    return fetch(`http://localhost:3000/${endpoint}${params}`).then((r) => r.json());
};
