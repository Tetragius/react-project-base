import * as React from 'react';
import ListContainer from '.';
import { shallow } from 'enzyme';

test('ListContainer render test', () => {
    const component = shallow(<ListContainer />);

    expect(component).toMatchSnapshot();
});