import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
//import './style.scss';

interface IFormContainerProps { }

interface IFormContainerState { }

class FormContainer extends BaseContainer<IFormContainerProps, IFormContainerState>{

    constructor(props) {
        super(props);
    }

    view() {
        return (
            <div className="form-container" >
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(FormContainer);