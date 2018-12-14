import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
import FormContainer from '../form-container';
import './style.scss';
import { connect } from 'react-redux';
import IList from '../../interfaces/IList';
import ListContainer from '../list-container';
import manifest from '../../manifest';

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
                    <ListContainer list={props.list} />
                </FormContainer>
            </div>
        );
    }
}

const mapper = (state: any): ISimpleContainerProps => {
    return {
        list: state[manifest.name].list
    }
}

export default connect(mapper)(withRouter(SimpleContainer));
