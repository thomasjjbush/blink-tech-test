import React from 'react';
import { shallow } from 'enzyme';
import { Loading } from './loading';

describe('Loading', () => {
    it('should match snapshot', () => {
        expect(shallow(<Loading />)).toMatchSnapshot();
    });
});
