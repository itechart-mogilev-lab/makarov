import OrdersHistory from "../components/OrdersHistory";
import {
  loadBookings,
  changeFiltersBookings
} from "../actions/OrderHistoryActions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  bookings: state.profileReducer.bookings
    ? state.profileReducer.bookings.docs
    : undefined,
  total: state.profileReducer.bookings
    ? state.profileReducer.bookings.total
    : undefined,
  page: state.profileReducer.bookings
    ? state.profileReducer.bookings.page
    : undefined,
  limit: state.profileReducer.bookings
    ? state.profileReducer.bookings.limit
    : undefined,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { loadBookings, changeFiltersBookings }
)(OrdersHistory);
