import * as React from 'react';
import SimpleListItem from '.';
import { shallow } from 'enzyme';

test('SimpleListItem render test', () => {
    const component = shallow(<SimpleListItem item={null} />);
    
    expect(component).toMatchSnapshot();
});