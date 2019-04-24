import { connect } from "react-redux";
import CompanySignUp from "../components/CompanySignUp"
import { executorSignUp } from "../actions/CompanyActions";
import { clearErrors } from "../actions/ErrorsAndEventsActions";

const mapStateToProps = state => ({
  isSended: state.profileReducer.isSended,
  error: state.eventsAndErrors.message
});

const CompanySignUpContainer = connect(
  mapStateToProps,
  { executorSignUp, clearErrors }
)(CompanySignUp);

export default CompanySignUpContainer;
