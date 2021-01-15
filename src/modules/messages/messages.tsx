import React, { ChangeEvent, FC, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editMessage, loadMessages, sendMessage } from './messages-redux';
import { MessageBubble } from '../../components/message-bubble/message-bubble';
import { Message, MessagesProps as Props, Store } from '../../../types';
import * as Styled from './messages-style';

export const Messages: FC<Props> = ({ conversation }: Props): ReactElement => {
    const dispatch = useDispatch();
    const messages = useSelector<Store, Message[]>((state) => state.messages[conversation]);

    const anchor = useRef<HTMLDivElement>();
    const [editID, setEditID] = useState('');
    const [editText, setEditText] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const resetState = useCallback((id = '', text = '', message = '') => {
        setEditID(id);
        setEditText(text);
        setNewMessage(message);
    }, []);

    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        editText ? setEditText(e.currentTarget.value) : setNewMessage(e.currentTarget.value);
    };

    const onClick = () => {
        resetState();
        dispatch(editText ? editMessage(conversation, editID, editText) : sendMessage(conversation, newMessage));
    };

    useEffect(() => {
        (async () => {
            await dispatch(loadMessages(conversation));
        })();
        return () => resetState();
    }, [conversation]);

    useEffect(() => {
        anchor?.current?.scrollIntoView?.();
    }, [messages?.length]);

    return (
        <Styled.Messages>
            <Styled.Feed>
                {messages?.map((props) => (
                    <MessageBubble key={props.id} {...props} onClick={resetState} />
                ))}
                <span ref={anchor} />
            </Styled.Feed>
            <Styled.Footer>
                <Styled.Textarea
                    value={editText || newMessage}
                    onChange={onChange}
                    rows={5}
                    placeholder="Type a messsage"
                />
                <div>
                    <Styled.Button disabled={!editText && !newMessage} onClick={onClick}>
                        {editText ? 'EDIT' : 'SEND'}
                    </Styled.Button>
                    {editText && <Styled.Button onClick={() => resetState()}>CANCEL</Styled.Button>}
                </div>
            </Styled.Footer>
        </Styled.Messages>
    );
};
