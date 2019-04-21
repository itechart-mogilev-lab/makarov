import Drawer from "../components/Drawer";
import { connect } from "react-redux";
import { changeFiltersCompanies } from "../actions/FilterAndLoadAction";
import { logOut } from "../actions/UserActions";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname,
  role: state.profileReducer.role
});

const DrawerContainer = connect(
  mapStateToProps,
  { changeFiltersCompanies, logOut }
)(Drawer);

export default DrawerContainer;
