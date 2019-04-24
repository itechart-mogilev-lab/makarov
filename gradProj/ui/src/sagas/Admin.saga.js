import axios from "axios";
import { parse, stringify } from "query-string";
import {
  call,
  put,
  takeLatest,
  takeEvery,
  takeLeading
} from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  customersLoaded,
  LOAD_CUSTOMERS,
  CHANGE_FILTERS_CUSTOMERS,
  loadCustomers,
  BLOCK_CUSTOMER,
  customerBlocked,
  UNBLOCK_CUSTOMER,
  customerUnblocked,
  BLOCK_COMPANY,
  companyBlocked,
  UNBLOCK_COMPANY,
  companyUnblocked
} from "../actions/AdminActions";
import { returnErrors, returnEvent } from "../actions/ErrorsAndEventsActions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchLoadCustomersSaga() {
  yield takeLatest(LOAD_CUSTOMERS, function*({ payload }) {
    try {
      const query = payload;
      const headers = yield call(getAuthHeader);
      const response = yield call(axios.get, `/account?${query}`, {
        headers
      });
      yield put(customersLoaded(response.data));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchChangeFiltersCustomersSaga() {
  yield takeEvery(CHANGE_FILTERS_CUSTOMERS, function*({ payload }) {
    try {
      const { name, value, path } = payload;
      let query = parse(payload.query);

      if (name) {
        query[`${name}`] = value;
      }

      yield put(push(`${path}?${stringify(query)}`));
      yield put(loadCustomers(stringify(query)));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchBlockCustomer() {
  yield takeLeading(BLOCK_CUSTOMER, function*({ payload }) {
    try {
      const { customerId, query } = payload;

      const headers = getAuthHeader();
      yield call(axios.put, `/account/ban/${customerId}`, payload, {
        headers
      });

      yield put(customerBlocked(payload));
      yield put(loadCustomers(query));
      yield put(returnEvent("The customer is blocked"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchUnblockCustomer() {
  yield takeLeading(UNBLOCK_CUSTOMER, function*({ payload }) {
    try {
      const { customerId, query } = payload;

      const headers = getAuthHeader();
      yield call(axios.put, `/account/unban/${customerId}`, payload, {
        headers
      });

      yield put(customerUnblocked());
      yield put(loadCustomers(query));
      yield put(returnEvent("The customer is unblocked"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchBlockCompany() {
  yield takeLeading(BLOCK_COMPANY, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(
        axios.put,
        `/companies/ban/${payload.companyId}`,
        payload,
        { headers }
      );

      yield put(companyBlocked(payload));
      yield put(returnEvent("The company is blocked"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchUnblockCompany() {
  yield takeLeading(UNBLOCK_COMPANY, function*({ payload }) {
    try {
      const headers = getAuthHeader();
      yield call(
        axios.put,
        `/companies/unban/${payload.companyId}`,
        payload,
        { headers }
      );

      yield put(companyUnblocked());
      yield put(returnEvent("The company is unblocked"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
