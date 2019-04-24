import { spawn } from "redux-saga/effects";
import {
  watchUserSignInSaga,
  watchUserSignUpSaga,
  watchSignOutSaga,
  watchEditUser,
  watchChangePasswordUser,
  watchAuthSocial
} from "./UserAuth.saga";
import {
  watchExecutorSignInSaga,
  watchExecutorSignUpSaga,
  watchEditMainInfoExecutor,
  watchChangePasswordExecutor,
  watchEditTOCExecutor
} from "./CompanyAuth.saga";
import {
  watchLoadCompaniesSaga,
  watchChangeFiltersCompaniesSaga
} from "./FilterAndLoad.saga";
import { watchLoadCompanySaga } from "./ViewCompany.saga";
import {
  watchChooseCompany,
  watchResetSelectedCompany,
  watchBookCleaning,
  watchCalculateTimePrice,
  watchLookOffers
} from "./CreateOrder.saga";
import {
  watchLoadBookingsSaga,
  watchChangeFiltersBookingsSaga
} from "./ViewOrders.saga";
import {
  watchAcceptBook,
  watchCancelBook,
  watchConfirmBook
} from "./ChangeOrderStatus.saga";
import {
  watchBlockCompany,
  watchBlockCustomer,
  watchUnblockCompany,
  watchUnblockCustomer,
  watchLoadCustomersSaga,
  watchChangeFiltersCustomersSaga
} from "./Admin.saga";
import {
  watchLoadReviews,
  watchLoadMoreReviews,
  watchReviewCompany
} from "./ReviewSaga";

export default function*() {
  yield spawn(watchUserSignInSaga);
  yield spawn(watchExecutorSignInSaga);
  yield spawn(watchAuthSocial);
  yield spawn(watchUserSignUpSaga);
  yield spawn(watchExecutorSignUpSaga);
  yield spawn(watchLoadCompaniesSaga);
  yield spawn(watchChangeFiltersCompaniesSaga);
  yield spawn(watchSignOutSaga);
  yield spawn(watchEditUser);
  yield spawn(watchChangePasswordUser);
  yield spawn(watchEditMainInfoExecutor);
  yield spawn(watchChangePasswordExecutor);
  yield spawn(watchEditTOCExecutor);

  yield spawn(watchLoadCompanySaga);
  yield spawn(watchChooseCompany);
  yield spawn(watchResetSelectedCompany);
  yield spawn(watchBookCleaning);
  yield spawn(watchCalculateTimePrice);
  yield spawn(watchLookOffers);
  yield spawn(watchLoadBookingsSaga);
  yield spawn(watchChangeFiltersBookingsSaga);

  yield spawn(watchAcceptBook);
  yield spawn(watchCancelBook);
  yield spawn(watchConfirmBook);

  yield spawn(watchBlockCompany);
  yield spawn(watchBlockCustomer);
  yield spawn(watchUnblockCompany);
  yield spawn(watchUnblockCustomer);
  yield spawn(watchLoadCustomersSaga);
  yield spawn(watchChangeFiltersCustomersSaga);

  yield spawn(watchLoadReviews);
  yield spawn(watchLoadMoreReviews);
  yield spawn(watchReviewCompany);
}
