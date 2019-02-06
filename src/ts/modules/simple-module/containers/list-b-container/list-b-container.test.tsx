import * as React from 'react';
import { ListBContainer } from './list-b-container';
import { shallow } from 'enzyme';
import { ItemType } from '../../interfaces/IItem';

test('ListBContainer render test', () => {
    const items = [
        { id: "1", title: "test 1", type: ItemType.simple },
        { id: "2", title: "test 2", type: ItemType.extended },
        { id: "3", title: "test 3", type: ItemType.expandable, body: 'test test tset test test test test' },
        { id: "4", title: "test 4", type: ItemType.simple },
        { id: "5", title: "test 5", type: ItemType.extendedExpandable, body: 'test test test test test test test test test test', footer: 'test test test test test test test test test test' },
        { id: "6", title: "test 6", type: ItemType.extended },
        { id: "7", title: "test 7", type: ItemType.extended },
        { id: "8", title: "test 8", type: ItemType.extended },
        { id: "9", title: "test 9", type: ItemType.extended },
        { id: "10", title: "test 10 with validation", type: ItemType.validate, body: 'valid if it over then 10 letters', footer: 'test test test test test test test test test test' },
        { id: "11", title: "test 11 with validation", type: ItemType.validate, body: 'valid if it over then 10 letters', footer: 'test test test test test test test test test test' },
    ]
    const props = { list: { items } } as any;
    const component = shallow(<ListBContainer {...props} />);

    expect(component).toMatchSnapshot();
});