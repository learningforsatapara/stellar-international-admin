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
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return value && value.type && value.type.startsWith("image/");
    }),
  name: Yup.string().required("Image name is required"),
});

export const HeroValidation = Yup.object({
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return value && value.type && value.type.startsWith("image/");
    }),
});

export const UpdatePackageValidation = Yup.object().shape({
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
  themeId: Yup.string().required("Theme is required"),
  services: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Service name is required"),
      })
    )
    .min(1, "At least one service is required")
    .required("Service is required"),
  is_domestic_international: Yup.string().required("Tour type is required"),
  // locations: Yup.array()
  //   .of(
  //     Yup.object({
  //       name: Yup.string().required("Location name is required"),
  //       image: Yup.string().required("Image is required"),
  //     })
  //   )
  //   .min(1, "At least one location is required"),
  locations: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Location name is required"),
        image: Yup.mixed().test(
          "is-image-url",
          "Image is required",
          function (value) {
            // Accepts either a string or an object with a `url`
            return typeof value === "string"
              ? !!value
              : value && typeof value.url === "string";
          }
        ),
      })
    )
    .min(1, "At least one location is required"),
  // tourImages: Yup.array()
  //   .of(
  //     Yup.mixed().test(
  //       "fileType",
  //       "Only images allowed",
  //       (file) => file && file.type && file.type.startsWith("image/")
  //     )
  //   )
  //   .min(1, "At least one image is required"),
  tourImages: Yup.array()
    .of(
      Yup.mixed().test(
        "is-valid-image",
        "Only valid image files or URLs are allowed",
        (file) => {
          if (!file) return false;

          // If it's a new file with a type
          if (file?.type?.startsWith("image/")) return true;

          // If it's an AntD upload object with a URL
          if (file?.url && typeof file.url === "string") return true;

          // If it's a direct string URL
          if (typeof file === "string" && file.startsWith("http")) return true;

          return false;
        }
      )
    )
    .min(1, "At least one image is required"),
});

export const AddPackageValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.string().required("Duration is required"),
  themeId: Yup.string().required("Theme is required"),
  services: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Service name is required"),
      })
    )
    .min(1, "At least one service is required")
    .required("Service is required"),
  is_domestic_international: Yup.string().required("Tour type is required"),
  locations: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Location name is required"),
        image: Yup.string().required("Image is required"),
      })
    )
    .min(1, "At least one location is required"),

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
