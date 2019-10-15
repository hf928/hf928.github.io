import {
    call,
    put,
    takeLatest,
    all
} from 'redux-saga/effects';

import { getMemberAuthData } from '../../utility/services';
import { UPDATE_MEMBER_AUTH_DATA } from '../actions/actionTypes';
import { updateTopHeaderData } from '../actions/auth';

function* updateMemberAuthData () {

    let res = {};

    try {

        res = yield call(getMemberAuthData);
        const data = res.data;

        let authData = {};

        // 如果登入了, 要更新一些 memeber 的資訊
        if (data.member_profile.is_login) {

            authData = {
                memberEmail: data.member_profile.email,
                memberName: data.member_profile.name,
                isLogin: data.member_profile.is_login
            };

        }

        yield put(updateTopHeaderData(authData));

    }
    catch (e) {

        yield put({ type: 'USER_FETCH_FAILED', payload: e.message });

    }


}

function* watchAuth () {

    yield all([
        takeLatest(UPDATE_MEMBER_AUTH_DATA, updateMemberAuthData),
    ]);

}

export default watchAuth;
