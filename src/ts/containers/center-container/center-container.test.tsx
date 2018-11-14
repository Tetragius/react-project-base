import * as React from 'react';
import CenterContainer from '.';
import { shallow } from 'enzyme';

test('CenterContainer render test', () => {
    const component = shallow(<CenterContainer />);

    expect(component).toMatchSnapshot();
});