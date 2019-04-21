import {
  USER_SIGNIN_SUCCESS,
  USER_LOADED,
  LOGOUT_SUCCESS,
  USER_SIGNUP_SUCCESS,
  USER_CONFIRM_SUCCESS,
  USER_SIGNIN_NEED_CONFIRM,
  USER_EDITED
} from "../actions/UserActions";
import {
  EXECUTOR_SIGNIN_SUCCESS,
  EXECUTOR_SIGNIN_NEED_CONFIRM,
  EXECUTOR_SIGNUP_SUCCESS,
  EXECUTOR_CONFIRM_SUCCESS,
  EXECUTOR_MAIN_INFO_EDITED,
  EXECUTOR_TOC_EDITED
} from "../actions/CompanyActions";
import { BOOKINGS_LOADED } from "../actions/OrderHistoryActions";
const initialState = {
  isAuthenticated: false,
  isSended: false,
  role: "",
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED: {
      const user = action.payload;

      return { ...state, ...user };
    }
    case USER_SIGNIN_SUCCESS:
    case USER_CONFIRM_SUCCESS: {
      const user = action.payload.user;
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        role: user.role,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          location: user.location
        }
      };
    }

    case USER_EDITED: {
      return {
        ...state,
        data: {
          username: action.payload.username,
          email: action.payload.email,
          phone: action.payload.phone,
          location: action.payload.location
        }
      };
    }
    case USER_SIGNIN_NEED_CONFIRM:
    case USER_SIGNUP_SUCCESS: {
      return {
        ...state,
        isSended: true,
        data: { username: action.payload.username }
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        isAuthenticated: false
      };
    }
    case BOOKINGS_LOADED: {
      const bookings = action.payload;

      return { ...state, bookings: { ...bookings } };
    }
    ////////////////////////////////////
    ///////////////COMPANY//////////////
    ////////////////////////////////////
    case EXECUTOR_SIGNIN_SUCCESS:
    case EXECUTOR_CONFIRM_SUCCESS: {
      const user = action.payload.user;
      return {
        ...state,
        isAuthenticated: !!action.payload.token,
        role: user.role,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          location: user.location,
          companyName: user.companyName,
          description: user.description,
          typesOfCleaning: user.typesOfCleaning
        }
      };
    }
    case EXECUTOR_SIGNIN_NEED_CONFIRM:
    case EXECUTOR_SIGNUP_SUCCESS: {
      return {
        ...state,
        isSended: true
      };
    }
    case EXECUTOR_MAIN_INFO_EDITED: {
      return {
        ...state,
        data: {
          username: action.payload.username,
          email: action.payload.email,
          phone: action.payload.phone,
          location: action.payload.location,
          companyName: action.payload.companyName,
          description: action.payload.description,
          typesOfCleaning: state.data.typesOfCleaning
        }
      };
    }
    case EXECUTOR_TOC_EDITED: {
      return {
        ...state,
        data: {
          username: state.data.username,
          email: state.data.email,
          phone: state.data.phone,
          location: state.data.location,
          companyName: state.data.companyName,
          description: state.data.description,
          typesOfCleaning: action.payload
        }
      };
    }

    default:
      return state;
  }
};
