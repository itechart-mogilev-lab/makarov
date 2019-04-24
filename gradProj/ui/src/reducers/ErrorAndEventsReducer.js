import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_EVENT,
  CLEAR_EVENT
} from "../actions/ErrorsAndEventsActions";

const initialState = {
  message: "",
  id: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ERRORS: {
      const { message } = payload;
      return {
        message
      };
    }
    case CLEAR_ERRORS:
      return {
        message: "",
        id: null
      };
    case GET_EVENT: {
      const { message } = payload;
      return {
        event: message
      };
    }
    case CLEAR_EVENT:
      return {
        event: ""
      };
    default:
      return state;
  }
}
