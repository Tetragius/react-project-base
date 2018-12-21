import * as React from 'react';
import { ListBContainer } from './list-b-container';
import { shallow } from 'enzyme';

test('ListBContainer render test', () => {
    const props = { list: { items: [] } } as any;
    const component = shallow(<ListBContainer {...props} />);

    expect(component).toMatchSnapshot();
});