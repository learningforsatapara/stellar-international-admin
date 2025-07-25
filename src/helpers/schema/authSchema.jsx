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

export const ThemeValidation = Yup.object({
  image: Yup.string()
    .required("Image is required")
    .url("Uploaded image URL is invalid"),
  name: Yup.string().required("Image name is required"),
});

export const PackageValidation = Yup.object().shape({
  // name: Yup.string().required("Required"),
  // description: Yup.string().required("Required"),
  // duration: Yup.string().required("Required"),
  // themeId: Yup.string().required("Required"),
  // locations: Yup.array().of(
  //   Yup.object().shape({
  //     name: Yup.string().required("Location name required"),
  //     description: Yup.string().required("Location description required"),
  //     image: Yup.mixed().required("Location image required"),
  //   })
  // ),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.string().required("Duration is required"),
  theme: Yup.string().required("Theme is required"),
  service: Yup.array()
    .of(Yup.string())
    .min(1, "At least one service is required")
    .required("Service is required"),
  tourType: Yup.string().required("Tour type is required"),
  tourImages: Yup.array()
    .of(
      Yup.mixed().test(
        "fileType",
        "Only images allowed",
        (file) => file && file.type && file.type.startsWith("image/")
      )
    )
    .min(1, "At least one image is required"),
});
