import * as Yup from "yup";
import { EMAIL_REGEX } from "../utils";

/** 🔤 Utility: Character-specific error message */
const getPasswordCharError = (type) =>
  `Your password must have at least 1 ${type} character`;

/** 🔐 Common Password Schema Generator */
export const createPasswordSchema = (label = "password") =>
  Yup.string()
    .required(`Please enter ${label}`)
    .min(8, "Password must have at least 8 characters")
    .max(40, "The maximum length for a password is 40 characters")
    .matches(/^\S*$/, "Password cannot contain any spaces")
    .matches(/[0-9]/, getPasswordCharError("digit"))
    .matches(/[a-z]/, getPasswordCharError("lowercase"))
    .matches(/[A-Z]/, getPasswordCharError("uppercase"))
    .matches(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/,
      getPasswordCharError("special")
    );

/** 📧 Common Email Validation Field */
export const EmailValidationSchema = {
  email: Yup.string()
    .matches(EMAIL_REGEX, "Please enter valid email")
    .required("Please enter email"),
};

/** 🔑 Login Validation Schema */
export const loginValidationSchema = Yup.object().shape({
  ...EmailValidationSchema,
  password: Yup.string().required("Please enter password"),
});

/** 🔁 Forgot Password Schema */
export const forgotPasswordValidationSchema = Yup.object().shape({
  ...EmailValidationSchema,
});

/** 🔄 Reset Password Schema */
export const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: createPasswordSchema("new password"),
  confirmNewPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New password & confirm new password must match"
    )
    .required("Please enter confirm new password"),
});
