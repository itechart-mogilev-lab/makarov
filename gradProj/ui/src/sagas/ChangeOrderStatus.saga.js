import axios from "axios";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  ACCEPT_BOOK,
  bookAccepted,
  CANCEL_BOOK,
  bookCanceled,
  CONFIRM_BOOK,
  bookConfirmed
} from "../actions/CreateOrderActions";
import { loadBookings } from "../actions/OrderHistoryActions";
import { returnErrors, returnEvent } from "../actions/ErrorsAndEventsActions";
import { getAuthHeader } from "../services/jwtHeader";

export function* watchCancelBook() {
  yield takeLeading(CANCEL_BOOK, function*({ payload }) {
    try {
      const { orderId, query} = payload;

      const headers = getAuthHeader();
      yield call(
        axios.put,
        "/orders/setStatusCanceled",
        { orderId},
        {
          headers
        }
      );

      yield put(bookCanceled());
      yield put(loadBookings(query));
      yield put(returnEvent("The book is canceled"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchAcceptBook() {
  yield takeLeading(ACCEPT_BOOK, function*({ payload }) {
    try {
      const { orderId, query } = payload;

      const headers = getAuthHeader();
      yield call(
        axios.put,
        "/orders/setStatusAccepted",
        { orderId },
        {
          headers
        }
      );

      yield put(bookAccepted());
      yield put(loadBookings(query));
      yield put(returnEvent("The book is accepted"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}

export function* watchConfirmBook() {
  yield takeLeading(CONFIRM_BOOK, function*({ payload }) {
    try {
      const { orderId, query } = payload;

      const headers = getAuthHeader();
      yield call(
        axios.put,
        "/orders/setStatusDone",
        { orderId },
        {
          headers
        }
      );

      yield put(bookConfirmed());
      yield put(loadBookings(query));
      yield put(returnEvent("The book is confirmed"));
    } catch (error) {
      yield put(returnErrors(error.response.data));
    }
  });
}
