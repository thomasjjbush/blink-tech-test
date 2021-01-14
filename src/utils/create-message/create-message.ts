import { v4 as uuid } from 'uuid';
import { Message } from '../../../types';

export const createMessage = ({
    conversation,
    id = uuid(),
    isUser = true,
    last_updated = new Date().toISOString(),
    text,
}: Partial<Message>): Message => ({ conversation, id, isUser, last_updated, text });
