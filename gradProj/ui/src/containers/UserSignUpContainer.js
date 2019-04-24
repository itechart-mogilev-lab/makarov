import { connect } from "react-redux";
import UserSignUp from "../components/UserSignUp"
import { userSignUp } from "../actions/UserActions";
import { clearErrors } from "../actions/ErrorsAndEventsActions";

const mapStateToProps = state => ({
    isSended: state.profileReducer.isSended,
    error: state.eventsAndErrors.message
  });

const UserSignUpContainer =
  connect(
    mapStateToProps,
    { userSignUp, clearErrors }
  )(UserSignUp);

export default UserSignUpContainer;