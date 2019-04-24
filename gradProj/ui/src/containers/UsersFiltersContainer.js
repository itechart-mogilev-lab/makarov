import UsersFilters from "../components/UsersFilters";
import { connect } from "react-redux";
import { changeFiltersCustomers } from "../actions/AdminActions";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { changeFiltersCustomers }
)(UsersFilters);
