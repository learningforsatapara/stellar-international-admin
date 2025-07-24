import { Field } from "formik";

export const FormikInput = ({
  type,
  label,
  className,
  labelClass,
  errorClass,
  name,
  value,
  placeholder,
  icon,
  svg,
  iconHandler,
  isDisabled,
  error,
  formClass,
}) => {
  return (
    <div className={`${className} formik-input position-relative`}>
      {label && (
        <label htmlFor={label} className={`${labelClass} ps-0`}>
          {label}
        </label>
      )}

      {value ? (
        <Field
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          autoComplete={"false"}
          value={value}
          disabled={isDisabled}
          className={`form-control ps-1 ${formClass || ""}`}
        />
      ) : (
        <Field
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          autoComplete={"false"}
          disabled={value}
          className={`form-control ps-1 ${formClass || ""}`}
        />
      )}

      {icon && (
        <span className="formik-icon" onClick={iconHandler}>
          {svg}
        </span>
      )}

      <small className={`text-danger d-block ${errorClass}`}>
        {error}
        &nbsp;
      </small>
    </div>
  );
};

export const FormikTextareaBox = ({
  name,
  error,
  placeholder,
  label,
  className,
  type,
  icon,
  iconClick,
  contactField,
  inputClassName,
  isDisabled,
  rows = 4,
  errorClass = "text-danger mt-1 d-block",
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="form-label fw-medium fs-6 text-black mb-1"
        >
          {label}
        </label>
      )}

      <div className="position-relative">
        <Field
          as="textarea"
          type={type}
          name={name}
          id={name}
          className={`form-control form-control-lg ${icon ? "pe-5" : ""} ${
            inputClassName || ""
          }`}
          placeholder={placeholder}
          autoComplete="off"
          disabled={isDisabled}
          rows={rows}
        />

        {contactField && contactField}

        {icon && (
          <span
            className="formik-input-icon cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              iconClick && iconClick();
            }}
          >
            {icon}
          </span>
        )}
      </div>

      <small className={`${errorClass} text-danger d-block`}>
        {error}&nbsp;
      </small>
    </div>
  );
};
