import React, { FC, ReactElement } from 'react';
import * as Styled from './loading-style';

export const Loading: FC = (): ReactElement => (
    <Styled.Loading>
        <Styled.Img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
    </Styled.Loading>
);
