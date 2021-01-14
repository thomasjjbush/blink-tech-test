import React from 'react';
import { shallow } from 'enzyme';
import { DateAndTime } from './date-and-time';

describe('DateAndTime', () => {
    it('should match snapshot', () => {
        expect(shallow(<DateAndTime>{new Date(null).toString()}</DateAndTime>)).toMatchSnapshot();
    });

    it('should be null render if children resolves to false', () => {
        expect(shallow(<DateAndTime>{null}</DateAndTime>).isEmptyRender()).toBe(true);
    });
});
