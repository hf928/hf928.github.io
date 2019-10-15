/* eslint no-underscore-dangle: 0 */

import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import reducers from './reducers';

const rootReducer = combineReducers(reducers);

const bindMiddleware = (middleware) => {

    if (process.env.NODE_ENV !== 'production') {

        const { composeWithDevTools } = require('redux-devtools-extension');

        return composeWithDevTools(applyMiddleware(...middleware));

    }

    return applyMiddleware(...middleware);

};

function configureStore (initialState = (global.window ? global.window.__NEXT_DATA__.props.initialReduxState : {})) {

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;

}

export default configureStore;
