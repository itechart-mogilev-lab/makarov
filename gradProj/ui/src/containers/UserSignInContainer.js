import { connect } from "react-redux";
import SignIn from "../components/UserSignIn";
import { userSignIn, authSocial } from "../actions/UserActions";
import { clearErrors, returnErrors } from "../actions/ErrorsAndEventsActions";

const mapStateToProps = state => ({
  isSended: state.profileReducer.isSended,
  error: state.eventsAndErrors.message
});

const SignInContainer = connect(
  mapStateToProps,
  { userSignIn, clearErrors, returnErrors, authSocial }
)(SignIn);

export default SignInContainer;
