import OrderForm from "../components/Order";
import { connect } from "react-redux";
import {
    resetSelectedCompany,
    calculateTimePrice
  } from "../actions/CreateOrderActions";

const mapStateToProps = state => ({
    company: state.createOrderReducer.company
      ? state.createOrderReducer.company
      : undefined,
    isAuthenticated: state.profileReducer.isAuthenticated,
    availableWorkingDays: state.createOrderReducer.company
      ? state.createOrderReducer.availableWorkingDays
      : undefined,
    typesOfCleaning: state.createOrderReducer.typesOfCleaning,
    price: state.createOrderReducer.price
      ? state.createOrderReducer.price
      : undefined,
    time: state.createOrderReducer.time
      ? state.createOrderReducer.time
      : undefined
  });

  export default connect(
    mapStateToProps,
    { resetSelectedCompany, calculateTimePrice }
  )(OrderForm);