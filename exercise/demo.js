const redux = require('redux');
const createStore = redux.createStore;

const actionTypes = {
    add: 'ADD'
}

const initialState = {
    count: 0
}

// reducers
const reducers = {
    [actionTypes.add]: (state, action) => ({ ...state, count: state.count + action.payload })
}

const createReducers = (state = initialState, action) => {

    let newState;

    if (reducers.hasOwnProperty(action.type)) {

        newState = reducers[action.type](state, action);

    }
    else {

        newState = state;

    }

    return newState;

}

// store
const store = createStore(createReducers);
console.log('[createStore]', store.getState());

// subscription
store.subscribe(() => {
    console.log('[subscribe]', store.getState());
});

// dispatchers
store.dispatch({ type: actionTypes.add, payload: 1 });
store.dispatch({ type: actionTypes.add, payload: 5 });
store.dispatch({ type: actionTypes.add, payload: 10 });

console.log('[end]', store.getState());
