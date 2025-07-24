import * as Yup from "yup";

export const stringValidation = (label = "This field") =>
  Yup.string().required(`${label} is required`);

export const example1 = Yup.object().shape({
  name: stringValidation("Name"),
  city: stringValidation("City"),
});

// Reusable positive number validation
export const numberValidationPositive = (label = "This field") =>
  Yup.number()
    .typeError(`${label} must be a number`)
    .required(`${label} is required`)
    .min(0, `${label} must be 0 or greater`);

export const example2 = Yup.object().shape({
  quantity: numberValidationPositive("Quantity"),
  price: numberValidationPositive("Price"),
});

// Reusable array validation with dynamic label
export const arrayValidation = (label = "This field") =>
  Yup.array()
    .min(1, `${label} must have at least one item`)
    .required(`${label} is required`);

export const example3 = Yup.object().shape({
  platform: arrayValidation("Platform"),
  tags: arrayValidation("Tag"),
});

// Mobile Number
const mobileValidation = Yup.string()
  .required("Mobile Number is required")
  .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number");

// Upload File
const fileValidation = (label) =>
  Yup.mixed()
    .required(`${label} is required`)
    .test(
      "fileType",
      "Invalid file type",
      (value) => value instanceof File || (value && typeof value === "object")
    );
