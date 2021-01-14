import styled from 'styled-components';
import { StyledProps } from '../../../types';

export const Conversation = styled.button<StyledProps<{ active: boolean }>>`
    background-color: ${({ active, theme }) => (active ? theme.brightBlue : 'transparent')};
    border: 0;
    color: white;
    cursor: pointer;
    display: block;
    padding: 20px;
    text-align: left;
    width: 100%;

    &:not(:last-of-type) {
        border-bottom: solid 2px white;
    }
`;

export const Conversations = styled.div<StyledProps>`
    background-color: ${({ theme }) => theme.darkBlue};
`;

export const Name = styled.h2`
    margin: 0 0 10px;
`;
