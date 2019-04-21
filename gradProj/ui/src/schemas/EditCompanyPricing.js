import { string, object } from "yup";

const validationTOC = object().shape({
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
  office: string().matches(
    /^\d{1,5}$/,
    "Enter price, you can type `0`"
  ),
  furniture: string().matches(
    /^\d{1,5}$/,
    "Enter price, you can type `0`"
  ),
  industrial: string().matches(
    /^\d{1,5}$/,
    "Enter price, you can type `0`"
  ),
  pool: string().matches(
    /^\d{1,5}$/,
    "Enter price, you can type `0`"
  )
});

export default validationTOC;
