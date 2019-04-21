import Users from "../components/UsersListingPage"
import { connect } from "react-redux";
import {
  loadCustomers,
  changeFiltersCustomers
} from "../actions/AdminActions";

const mapStateToProps = state => ({
  users: state.admin.users ? state.admin.users.docs : undefined,
  total: state.admin.users ? state.admin.users.total : undefined,
  page: state.admin.users ? state.admin.users.page : undefined,
  limit: state.admin.users ? state.admin.users.limit : undefined,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { loadCustomers, changeFiltersCustomers }
)(Users);
