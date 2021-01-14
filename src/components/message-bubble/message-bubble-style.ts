import styled from 'styled-components';
import { StyledProps } from '../../../types';

export const Bubble = styled.div<StyledProps<{ isUser: boolean }>>`
    align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'auto')};
    background-color: ${({ isUser, theme }) => (isUser ? theme.brightBlue : theme.lightBlue)};
    border-radius: 20px;
    color: ${({ isUser }) => (isUser ? 'white' : 'auto')};
    display: inline;
    margin-bottom: 20px;
    max-width: 350px;
    padding: 20px;
    position: relative;

    &:after {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid ${({ isUser, theme }) => (isUser ? theme.brightBlue : theme.lightBlue)};
        content: '';
        ${({ isUser }) => (isUser ? 'right: 20px;' : 'left: 20px')};
        position: absolute;
        top: 100%;
        width: 0;
    }
`;

export const Button = styled.button`
    appearance: none;
    background-color: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    margin-right: 5px;
    padding: 0;
    text-decoration: underline;
`;

export const Text = styled.p`
    margin: 0 0 10px;
`;
