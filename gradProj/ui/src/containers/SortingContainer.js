import Sorting from "../components/Sorting";
import { changeFiltersCompanies } from "../actions/FilterAndLoadAction";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  companies: state.companies.docs,
  total: state.companies.total,
  page: state.companies.page,
  limit: state.companies.limit,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

const SortingContainer = connect(
  mapStateToProps,
  { changeFiltersCompanies }
)(Sorting);

export default SortingContainer;
