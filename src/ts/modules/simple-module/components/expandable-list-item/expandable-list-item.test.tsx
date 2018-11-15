import * as React from 'react';
import ExpandableListItem from '.';
import { shallow } from 'enzyme';

test('ExtendedListItem render test', () => {
    const component = shallow(<ExpandableListItem item={null}/>);
    
    expect(component).toMatchSnapshot();
});