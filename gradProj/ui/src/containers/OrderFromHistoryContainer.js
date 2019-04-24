import OrderFromHistory from "../components/OrderFromHistory";
import { connect } from "react-redux";
import {
  acceptBook,
  cancelBook,
  confirmBook
} from "../actions/CreateOrderActions";

const mapStateToProps = state => ({
  role: state.profileReducer.role,
  search: state.router.location.search
});

export default connect(
  mapStateToProps,
  { acceptBook, cancelBook, confirmBook }
)(OrderFromHistory);
