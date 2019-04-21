export const GET_ERRORS = "GET_ERRORS";
export const returnErrors = (message, id = null) => ({
  type: GET_ERRORS,
  payload: {
    message,
    id
  }
});

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const GET_EVENT = "GET_EVENT";
export const returnEvent = (message, variant) => ({
  type: GET_EVENT,
  payload: {
    message,
    variant
  }
});

export const CLEAR_EVENT = "CLEAR_EVENT";
export const clearEvent = () => ({
  type: CLEAR_EVENT
});