import * as React from 'react';
import SimpeContainer from './containers/simple-container';

export { default as reducer } from './redux/reducer';
export { default as StoreService } from "./services/store-service";

export class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SimpeContainer />
        )
    }
}