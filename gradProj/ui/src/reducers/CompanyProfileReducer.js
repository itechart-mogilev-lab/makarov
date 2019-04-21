import { COMPANY_LOADED } from "../actions/CompanyActions";
import { COMPANY_REVIEWED } from "../actions/ReviewsActions";

const initialState = {
  reviews: {
    docs: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_LOADED: {
      const company = action.payload;

      return { ...company };
    }
    case COMPANY_REVIEWED: {
      return { ...state, rating: action.payload };
    }
    default:
      return state;
  }
};
