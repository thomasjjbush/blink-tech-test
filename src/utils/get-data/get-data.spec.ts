import { Endpoints } from '../../../types';
import { getData } from './get-data';

global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockReturnValue('response') });

describe('getData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it.each`
        endpoint
        ${Endpoints.CONVERSATIONS}
        ${Endpoints.MESSAGES}
    `('should invoke fetch with correct input argument when $endpoint endpoint is provided', async ({ endpoint }) => {
        await getData(endpoint);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/${endpoint}`);
    });

    it('should invoke fetch with correct input argument if params are provided', async () => {
        await getData(Endpoints.MESSAGES, { conversation: 'King_Boomy', _sort: 'Bilbo' });

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/messages?conversation=King_Boomy&_sort=Bilbo');
    });

    it('should return response from fetch method', async () => {
        expect(await getData(Endpoints.MESSAGES)).toBe('response');
    });

    it('should not catch error internally and should subsequently hit caller catch block', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce('iz broken :(');
        try {
            await getData(Endpoints.MESSAGES);
        } catch (err) {
            expect(err).toBe('iz broken :(');
        }
    });
});
