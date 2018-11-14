import * as React from 'react';
import SimpleContainer from '.';
import { shallow } from 'enzyme';

test('SimpleContainer render test', () => {
    const component = shallow(<SimpleContainer />);

    expect(component).toMatchSnapshot();
});