import Filter from "../components/Filter";
import { connect } from "react-redux";
import { changeFiltersCompanies } from "../actions/FilterAndLoadAction";

const mapStateToProps = state => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

const FilterContainer = connect(
  mapStateToProps,
  { changeFiltersCompanies }
)(Filter);

export default FilterContainer;
