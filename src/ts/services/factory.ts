import * as React from 'react';
import { createAction } from 'redux-actions';
import { Guid } from './guid';
import { handleActions } from 'redux-actions';
import { Store } from 'redux';
import { connect } from 'react-redux';

import { injectAsyncReducer } from '../redux/store';
import { actionList } from '../components/factory-component/factory-component-a';

interface IFactoryResult<P, S, A> {
    component: React.ComponentClass<P, S>;
    actionList: A;
}

export default class Factory {
    static store: Store;

    public static connect = <CProps = any, CState = any, RState = any, A = any>(component, propsMapper, actions, initialState, prefix = (new Guid().toString())): IFactoryResult<CProps, CState, A> => {
        const { _actions, actionTypes } = Factory.buildActions(actions, prefix, initialState);
        return {
            component: connect<RState, null, CProps, CState >(state => Factory.mapper(propsMapper(state[prefix]), _actions))(
                class <CProps, CState> extends React.Component<CProps, CState> {
                    constructor(props) { super(props) }
                    render() { return React.cloneElement(component, { ...this.props as any }, this.props.children) }
                }),
            actionList: actionTypes as A
        }
    }

    private static mapper = (props, actions) => ({ ...props, actions: { ...actions } });

    private static buildActions(actions, prefix, initialState) {
        let _actionTypes = {};
        let _actions = {};
        let _preReducer = {};
        let _reducer = null;

        for (let action in actions) {
            let _action = createAction(`${prefix}_${action}`.toUpperCase());
            _actionTypes[action] = _action;
            _preReducer[_action(null).type] = actions[action].reducer;
            let dispatch = (payload) => Factory.store.dispatch(_action(payload));
            actions[action].action = actions[action].action.bind(dispatch);
            _actions[action] = actions[action].action;
        }

        _reducer = handleActions(_preReducer, initialState);
        injectAsyncReducer(prefix, _reducer);

        return { actions, _actions, actionTypes: _actionTypes };

    }
}