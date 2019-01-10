import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
import FormContainer from '../form-container';
////import './style.scss';
import { connect } from 'react-redux';
import IList from '../../interfaces/IList';
import ListContainer from '../list-container';
import ListBContainer from '../list-b-container';
import manifest from '../../../simple-module/manifest';

interface ISimpleContainerProps {
    list: IList;
    listB: IList;
    loading: boolean;
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
                <FormContainer hidden={props.loading}>
                    <ListContainer list={props.list} />
                    <ListBContainer list={props.listB} />
                </FormContainer>
                <FormContainer hidden={!props.loading}>
                    <div className="loader">Loading...</div>
                </FormContainer>
            </div>
        );
    }
}

const mapper = (state: any): ISimpleContainerProps => {
    return {
        list: state[manifest.name].list,
        listB: state[manifest.name].listB,
        loading: state[manifest.name].loading
    }
}

export default connect(mapper)(withRouter(SimpleContainer));
