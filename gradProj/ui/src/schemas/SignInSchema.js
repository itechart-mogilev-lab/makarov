import { string, object} from "yup";

const SignInSchema = object().shape({
  
  email: string()
    .required("Email is required")
    .min(5, "Email must contain atleast 5 characters")
    .max(30, "Email must contain less then 30 characters")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    ),
  password: string()
    .required("Enter your password")
    .min(5, "Password must contain atleast 5 characters")
    .max(18, "Password must contain less then 18 characters")
    .matches(/^[\S]{5,18}$/, "The password cannot contain spaces"),
});

export default SignInSchema;