import { connect } from "react-redux";
import Edit from "../components/Edit"

const mapStateToProps = state => ({
  role: state.profileReducer.role
});

const EditContainer = connect(mapStateToProps)(Edit);

export default EditContainer;
