import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
import FormContainer from '../form-container';
import './style.scss';
import { ErrorComponent } from '../../../../components';
import { connect } from 'react-redux';
import IList from '../../interfaces/IList';
import ListContainer from '../list-container';

interface ISimpleContainerProps {
    list: IList;
 }

interface ISimpleContainerState { }

class SimpleContainer extends BaseContainer<ISimpleContainerProps, ISimpleContainerState>{

    constructor(props) {
        super(props);
    }

    view(children) {

        const props = this.props;

        return (
            <div className="simple-container" >
                <FormContainer>
                    <ListContainer list={props.list}/>
                </FormContainer>
                {/* <FormContainer>
                    <ErrorComponent />
                </FormContainer> */}
            </div>
        );
    }
}

export default connect((state) => ({list: state['simple-module'].list}))(withRouter(SimpleContainer));