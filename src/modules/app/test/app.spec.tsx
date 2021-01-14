import React from 'react';
import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';
import { App } from '../app';
import { Conversations } from '../../conversations/conversations';
import { Error } from '../../error/error';

jest.mock('react-redux', () => ({ useSelector: jest.fn((cb) => cb({ error: {} })) }));

describe('App', () => {
    it('should match snapshot when conversation has not been selected', () => {
        expect(shallow(<App />)).toMatchSnapshot();
    });

    it('should match snapshot when conversation has been selected', () => {
        const wrapper = shallow(<App />);
        wrapper.find(Conversations).prop('setConversation')('conversation-id');

        expect(wrapper).toMatchSnapshot();
    });

    it('should return fatal error UI if fatal error exists in store', () => {
        (useSelector as jest.Mock).mockImplementationOnce((cb) => cb({ error: { code: 6, fatal: true, message: '' } }));
        const wrapper = shallow(<App />).find(Error);

        expect(wrapper.prop('code')).toBe(6);
        expect(wrapper.prop('message')).toBe('');
    });
});
