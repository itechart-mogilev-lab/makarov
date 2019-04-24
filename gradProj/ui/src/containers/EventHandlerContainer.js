import EventHandle from "../components/EventHandler";
import { connect } from "react-redux";
import { clearEvent } from "../actions/ErrorsAndEventsActions";

const mapStateToProps = state => ({
  event: state.eventsAndErrors.event
});

export default connect(
  mapStateToProps,
  { clearEvent }
)(EventHandle);
