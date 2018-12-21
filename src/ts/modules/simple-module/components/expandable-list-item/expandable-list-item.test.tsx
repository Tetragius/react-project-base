import * as React from 'react';
import ExpandableListItem from '.';
import { shallow } from 'enzyme';
import { Subject } from 'rxjs';

test('ExtendedListItem render test', () => {
    const item = { id: "", type: 0, title: "", selected: true };
    const component = shallow(<ExpandableListItem item={item} stream={new Subject()} />);

    expect(component).toMatchSnapshot();
});