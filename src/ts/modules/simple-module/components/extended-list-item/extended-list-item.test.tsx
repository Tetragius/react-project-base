import * as React from 'react';
import ExtendedListItem from '.';
import { shallow } from 'enzyme';

test('ExtendedListItem render test', () => {
    const component = shallow(<ExtendedListItem item={null}/>);
    
    expect(component).toMatchSnapshot();
});