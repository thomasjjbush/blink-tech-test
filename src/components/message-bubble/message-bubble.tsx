import React, { FC, ReactElement } from 'react';
import { DateAndTime } from '../date-and-time/date-and-time';
import { MessageBubbleProps as Props } from '../../../types';
import * as Styled from './message-bubble-style';

export const MessageBubble: FC<Props> = ({ onClick, ...props }: Props): ReactElement => (
    <Styled.Bubble isUser={props.isUser}>
        <Styled.Text>{props.text}</Styled.Text>
        {props.isUser && (
            <Styled.Button data-test-id="edit-button" onClick={() => onClick(props)} type="button">
                Edit
            </Styled.Button>
        )}
        <DateAndTime>{props.last_updated}</DateAndTime>
    </Styled.Bubble>
);
