import * as React from 'react';
import FormContainer from '.';
import { shallow } from 'enzyme';

test('FormContainer render test', () => {
    const component = shallow(<FormContainer />);

    expect(component).toMatchSnapshot();
});