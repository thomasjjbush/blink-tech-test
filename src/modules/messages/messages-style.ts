import styled from 'styled-components';
import { StyledProps } from '../../../types';

export const Button = styled.button`
    align-self: flex-start;
    background-color: ${({ theme }) => theme.darkBlue};
    border-radius: 10px;
    border: 0;
    color: white;
    cursor: pointer;
    display: block;
    height: 30px;
    margin: 0 0 10px 20px;
    width: 100px;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const Feed = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 20px;
    overflow: scroll;
`;

export const Footer = styled.footer<StyledProps>`
    background-color: #f0f0f0;
    display: flex;
    padding: 20px;
`;

export const Messages = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

export const Textarea = styled.textarea`
    border: solid 2px ${({ theme }) => theme.darkBlue};
    border-radius: 10px;
    flex: 1;
    padding: 20px;
    resize: none;
`;
