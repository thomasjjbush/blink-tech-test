import React, { ChangeEvent, FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMessage, loadMessages, sendMessage } from './messages-redux';
import { MessageBubble } from '../../components/message-bubble/message-bubble';
import { Message, MessagesProps as Props, Store } from '../../../types';
import * as Styled from './messages-style';

export const Messages: FC<Props> = ({ conversation }: Props): ReactElement => {
    const dispatch = useDispatch();
    const messages = useSelector<Store, Message[]>((state) => state.messages[conversation]);

    const feed = useRef<HTMLDivElement>();
    const [newMessage, setNewMessage] = useState('');
    const [editedMessage, setEditedMessage] = useState<Message>(null);

    const resetState = useCallback(() => {
        setEditedMessage(null);
        setNewMessage('');
    }, []);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (editedMessage) setEditedMessage({ ...editedMessage, text: e.currentTarget.value });
        else setNewMessage(e.currentTarget.value);
    };

    const onClick = () => {
        if (editedMessage) dispatch(editMessage(editedMessage));
        else dispatch(sendMessage(conversation, newMessage));
        resetState();
    };

    useEffect(() => {
        (async () => {
            await dispatch(loadMessages(conversation));
        })();
        return () => resetState();
    }, [conversation]);

    useEffect(() => {
        if (feed?.current) feed.current.scrollTop = feed.current.scrollHeight;
    }, [messages?.length]);

    return (
        <Styled.Messages>
            <Styled.Feed ref={feed}>
                {messages?.map((props) => (
                    <MessageBubble key={props.id} {...props} onClick={setEditedMessage} />
                ))}
            </Styled.Feed>
            <Styled.Footer>
                <Styled.Textarea
                    value={editedMessage?.text || newMessage}
                    onChange={onChange}
                    rows={5}
                    placeholder="Type a messsage"
                />
                <div>
                    <Styled.Button disabled={!editedMessage?.text && !newMessage} onClick={onClick}>
                        {editedMessage ? 'EDIT' : 'SEND'}
                    </Styled.Button>
                    {editedMessage && <Styled.Button onClick={() => resetState()}>CANCEL</Styled.Button>}
                </div>
            </Styled.Footer>
        </Styled.Messages>
    );
};
