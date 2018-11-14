import * as React from 'react';
import MainContainer from '.';
import { shallow } from 'enzyme';

test('MainContainer render test', () => {
    const component = shallow(<MainContainer />);

    expect(component).toMatchSnapshot();
});