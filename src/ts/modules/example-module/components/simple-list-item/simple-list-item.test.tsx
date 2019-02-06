import * as React from 'react';
import SimpleListItem from '.';
import { shallow } from 'enzyme';

test('SimpleListItem render test', () => {
    const item = { title: "", id: "", type: 0 }
    const component = shallow(<SimpleListItem item={item} />);

    expect(component).toMatchSnapshot();
});