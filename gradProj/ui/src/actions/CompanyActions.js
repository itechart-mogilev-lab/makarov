export const SIGNUP_EXECUTOR = "COMPANY: SIGNUP..";
export const executorSignUp = data => ({
  type: SIGNUP_EXECUTOR,
  payload: data
});

export const EXECUTOR_SIGNUP_SUCCESS = "COMPANY: SIGNUP SUCCESS";
export const executorSignUpSuccess = () => ({
  type: EXECUTOR_SIGNUP_SUCCESS
});

export const CONFIRM_EXECUTOR = "COMPANY: CONFIRMATION..";
export const confirmExecutor = token => {
  return {
    type: CONFIRM_EXECUTOR,
    payload: { token }
  };
};

export const EXECUTOR_NEW_VERIFICATION_CODE = "COMPANY: NEW VERIFICATION CODE..";
export const executorNewVerificationCode = username => {
  return {
    type: EXECUTOR_NEW_VERIFICATION_CODE,
    payload: { username }
  };
};

export const EXECUTOR_NEW_VERIFICATION_CODE_SUCCESS = "COMPANY: NEW VERIFICATION CODE SUCCESS";
export const executorNewVerificationCodeSuccess = () => {
  return {
    type: EXECUTOR_NEW_VERIFICATION_CODE_SUCCESS
  };
};

export const EXECUTOR_CONFIRM_SUCCESS = "COMPANY: CONFIRMATION IS SUCCESS";
export const executorConfirmSuccess = data => ({
  type: EXECUTOR_CONFIRM_SUCCESS,
  payload: data
});


export const SIGNIN_EXECUTOR = "COMPANY: SIGNIN..";
export const executorSignIn = (email, password) => ({
  type: SIGNIN_EXECUTOR,
  payload: { email, password }
});

export const EXECUTOR_SIGNIN_SUCCESS = "COMPANY: SIGNIN SUCCESS";
export const executorSignInSuccess = data => ({
  type: EXECUTOR_SIGNIN_SUCCESS,
  payload: data
});

export const EXECUTOR_SIGNIN_NEED_CONFIRM = "COMPANY: NEED CONFIRM FOR SIGNIN";
export const executorSignInNeedConfirm = username => ({
  type: EXECUTOR_SIGNIN_NEED_CONFIRM,
  payload: { username }
});

export const SIGNOUT_EXECUTOR = "COMPANY: SIGNOUT";
export const signOutExecutor = () => ({
  type: SIGNOUT_EXECUTOR
});

export const EXECUTOR_SIGNOUT_SUCCESS = "COMPANY: SIGNOUT SUCCESS";
export const executorSignOutSuccess = () => ({
  type: EXECUTOR_SIGNOUT_SUCCESS
});

export const LOAD_COMPANY = "COMPANY: LOAD";
export const loadCompany = id => ({
  type: LOAD_COMPANY,
  payload: id
});

export const COMPANY_LOADED = "COMPANY: LOADED";
export const companyLoaded = data => ({
  type: COMPANY_LOADED,
  payload: data
});

export const EDIT_MAIN_INFO_EXECUTOR = "COMPANY: EDIT MAIN INFO";
export const editMainExecutor = data => ({
  type: EDIT_MAIN_INFO_EXECUTOR,
  payload: data
});

export const EXECUTOR_MAIN_INFO_EDITED = "COMPANY: MAIN INFO EDITED SUCCESSFUL";
export const executorMainInfoEdited = data => ({
  type: EXECUTOR_MAIN_INFO_EDITED,
  payload: data
});

export const EDIT_TOC_EXECUTOR = "COMPANY: EDIT TOC";
export const editTypesOfCleaningExecutor = data => ({
  type: EDIT_TOC_EXECUTOR,
  payload: data
});

export const EXECUTOR_TOC_EDITED = "COMPANY: TOC EDITED SUCCESSFUL";
export const executorTypesOfCleaningEdited = data => ({
  type: EXECUTOR_TOC_EDITED,
  payload: data
});

export const CHANGE_PASSWORD_EXECUTOR = "COMPANY: CHANGE PASWORD";
export const changePasswordExecutor = data => ({
  type: CHANGE_PASSWORD_EXECUTOR,
  payload: data
});

export const EXECUTOR_PASSWORD_CHANGED = "COMPANY: PASSWORD CHANGED";
export const executorPasswordChanged = () => ({
  type: EXECUTOR_PASSWORD_CHANGED
});