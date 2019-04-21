import {
  COMPANY_CHOSEN,
  OFFERS_FOUND,
  CLEANING_BOOKED,
  SELECTED_COMPANY_RESET,
  TIME_RPICE_CALCULATED
} from "../actions/CreateOrderActions";

export default (state = {}, action) => {
  switch (action.type) {
    case COMPANY_CHOSEN: {
      const {
        id: company,
        workingDays: availableWorkingDays,
        typesOfCleaning,
        location
      } = action.payload;

      return { ...state, company, availableWorkingDays, typesOfCleaning, location };
    }
    case OFFERS_FOUND: {
      const orderData = action.payload;

      return { ...orderData };
    }
    case CLEANING_BOOKED: {
      return {};
    }
    case SELECTED_COMPANY_RESET: {
      return { ...state, company: undefined, availableWorkingDays: undefined };
    }
    case TIME_RPICE_CALCULATED: {
      const { price, time } = action.payload;
      return { ...state, price, time };
    }
    default:
      return state;
  }
};
