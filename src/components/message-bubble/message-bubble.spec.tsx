import React from 'react';
import { shallow } from 'enzyme';
import { MessageBubbleProps as Props } from '../../../types';
import { MessageBubble } from './message-bubble';

describe('MessageBubble', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            conversation: 'convo',
            id: 'id',
            last_updated: 'a long time ago, in a galaxy far away',
            onClick: jest.fn(),
            text: 'text',
        };
    });

    it('should match snapshot for non user message', () => {
        expect(shallow(<MessageBubble {...props} />)).toMatchSnapshot();
    });

    it('should match snapshot for user message (apply correct conditional styles and render edit button)', () => {
        expect(shallow(<MessageBubble {...props} isUser />)).toMatchSnapshot();
    });

    it('should invoke onClick cb with correct arguments on edit button click', () => {
        const wrapper = shallow(<MessageBubble {...props} isUser />);
        wrapper.find({ 'data-test-id': 'edit-button' }).simulate('click');

        expect(props.onClick).toHaveBeenCalledTimes(1);
        expect(props.onClick).toHaveBeenCalledWith('id', 'text');
    });
});
