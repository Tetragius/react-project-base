import * as React from 'react';
import ExtendedExpandableListItem from '.';
import { shallow } from 'enzyme';
import { Subject } from 'rxjs';

test('ExtendedExpandableListItem render test', () => {
    const item = { id: "", type: 0, title: "", selected: true };
    const component = shallow(<ExtendedExpandableListItem item={item} stream={new Subject()} />);

    expect(component).toMatchSnapshot();
});