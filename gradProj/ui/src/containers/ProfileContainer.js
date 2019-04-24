import Profile from "../components/Profile";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  role: state.profileReducer.role
});

const ProfileContainer = connect(mapStateToProps)(Profile);

export default ProfileContainer;
