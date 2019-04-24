import { connect } from "react-redux";
import ProfileUser from "../components/ProfileUser";

const mapStateToProps = state => ({
  role: state.profileReducer.role,
  username: state.profileReducer.data.username,
  location: state.profileReducer.data.location,
  email: state.profileReducer.data.email,
  phone: state.profileReducer.data.phone
});

const ProfileUserContainer = connect(mapStateToProps)(ProfileUser);

export default ProfileUserContainer;
