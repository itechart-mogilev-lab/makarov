import OrdersSort from "../components/OrdersSort";
import { connect } from "react-redux";
import { changeFiltersBookings } from "../actions/OrderHistoryActions";

const mapStateToProps = state => ({
  bookings: state.profileReducer.bookings
    ? state.profileReducer.bookings.docs
    : undefined,
  search: state.profileReducer.bookings
    ? state.router.location.search
    : undefined,
  pathname: state.profileReducer.bookings
    ? state.router.location.pathname
    : undefined
});

export default connect(
  mapStateToProps,
  { changeFiltersBookings }
)(OrdersSort);
