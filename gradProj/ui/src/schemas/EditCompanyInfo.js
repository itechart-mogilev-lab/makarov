import { string, object } from "yup";

const validationEditMain = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "Enter > 2 characters")
    .max(9, "Enter < 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "Only letters, numbers and -, ., _"
    ),
  email: string()
    .required("Email is required")
    .min(5, "Enter > 4 characters")
    .max(20, "Enter < 19 characters")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    ),
  phone: string()
    .required("Phone number is required")
    .min(13, "Phone number is incorrect")
    .max(13, "Phone number is incorrect"),
  location: string()
    .required("City name is required")
    .min(3, "Enter > 2 characters")
    .max(14, "Enter < 14 characters")
    .matches(
      /^[A-Za-z-]{3,14}$/,
      "Only letters, - and numbers"
    ),
  companyName: string()
    .required("Company name is required")
    .min(3, "Enter > 2 characaters")
    .max(20, "Enter < 14 characters"),
  description: string().max(
    80,
    "Enter < 80 characters"
  )
});

export default validationEditMain;
