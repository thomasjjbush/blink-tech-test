import React, { FC, ReactElement, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadConversations } from './conversations-redux';
import { DateAndTime } from '../../components/date-and-time/date-and-time';
import { Conversation, ConversationsProps as Props, Store } from '../../../types';
import * as Styled from './conversations-style';
import { useTabFocus } from '../../hooks/use-tab-focus';

export const Conversations: FC<Props> = ({ conversation, setConversation }: Props): ReactElement => {
    const node = useRef<HTMLDivElement>();
    const dispatch = useDispatch();
    const conversations = useSelector<Store, Conversation[]>((state) => state.conversations);

    useTabFocus(node?.current);

    useEffect(() => {
        (async () => {
            await dispatch(loadConversations());
        })();
    }, []);

    return (
        <Styled.Conversations ref={node} role="tablist">
            {conversations
                .sort((a, b) => new Date(b.last_updated).valueOf() - new Date(a.last_updated).valueOf())
                .map(({ id, name, last_updated }, i) => (
                    <Styled.Conversation
                        active={conversation === id}
                        aria-label={`Message from ${name} at ${new Date(last_updated).toUTCString()}`}
                        aria-selected={conversation === id}
                        key={id}
                        onClick={() => setConversation(id)}
                        role="tab"
                        tabIndex={!i ? 0 : -1}
                        type="button"
                    >
                        <Styled.Name data-test-id="conversation-name">{name}</Styled.Name>
                        <DateAndTime>{last_updated}</DateAndTime>
                    </Styled.Conversation>
                ))}
        </Styled.Conversations>
    );
};
