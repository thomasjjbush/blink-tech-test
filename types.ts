import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type Action = ThunkAction<Promise<AnyAction | void>, Store, unknown, AnyAction>;

export type Dispatch = ThunkDispatch<Store, void, AnyAction>;

export interface Conversation {
    id: string;
    last_updated: string;
    name: string;
}

export enum ConversationActions {
    LOADED = 'conversation/LOADED',
    UPDATED = 'conversation/UPDATED',
}

export interface ConversationsProps {
    conversation: string;
    setConversation: (conversation: string) => void;
}

export enum Endpoints {
    CONVERSATIONS = 'conversations',
    MESSAGES = 'messages',
}

export interface ErrorState {
    code?: number;
    fatal?: boolean;
    message?: string;
}

export enum ErrorActions {
    'FATAL' = 'error/FATAL',
}

export interface Message {
    conversation: string;
    edited?: true;
    id: string;
    isUser?: true;
    last_updated: string;
    text: string;
}

export enum MessageActions {
    EDIT = 'messages/EDIT',
    LOADED = 'messages/LOADED',
    SEND = 'messages/SEND',
}

export interface MessageBubbleProps extends Message {
    onClick: (id: string, text: string) => void;
}

export interface MessageState {
    [key: string]: Message[];
}

export interface MessagesProps {
    conversation: string;
}

export interface Options {
    [key: string]: string | number;
    conversation?: string;
    _sort?: string;
}

export interface Store {
    conversations: Conversation[];
    error: ErrorState;
    messages: MessageState;
}

export type StyledProps<Props = unknown> = { theme: Theme } & Props;

export interface TextAreaProps {
    setValue: (value: string) => void;
    value: string;
}

export interface Theme {
    brightBlue: string;
    darkBlue: string;
    lightBlue: string;
}
