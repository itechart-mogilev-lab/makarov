import { connect } from "react-redux";
import SignIn from "../components/CompanySignIn"
import { executorSignIn } from "../actions/CompanyActions";
import { clearErrors } from "../actions/ErrorsAndEventsActions";

const mapStateToProps = state => ({  
    isSended: state.profileReducer.isSended,
    error: state.eventsAndErrors.message
});

const CompanySignInContainer =
  connect(
    mapStateToProps,
    { executorSignIn, clearErrors }
  )(SignIn);

export default CompanySignInContainer;