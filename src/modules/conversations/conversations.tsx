import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadConversations } from './conversations-redux';
import { DateAndTime } from '../../components/date-and-time/date-and-time';
import { Conversation, ConversationsProps as Props, Store } from '../../../types';
import * as Styled from './conversations-style';

export const Conversations: FC<Props> = ({ conversation, setConversation }: Props): ReactElement => {
    const dispatch = useDispatch();
    const conversations = useSelector<Store, Conversation[]>((state) => state.conversations);

    useEffect(() => {
        (async () => {
            await dispatch(loadConversations());
        })();
    }, []);

    return (
        <Styled.Conversations>
            {conversations
                .sort((a, b) => new Date(b.last_updated).valueOf() - new Date(a.last_updated).valueOf())
                .map(({ id, name, last_updated }) => (
                    <Styled.Conversation
                        active={conversation === id}
                        key={id}
                        onClick={() => setConversation(id)}
                        type="button"
                    >
                        <Styled.Name>{name}</Styled.Name>
                        <DateAndTime>{last_updated}</DateAndTime>
                    </Styled.Conversation>
                ))}
        </Styled.Conversations>
    );
};
