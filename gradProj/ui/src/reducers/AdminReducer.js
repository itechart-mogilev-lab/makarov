import { CUSTOMERS_LOADED } from "../actions/AdminActions";

const initialState = {
  users: {
    docs: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMERS_LOADED: {
      const users = action.payload;

      return { ...state, users: { ...users } };
    }
    default:
      return state;
  }
};
