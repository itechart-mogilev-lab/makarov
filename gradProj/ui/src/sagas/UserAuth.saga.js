import {
  LOGOUT,
  userSignInSuccess,
  userSignInNeedConfirm,
  CONFIRM_USER,
  USER_SIGN_IN,
  USER_SIGNUP,
  userSignUpSuccess,
  logOutSuccess,
  EDIT_USER,
  userEdited,
  CHANGE_PASSWORD_USER,
  userPasswordChanged,
  AUTH_SOCIAL
} from "../actions/UserActions";
import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { storeToken, clearToken } from "../auth";
import { returnErrors } from "../actions/ErrorsAndEventsActions";
import { push } from "connected-react-router";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchUserSignInSaga() {
  yield takeLeading(USER_SIGN_IN, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/account/signin", payload);
      
      if (!response.data.confirmed) {
        yield put(userSignInNeedConfirm(payload.username));
        yield take(CONFIRM_USER);
      } else {
        const { token, ...user } = response.data;

        yield put(userSignInSuccess({ token, user }));
        yield call(storeToken, response.data);
        yield put(push("/"));

        yield take(LOGOUT);
      }
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
    // yield put(push("/")); // Редирект
  });
}

export function* watchUserSignUpSaga() {
  yield takeLeading(USER_SIGNUP, function*({ payload }) {
    try {
      yield call(axios.post, "/account/register", payload);
      yield put(userSignUpSuccess(payload.username));
      yield put(push("/"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchSignOutSaga() {
  yield takeEvery(LOGOUT, function*() {
    try {
      yield call(clearToken);
      yield put(logOutSuccess());
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchEditUser() {
  yield takeLeading(EDIT_USER, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, '/account/edit', payload, {headers});

      yield put(userEdited(payload));
      yield put(push('/profile'))
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchChangePasswordUser() {
  yield takeLeading(CHANGE_PASSWORD_USER, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, '/account/editPassword', payload, {headers});

      yield put(userPasswordChanged());
      yield put(push('/profile'))
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchAuthSocial() {
  yield takeLeading(AUTH_SOCIAL, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/account/google", {
        access_token: payload.accessToken
      });

      yield call(storeToken, {
        token: response.data.token,
        ...response.data.user
      });

      yield put(
        userSignInSuccess({
          token: response.data.token,
          user: response.data.user
        })
      );
      yield push("/profile");
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
