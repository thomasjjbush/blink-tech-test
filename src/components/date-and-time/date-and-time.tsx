import React, { FC, ReactElement } from 'react';
import { formatDate } from '../../utils/format-date/format-date';
import * as Styled from './date-and-time-style';

export const DateAndTime: FC = ({ children }: { children: string }): ReactElement => {
    return <Styled.Date>{formatDate(children)}</Styled.Date>;
};
