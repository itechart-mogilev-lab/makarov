import { connect } from "react-redux";
import {
  loadCompanies,
  changeFiltersCompanies
} from "../actions/FilterAndLoadAction";
import MainPageCompanies from "../components/MainPageCompanies";


const mapStateToProps = state => ({
  companies: state.companies.docs,
  total: state.companies.total,
  page: state.companies.page,
  limit: state.companies.limit,
  search: state.router.location.search,
  pathname: state.router.location.pathname
});

const MainPageCompaniesContainer = connect(
  mapStateToProps,
  { loadCompanies, changeFiltersCompanies }
)(MainPageCompanies);

export default MainPageCompaniesContainer;