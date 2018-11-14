import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter } from 'react-router';
import './style.scss';

interface ITopContainerProps { }

interface ITopContainerState { }

class TopContainer extends BaseContainer<ITopContainerProps, ITopContainerState>{

    constructor(props) {
        super(props);
    }

    view(children) {
        return (
            <div className="top-container" >
                {children}
            </div>
        );
    }
}

export default withRouter(TopContainer);