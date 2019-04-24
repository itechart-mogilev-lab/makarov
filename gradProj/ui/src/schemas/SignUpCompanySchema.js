import { string, object, array } from "yup";

const CompanySchema = object().shape({
  password: string()
    .required("Enter your password")
    .min(5, "Enter > 4 characters")
    .max(18, "Enter < 18 characters")
    .matches(/^[\S]{5,18}$/, "No spaces allowed"),
  confirmPassword: string()
    .required("Enter your password again")
    .test("passwords-match", "Check your passwords", function(value) {
      return this.parent.password === value;
    }),
  username: string()
    .required("Username is required")
    .min(2, "Enter > 1 character")
    .max(9, "Enter < 9 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9-_.]{1,9}$/,
      "The username can contain letters, numbers, -, ., _"
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
    .min(13, "Phone number is incorrect")
    .max(13, "Phone number is incorrect"),
  location: string()
    .required("City name is required")
    .min(3, "Enter > 2 characters")
    .max(14, "Enter < 14 characters")
    .matches(/^[A-Za-z-]{3,14}$/, "Only letters, - and numbers"),
  companyName: string()
    .required("Company name is required")
    .min(3, "Enter > 2 characaters")
    .max(20, "Enter < 14 characters"),
  description: string().max(80, "Enter < 80 characters"),
  workingDays: array()
    .min(1, "Company must have atleast 1 working day")
    .max(7, "Wrong data, 7 days at week"),
  standartSmallRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  standartBigRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  standartBathRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  generalBathRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  generalBigRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  generalSmallRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  afterRepairBathRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  afterRepairBigRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  afterRepairSmallRoom: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  smallCarpet: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  bigCarpet: string()
    .min(1, "You can type `0`")
    .matches(/^\d{1,5}$/, "This field for money"),
  office: string().matches(/^\d{1,5}$/, "Enter price, you can type `0`"),
  furniture: string().matches(/^\d{1,5}$/, "Enter price, you can type `0`"),
  industrial: string().matches(/^\d{1,5}$/, "Enter price, you can type `0`"),
  pool: string().matches(/^\d{1,5}$/, "Enter price, you can type `0`")
});

export default CompanySchema;
