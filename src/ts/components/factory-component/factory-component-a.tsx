import Factory from "../../services/factory";
import * as React from 'react';
import Example from "./example";

const initialState = {
    value: 'test'
};

const mapStateToProps = state => ({
    value: state.value
});

const actions = {
    action_one: {
        action: function () { this('test A') },
        reducer: (state, action) => (state.value = action.payload, { ...state })
    },
    action_two: {
        action: function (value) { this(value) },
        reducer: (state, action) => (state.value = action.payload, { ...state })
    },
}

export const { component, actionList } = Factory.connect(
    <Example />,
    mapStateToProps,
    actions,
    initialState
);

const FactoryComponentA = component;

export default FactoryComponentA;