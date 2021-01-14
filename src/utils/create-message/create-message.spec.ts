import { createMessage } from './create-message';

jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('id') }));

describe('createMessage', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date(null));
    });

    it('should create default message object if no optional arguments are provided', () => {
        expect(createMessage({ conversation: 'conversation', text: 'text' })).toEqual({
            conversation: 'conversation',
            id: 'id',
            isUser: true,
            last_updated: 'Thu Jan 01 1970 01:00:00 GMT+0100 (Greenwich Mean Time)',
            text: 'text',
        });
    });

    it('should create message object using optional arguments if they are provided', () => {
        expect(
            createMessage({ id: 'some_id', last_updated: 'some_date', conversation: 'conversation', text: 'text' }),
        ).toEqual({
            conversation: 'conversation',
            id: 'some_id',
            isUser: true,
            last_updated: 'some_date',
            text: 'text',
        });
    });
});
