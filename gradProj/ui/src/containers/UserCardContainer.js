import UserCard from "../components/UserCard"
import { connect } from "react-redux";
import {
    blockCustomer,
    unblockCustomer
  } from "../actions/AdminActions";

const mapStateToProps = state => ({
    search: state.router.location.search
  });

  export default connect(
    mapStateToProps,
    { unblockCustomer, blockCustomer }
  )(UserCard);