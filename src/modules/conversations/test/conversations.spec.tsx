import React from 'react';
import { mount, shallow } from 'enzyme';
import { Conversations } from './../conversations';
import { loadConversations } from './../conversations-redux';
import { ConversationsProps as Props } from '../../../../types';

const conversations = [
    {
        id: '423',
        last_updated: new Date('Jan 1, 1970'),
        name: 'peter griffin',
    },
    {
        id: '5453',
        last_updated: new Date('Jan 2, 1970'),
        name: 'grandma',
    },
];

jest.mock('react-redux', () => ({
    useDispatch: jest.fn().mockReturnValue(jest.fn()),
    useSelector: jest.fn((cb) => cb({ conversations })),
}));

jest.mock('./../conversations-redux', () => ({ loadConversations: jest.fn().mockReturnValue('loadConversations') }));

describe('Conversation', () => {
    let props: Props;

    beforeEach(() => {
        jest.clearAllMocks();
        props = {
            conversation: '423',
            setConversation: jest.fn(),
        };
    });

    it('should match snapshot and apply correct conditional styles to conversation button', () => {
        expect(shallow(<Conversations {...props} />)).toMatchSnapshot();
    });

    it('should sort the items into the correct order of oldest first', () => {
        const wrapper = shallow(<Conversations {...props} />);
        const names = wrapper.find({ 'data-test-id': 'conversation-name' });

        expect(names.first().text()).toBe('grandma');
        expect(names.last().text()).toBe('peter griffin');
    });

    it('should invoke setConversation prop on button click with correct id', () => {
        const wrapper = shallow(<Conversations {...props} />);
        const buttons = wrapper.find({ type: 'button' });

        buttons.first().simulate('click');

        expect(props.setConversation).toHaveBeenCalledTimes(1);
        expect(props.setConversation).toHaveBeenCalledWith('5453');
    });

    it('should loadConversations on mount', async () => {
        mount(<Conversations {...props} />);

        expect(loadConversations).toHaveBeenCalledTimes(1);
        expect(loadConversations).toHaveBeenCalledWith();
    });
});
