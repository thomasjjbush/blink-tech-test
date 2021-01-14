import React, { FC, ReactElement } from 'react';
import * as Styled from './error-style';
import { ErrorState as Props } from '../../../types';

export const Error: FC<Props> = ({ code, message }: Props): ReactElement => (
    <Styled.Error>
        <h1>{code}</h1>
        <p>{message}</p>
    </Styled.Error>
);
