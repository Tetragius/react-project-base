import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter } from 'react-router';
import { TopContainer, LeftContainer, CenterContainer } from '..';
//import "./style.scss";

interface IMainContainerProps {}

interface IMainContainerState {}

class MainContainer extends BaseContainer<IMainContainerProps, IMainContainerState>{

    constructor(props){
        super(props);
    }

    view(children){
        return (
            <div className="main-container">
                <TopContainer />
                <LeftContainer />
                <CenterContainer />
            </div>
        );
    }
}

export default withRouter(MainContainer);