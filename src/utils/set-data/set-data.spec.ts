import { Endpoints } from '../../../types';
import { setData } from './set-data';

global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockReturnValue('response') });
const args: [Endpoints, string, unknown] = [Endpoints.MESSAGES, 'POST', { warg: 1 }];

describe('getData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should invoke fetch with correct input and init arguments', async () => {
        await setData(...args);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/messages', {
            body: JSON.stringify({ warg: 1 }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        });
    });

    it('should return response from fetch method', async () => {
        expect(await setData(...args)).toBe('response');
    });

    it('should not catch error internally and should subsequently hit caller catch block', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce('iz broken :(');
        try {
            await setData(...args);
        } catch (err) {
            expect(err).toBe('iz broken :(');
        }
    });
});
