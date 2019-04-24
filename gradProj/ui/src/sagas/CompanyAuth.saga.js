import {
  SIGNIN_EXECUTOR,
  CONFIRM_EXECUTOR,
  executorSignInNeedConfirm,
  executorSignInSuccess,
  SIGNUP_EXECUTOR,
  executorSignUpSuccess,
  EDIT_MAIN_INFO_EXECUTOR,
  executorMainInfoEdited,
  EDIT_TOC_EXECUTOR,
  executorTypesOfCleaningEdited,
  CHANGE_PASSWORD_EXECUTOR,
  executorPasswordChanged
} from "../actions/CompanyActions";
import { LOGOUT, logOutSuccess } from "../actions/UserActions";
import { call, put, take, takeLeading, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { storeToken, clearToken } from "../auth";
import { returnErrors } from "../actions/ErrorsAndEventsActions";
import { push } from "connected-react-router";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchExecutorSignInSaga() {
  yield takeLeading(SIGNIN_EXECUTOR, function*({ payload }) {
    try {
      const response = yield call(axios.post, "/companies/signin", payload);

      if (!response.data.confirmed) {
        yield put(executorSignInNeedConfirm());
        yield take(CONFIRM_EXECUTOR);
      } else {
        const { token, ...user } = response.data;

        yield put(executorSignInSuccess({ token, user }));
        yield call(storeToken, response.data);
        yield put(push("/"));
        yield take(LOGOUT);
      }
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchExecutorSignUpSaga() {
  yield takeLeading(SIGNUP_EXECUTOR, function*({ payload }) {
    try {
      yield call(axios.post, "/companies/register", payload);
      yield put(executorSignUpSuccess());
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
    //yield put(push("/"));
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

//////////////////////////////////////////////

export function* watchEditMainInfoExecutor() {
  yield takeLeading(EDIT_MAIN_INFO_EXECUTOR, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/companies/edit", payload, { headers });

      yield put(executorMainInfoEdited(payload));
      yield put(push("/profile"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchEditTOCExecutor() {
  yield takeLeading(EDIT_TOC_EXECUTOR, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      const response = yield call(
        axios.put,
        "/companies/edit/typesOfCleaning",
        payload,
        {
          headers
        }
      );

      yield put(executorTypesOfCleaningEdited(response.data));
      yield put(push("/profile"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchChangePasswordExecutor() {
  yield takeLeading(CHANGE_PASSWORD_EXECUTOR, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(axios.put, "/companies/edit/editPassword", payload, {
        headers
      });

      yield put(executorPasswordChanged());
      yield put(push("/profile"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
