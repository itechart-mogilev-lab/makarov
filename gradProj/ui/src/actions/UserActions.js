export const USER_LOADED = "user loaded";
export const userLoaded = data => ({
  type: USER_LOADED,
  payload: data
});

export const USER_SIGN_IN = "user signin";
export const userSignIn = (email, password) => ({
  type: USER_SIGN_IN,
  payload: { email, password }
});

export const USER_SIGNIN_SUCCESS = "user signin success";
export const userSignInSuccess = data => ({
  type: USER_SIGNIN_SUCCESS,
  payload: data
});

export const USER_SIGNIN_FAILED = "error during user signin";
export const userSignInFailed = err => ({
  type: USER_SIGNIN_FAILED,
  payload: err
});

export const USER_SIGNUP = "user signup";
export const userSignUp = data => ({
  type: USER_SIGNUP,
  payload: data
});

export const USER_SIGNUP_SUCCESS = "user signup success";
export const userSignUpSuccess = username => ({
  type: USER_SIGNUP_SUCCESS,
  payload: { username }
});

export const USER_SIGNUP_FAILED = "user signup failure";
export const userSignUpFailed = err => ({
  type: USER_SIGNUP_FAILED,
  payload: err
});

export const CONFIRM_USER = "USER: CONFIRMATION..";
export const confirmUser = data => {
  return {
    type: CONFIRM_USER,
    payload: data
  };
};

export const USER_CONFIRM_SUCCESS = "USER: CONFIRMATION IS SUCCESS";
export const userConfirmSuccess = data => ({
  type: USER_CONFIRM_SUCCESS,
  payload: data
});

export const USER_CONFIRM_FAILED = "USER: CONFIRMATION IS FAILED";
export const userConfirmFailed = err => ({
  type: USER_CONFIRM_FAILED,
  payload: err
});

export const LOAD_USER = "load user";
export const loadUser = () => ({
  type: LOAD_USER
});

export const LOGOUT = "logout user";
export const logOut = () => ({
  type: LOGOUT
});

export const LOGOUT_SUCCESS = "user logout success";
export const logOutSuccess = () => ({
  type: LOGOUT_SUCCESS
});

export const USER_SIGNIN_NEED_CONFIRM = "user not confirmed";
export const userSignInNeedConfirm = username => ({
  type: USER_SIGNIN_NEED_CONFIRM,
  payload: { username }
});

export const EDIT_USER = "USER: EDIT";
export const editUser = data => ({
  type: EDIT_USER,
  payload: data
});

export const USER_EDITED = "USER: EDITED SUCCESSFUL";
export const userEdited = data => ({
  type: USER_EDITED,
  payload: data
});

export const CHANGE_PASSWORD_USER = "USER: CHANGE PASWORD";
export const changePasswordUser = data => ({
  type: CHANGE_PASSWORD_USER,
  payload: data
});

export const USER_PASSWORD_CHANGED = "USER: PASSWORD CHANGED";
export const userPasswordChanged = () => ({
  type: USER_PASSWORD_CHANGED
});

export const AUTH_SOCIAL = "USER: SOCIAL AUTH..";
export const authSocial = data => ({
  type: AUTH_SOCIAL,
  payload: data
})
