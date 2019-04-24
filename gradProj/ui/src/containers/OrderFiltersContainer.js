import OrderFilters from "../components/OrdersFilters";
import { changeFiltersBookings } from "../actions/OrderHistoryActions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersBookings }
)(OrderFilters);
