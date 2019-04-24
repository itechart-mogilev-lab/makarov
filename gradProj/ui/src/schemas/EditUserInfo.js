import { string, object } from "yup";

const validationEditProfile = object().shape({
  username: string()
    .required("Username is required")
    .min(2, "> 2 characters")
    .max(9, "< 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "No special symbols allowed"
    ),
  email: string()
    .required("Email is required")
    .min(5, "Enter > 4 characters")
    .max(20, "Enter < 20 characters")
    .matches(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "The email is incorrect"
    ),
  phone: string()
    .required("Phone number is required")
    .min(13, "example: +375441234567")
    .max(13, "example: +375441234567")
    .matches(
      /\+375(29|33|44|25)\d{7}$/,
      "example: +375441234567"
    ),
  location: string()
    .required("Adress is required")
    .min(6, "Type your city and street atleast")
    .max(26, "Adress is too long")
});

export default validationEditProfile;
