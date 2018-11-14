import * as React from 'react';
import TopContainer from '.';
import { shallow } from 'enzyme';

test('TopContainer render test', () => {
    const component = shallow(<TopContainer />);

    expect(component).toMatchSnapshot();
});