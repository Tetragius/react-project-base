import * as React from 'react';
import SimpleComponet from '.';
import { shallow } from 'enzyme';

test('SimpleComponent render test', () => {
    const component = shallow(<SimpleComponet />);
    
    expect(component).toMatchSnapshot();
});