import * as React from 'react';
import SimpleContainer from '.';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';

test('SimpleContainer render test', () => {
    const component = shallow(<Provider store={store}><SimpleContainer /></Provider>);

    expect(component).toMatchSnapshot();
});