import { combineReducers } from 'redux';
import eventsAndErrors from "./ErrorAndEventsReducer";
import { connectRouter } from "connected-react-router";
import companies from "./FilterAndLoadReducer";
import profileReducer from "./ProfileReducer";
import createOrderReducer from "./CreateOrderReducer";
import company from "./CompanyProfileReducer";
import admin from "./AdminReducer";
import reviews from "./ReviewsReducer";


export default history =>
  combineReducers({
    router: connectRouter(history),
    profileReducer,
    companies,
    company,
    reviews,
    admin,
    eventsAndErrors,
    createOrderReducer
  });