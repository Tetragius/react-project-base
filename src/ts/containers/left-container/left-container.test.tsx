import * as React from 'react';
import LeftContainer from '.';
import { shallow } from 'enzyme';

test('LeftContainer render test', () => {
    const component = shallow(<LeftContainer />);

    expect(component).toMatchSnapshot();
});