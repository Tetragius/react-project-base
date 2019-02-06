import * as React from 'react';
import ExtendedListItem from '.';
import { shallow } from 'enzyme';

test('ExtendedListItem render test', () => {
    const item = { title: "", id: "", type: 0, selected: true };
    const component = shallow(<ExtendedListItem item={item} />);

    expect(component).toMatchSnapshot();
});