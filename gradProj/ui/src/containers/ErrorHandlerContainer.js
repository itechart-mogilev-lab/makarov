import { connect } from "react-redux";
import { clearErrors } from "../actions/ErrorsAndEventsActions";
import ErrorHandle from "../components/ErrorHandler";

const mapStateToProps = state => ({
  error: state.eventsAndErrors.error
});

export default connect(
  mapStateToProps,
  { clearErrors }
)(ErrorHandle);
