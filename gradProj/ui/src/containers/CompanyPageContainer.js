import { connect } from "react-redux";
import CompanyPage from "../components/CompanyPage";
import { loadCompany } from "../actions/CompanyActions";
import { chooseCompany } from "../actions/CreateOrderActions";
import { blockCompany, unblockCompany } from "../actions/AdminActions";
import { reviewCompany } from "../actions/ReviewsActions";

const mapStateToProps = state => ({
  role: state.profileReducer.role,
  company: state.company,
  toc: state.company.typesOfCleaning
});

export default connect(
  mapStateToProps,
  { loadCompany, chooseCompany, blockCompany, unblockCompany, reviewCompany }
)(CompanyPage);
