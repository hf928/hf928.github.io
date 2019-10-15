import { INIT, UPDATE_MEMBER_AUTH_DATA } from './actionTypes';

// ACTIONS
export const updateTopHeaderData = (data) => ({
    type: INIT,
    payload: data
});

export const updateMemberAuthData = (data) => ({
    type: UPDATE_MEMBER_AUTH_DATA,
    payload: {
        postData: data
    }
});
