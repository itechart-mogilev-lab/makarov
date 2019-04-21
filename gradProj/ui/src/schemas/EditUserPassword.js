import { string, object } from "yup";

const validationNewPassword = object().shape({
  oldPassword: string()
    .required("Enter your password")
    .min(5, "Enter > 4 characters")
    .max(18, "Enter < 19 characters")
    .matches(/^[\S]{5,18}$/, "No spaces allowed"),
  newPassword: string()
    .required("Enter your password")
    .min(5, "Enter > 4 characters")
    .max(18, "Enter < 19 characters")
    .matches(/^[\S]{5,18}$/, "No spaces allowed"),
  confirmNewPassword: string()
    .required("Enter your password again")
    .test("passwords-match", "Check your passwords", function(value) {
      return this.parent.newPassword === value;
    })
});

export default validationNewPassword;
