import React, { FC, ReactElement } from 'react';
import { DateAndTime } from '../date-and-time/date-and-time';
import { MessageBubbleProps as Props } from '../../../types';
import * as Styled from './message-bubble-style';

export const MessageBubble: FC<Props> = ({ id, isUser, last_updated, onClick, text }: Props): ReactElement => (
    <Styled.Bubble isUser={isUser}>
        <Styled.Text>{text}</Styled.Text>
        {isUser && (
            <Styled.Button data-test-id="edit-button" onClick={() => onClick(id, text)} type="button">
                Edit
            </Styled.Button>
        )}
        <DateAndTime>{last_updated}</DateAndTime>
    </Styled.Bubble>
);
