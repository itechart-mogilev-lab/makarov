import { connect } from "react-redux";
import EditUser from "../components/EditUser";
import { editUser, changePasswordUser } from "../actions/UserActions";

const mapStateToProps = state => ({
  role: state.profileReducer.role,
  username: state.profileReducer.data.username,
  location: state.profileReducer.data.location,
  email: state.profileReducer.data.email,
  phone: state.profileReducer.data.phone
});

const EditUserContainer = connect(
  mapStateToProps,
  { editUser, changePasswordUser }
)(EditUser);

export default EditUserContainer;
