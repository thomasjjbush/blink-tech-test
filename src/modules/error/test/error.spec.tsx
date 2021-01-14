import React from 'react';
import { shallow } from 'enzyme';
import { Error } from '../error';

describe('Error', () => {
    it('should match snapshot', () => {
        expect(shallow(<Error code={3000} message="hullo wurld" />)).toMatchSnapshot();
    });
});
