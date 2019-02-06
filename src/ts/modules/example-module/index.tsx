import * as React from 'react';
import SimpeContainer from './containers/simple-container';

export class main extends React.Component {

    render() {
        return (
            <SimpeContainer />
        )
    }
}

export { default as reducer } from './redux/reducer';
export { default as StoreService } from "./services/store-service";
export { default as manifest } from "./manifest";