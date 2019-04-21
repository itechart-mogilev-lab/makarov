import Order from "../components/OrderForm";
import { connect } from "react-redux";
import {
  lookOffers,
  bookCleaning,
  resetSelectedCompany
} from "../actions/CreateOrderActions";

const mapStateToProps = state => ({
  location: state.createOrderReducer.location
    ? state.createOrderReducer.location
    : undefined,
  adress: state.createOrderReducer.adress
    ? state.createOrderReducer.adress
    : undefined,
  type: state.createOrderReducer.type
    ? state.createOrderReducer.type
    : undefined,
  squareMeters: state.createOrderReducer.squareMeters
    ? state.createOrderReducer.squareMeters
    : undefined,
  smallRooms: state.createOrderReducer.smallRooms
    ? state.createOrderReducer.smallRooms
    : undefined,
  bigRooms: state.createOrderReducer.bigRooms
    ? state.createOrderReducer.bigRooms
    : undefined,
  bathRooms: state.createOrderReducer.bathRooms
    ? state.createOrderReducer.bathRooms
    : undefined,
  service: state.createOrderReducer.service
    ? state.createOrderReducer.service
    : undefined,
  smallCarpets: state.createOrderReducer.smallCarpets
    ? state.createOrderReducer.smallCarpets
    : undefined,
  bigCarpets: state.createOrderReducer.bigCarpets
    ? state.createOrderReducer.bigCarpets
    : undefined,
  startDate: state.createOrderReducer.startDate
    ? state.createOrderReducer.startDate
    : undefined,
  expectedTime: state.createOrderReducer.expectedTime
    ? state.createOrderReducer.expectedTime
    : undefined,
  cleaningDays: state.createOrderReducer.cleaningDays
    ? state.createOrderReducer.cleaningDays
    : undefined,
  regularity: state.createOrderReducer.regularity
    ? state.createOrderReducer.regularity
    : undefined,
  isReccurent: state.createOrderReducer.isReccurent
    ? state.createOrderReducer.isReccurent
    : undefined,

  email: state.profileReducer.isAuthenticated
    ? state.profileReducer.data.email
      ? state.profileReducer.data.email
      : state.createOrderReducer.email
      ? state.createOrderReducer.email
      : undefined
    : null,
  company: state.createOrderReducer.company
    ? state.createOrderReducer.company
    : undefined,
  availableWorkingDays: state.createOrderReducer.company
    ? state.createOrderReducer.availableWorkingDays
    : undefined,
  customer: state.profileReducer.isAuthenticated
    ? state.profileReducer.data.id
      ? state.profileReducer.data.id
      : undefined
    : null
});

export default connect(
  mapStateToProps,
  { lookOffers, bookCleaning, resetSelectedCompany }
)(Order);
