/* eslint-disable no-prototype-builtins */
export default (reducers) => (initialState) => (state = initialState, action) => {

    let newState;

    if (reducers.hasOwnProperty(action.type)) {

        newState = reducers[action.type](state, action);

    }
    else {

        newState = state;

    }

    return newState;

};
