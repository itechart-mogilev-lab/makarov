import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { companyLoaded, LOAD_COMPANY } from "../actions/CompanyActions";
import { returnErrors } from "../actions/ErrorsAndEventsActions";

export function* watchLoadCompanySaga() {
  yield takeLatest(LOAD_COMPANY, function*({ payload }) {
    try {
      const response = yield call(axios.get, `/companies/${payload}`);
      yield put(companyLoaded(response.data));
    } catch (error) {
      yield put(returnErrors(error));
    }
  });
}