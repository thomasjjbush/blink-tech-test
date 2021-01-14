import React, { FC, lazy, ReactElement, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/loading/loading';
import { Conversations } from '../conversations/conversations';
import { Error } from '../error/error';
import { ErrorState, Store } from '../../../types';
import * as Styled from './app-style';

const Messages = lazy(() => import('../messages/messages').then((module) => ({ default: module.Messages })));

export const App: FC = (): ReactElement => {
    const error = useSelector<Store, ErrorState>((state) => state.error);
    const [conversation, setConversation] = useState<string>(null);

    if (error.fatal) return <Error code={error.code} message={error.message} />;

    return (
        <Styled.App>
            <Conversations conversation={conversation} setConversation={setConversation} />
            {conversation && (
                <Suspense fallback={<Loading />}>
                    <Messages conversation={conversation} />
                </Suspense>
            )}
        </Styled.App>
    );
};
