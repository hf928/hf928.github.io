import baseReducer from '../reducer.base';
import { INIT } from '../actions/actionTypes';

export const initialState = {
    memberEmail: '',
    memberName: '',
    isLogin: false,
    admin: {},
};

// REDUCERS
const reducers = {
    [INIT]: (state, action) => {

        const newState = {
            // IMMUTABLE
            ...state,
        };

        if (action.payload) {

            action.payload.admin && (newState.admin = action.payload.admin);
            action.payload.isLogin && (newState.isLogin = action.payload.isLogin);
            action.payload.memberName && (newState.memberName = action.payload.memberName);
            action.payload.memberEmail && (newState.memberEmail = action.payload.memberEmail);

        }

        return newState;

    }
};

export const reducer = baseReducer(reducers)(initialState);
