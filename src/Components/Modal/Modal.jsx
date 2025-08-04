import React, { useEffect, useState } from "react";
import { message, Modal, Spin } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";

// Image
import { LoadingOutlined } from "@ant-design/icons";
import Close from "../../assets/image/default/close-icon.svg";

// Theme Validation
import {
  HeroValidation,
  ThemeValidation,
} from "../../helpers/schema/authSchema";

// Redux
import { AddHero, AddTheme, UpdateTheme } from "../../Redux/Redux";
import { dispatchToast } from "../../helpers/utils";

// Close Icon Image
const CloseIcon = () => <img src={Close} alt="close" />;

/** Function to compress image before API call */
export const imageCompressorFn = async (file, setState) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compFile = await imageCompression(file, options);
    setState(compFile);
  } catch (error) {
    setState(file);
  }
};

export const urlToFile = async (url, fileName = "image.jpg") => {
  const response = await fetch(url);
  const blob = await response.blob();

  // Guess the MIME type from the blob or file extension
  const fileType = blob.type || "image/jpeg";

  return new File([blob], fileName, { type: fileType });
};

// export const convertLocationsWithImageUrls = async (locationsFromApi) => {
//   const updatedLocations = await Promise.all(
//     locationsFromApi.map(async (loc, index) => {
//       const file = await urlToFile(loc.image, loc.image.split("/").pop());

//       return {
//         name: loc.name || "",
//         description: loc.description || "",
//         image: {
//           uid: `rc-upload-${Date.now()}-${index}`,
//           name: file.name,
//           status: "done",
//           url: loc.image, // for preview in AntD
//           originFileObj: file, // FormData will use this
//         },
//       };
//     })
//   );

//   return updatedLocations;
// };

export const convertLocationsWithImageUrls = async (locationsFromApi = []) => {
  const updatedLocations = await Promise.all(
    locationsFromApi.map(async (loc, index) => {
      const rawUrl = loc.image;
      const secureUrl = rawUrl.startsWith("http://")
        ? rawUrl.replace("http://", "https://")
        : rawUrl;

      try {
        // Try with HTTPS
        const file = await urlToFile(secureUrl, secureUrl.split("/").pop());

        if (!file) throw new Error("Invalid file object from HTTPS");

        return {
          name: loc.name || "",
          description: loc.description || "",
          image: {
            uid: `rc-upload-${Date.now()}-${index}`,
            name: file.name,
            status: "done",
            url: secureUrl,
            originFileObj: file,
            type: file.type || "image/jpeg",
          },
        };
      } catch (err) {
        console.warn(`HTTPS failed for ${secureUrl}, retrying with HTTP`, err);

        // Retry with HTTP fallback
        try {
          const fallbackUrl = rawUrl.replace("https://", "http://");
          const file = await urlToFile(
            fallbackUrl,
            fallbackUrl.split("/").pop()
          );

          if (!file) throw new Error("Invalid file object from HTTP");

          return {
            name: loc.name || "",
            description: loc.description || "",
            image: {
              uid: `rc-upload-${Date.now()}-${index}`,
              name: file.name,
              status: "done",
              url: fallbackUrl,
              originFileObj: file,
              type: file.type || "image/jpeg",
            },
          };
        } catch (fallbackErr) {
          console.error(
            `Both HTTPS and HTTP failed for: ${rawUrl}`,
            fallbackErr
          );
          return null; // Skip this entry
        }
      }
    })
  );

  return updatedLocations.filter(Boolean); // Remove nulls from failed conversions
};

export const dpList = (data, slice) => {
  const dataList = data || [];
  const length = data?.length || 0;
  const sliceLength = slice || 0;
  const list =
    length > sliceLength ? dataList?.slice(0, sliceLength) : dataList;
  const sliceList = dataList?.slice(sliceLength, length);
  return { dataList, length, sliceLength, list, sliceList };
};

// export const convertTourImageUrls = async (imageUrls = []) => {
//   const formatted = await Promise.all(
//     imageUrls.map(async (url, index) => {
//       const file = await urlToFile(url, url.split("/").pop());

//       return {
//         uid: `rc-upload-${Date.now()}-${index}`,
//         name: file.name,
//         status: "done",
//         url: url,
//         originFileObj: file,
//       };
//     })
//   );
//   return formatted;
// };

export const convertTourImageUrls = async (imageUrls = []) => {
  const formatted = await Promise.all(
    imageUrls.map(async (rawUrl, index) => {
      try {
        // Force HTTPS if HTTP is used
        const secureUrl = rawUrl.startsWith("http://")
          ? rawUrl.replace("http://", "https://")
          : rawUrl;

        // Try fetching the image with HTTPS
        const file = await urlToFile(secureUrl, secureUrl.split("/").pop());

        // If successful, return with secure URL
        if (file) {
          return {
            uid: `rc-upload-${Date.now()}-${index}`,
            name: file.name,
            status: "done",
            url: secureUrl,
            originFileObj: file,
            type: file.type || "image/jpeg",
          };
        }

        throw new Error("SSL failed, fallback to HTTP");
      } catch (err) {
        console.warn(
          `HTTPS fetch failed for ${rawUrl}, trying HTTP fallback...`,
          err
        );

        // Try fallback with original HTTP (if HTTPS failed)
        try {
          const fallbackUrl = rawUrl.replace("https://", "http://");
          const fallbackFile = await urlToFile(
            fallbackUrl,
            fallbackUrl.split("/").pop()
          );

          if (fallbackFile) {
            return {
              uid: `rc-upload-${Date.now()}-${index}`,
              name: fallbackFile?.name,
              status: "done",
              url: fallbackUrl,
              originFileObj: fallbackFile,
              type: fallbackFile?.type || "image/jpeg",
            };
          }
        } catch (fallbackErr) {
          console.error(
            `Both HTTPS and HTTP failed for ${rawUrl}`,
            fallbackErr
          );
          return null;
        }
      }
    })
  );

  return formatted.filter(Boolean);
};

// GoRebelModal
export const BasicModal = ({ isOpen, cancelSuperHandler }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={cancelSuperHandler}
      maskClosable={false}
      closable={true}
      centered={true}
      closeIcon={<CloseIcon />}
      width={"32.5rem"}
      footer={null}
      className="basic-modal"
    >
      <GoRebel />
    </Modal>
  );
};

// Theme
export const ThemeModal = ({ data, isOpen, cancelHandler, successHandler }) => {
  const isEdit = Boolean(data);
  const dispatch = useDispatch();

  const { addThemeLoading, updateThemeLoading } = useSelector(
    (state) => state.loading
  );

  const headerTitle = isEdit ? `Edit Theme` : `Add Theme`;
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: null,
      image: "",
    },
    validationSchema: ThemeValidation,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values?.name);
      formData.append("image", values?.image);
      if (!isEdit) {
        dispatch(
          AddTheme(formData, () => {
            successHandler();
          })
        );
      } else {
        const formData = new FormData();
        formData.append("name", values?.name);
        dispatch(
          UpdateTheme(data?._id, { name: values?.name }, () => {
            successHandler();
          })
        );
      }
    },
  });

  // const handleFile = (file) => {
  //   if (isEdit) return;
  //   if (file && file.type.startsWith("image/")) {
  //     setPreview(URL.createObjectURL(file));
  //     formik.setFieldValue("image", file);
  //   } else {
  //     formik.setFieldError("image", "Please upload a valid image file.");
  //   }
  // };

  const handleFile = (file) => {
    if (isEdit) return;

    const allowedTypes = /jpeg|jpg|png|webp/;
    const fileType = file?.type.split("/")[1];

    if (file && file.type.startsWith("image/") && allowedTypes.test(fileType)) {
      setPreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    } else {
      dispatchToast(
        dispatch,
        "error",
        `${file?.name} is not a valid image format. Allowed: jpeg, jpg, png, webp`
      );
      formik.setFieldError("image", "Invalid image format.");
    }
  };

  const handleDrop = (e) => {
    if (isEdit) return;
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    if (isEdit) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    if (isEdit) return;
    setIsDragging(false);
  };

  const handleBrowse = (e) => {
    if (isEdit) return;
    const file = e.target.files[0];
    handleFile(file);
  };

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
      if (data) {
        const { image, name } = data;
        formik.setFieldValue("name", name);
        setPreview(image); // for UI
        urlToFile(image, image.split("/").pop()).then((file) => {
          formik.setFieldValue("image", file);
        });
      } else {
        setPreview(null);
      }
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onCancel={cancelHandler}
      maskClosable={false}
      closable={true}
      centered={true}
      closeIcon={<CloseIcon />}
      width={"576px"}
      footer={null}
      className="modelMaxHeight lone-modal"
    >
      <div className="modal-content">
        <h3 className="text-center my-3 fs-2 fw-c-semiBold">{headerTitle}</h3>

        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="row g-4 mt-0"
        >
          {/* Image Name */}
          <div className="col-lg-12">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control form-control-lg fs-6 ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              placeholder="Enter Theme Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="invalid-feedback">{formik.errors.name || ""}</div>
          </div>

          {/* Image Upload */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`col-12 ${isDragging ? "bg-light" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (!isEdit) {
                document.getElementById("fileInput").click();
              }
            }}
          >
            <div
              className="border border-2 p-4 text-center rounded align-content-center position-relative overflow-hidden"
              style={{ minHeight: 175 }}
            >
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                hidden
                onChange={handleBrowse}
                onBlur={formik.handleBlur}
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid w-100 theme-image"
                />
              ) : (
                <p className="fs-6">
                  Drag & drop image here or <u>Click to browse</u>
                </p>
              )}
            </div>

            {formik.touched.image && formik.errors.image && (
              <div className="small mt-1 text-danger">
                {formik.errors.image}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg px-3">
              {isEdit ? `Update` : `Save`}{" "}
              {(addThemeLoading || updateThemeLoading) && (
                <Spin
                  indicator={<LoadingOutlined spin />}
                  size="medium"
                  className="text-white ms-2"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Hero
export const HeroModal = ({ data, isOpen, cancelHandler, successHandler }) => {
  const isEdit = Boolean(data);
  const dispatch = useDispatch();

  const { updateThemeLoading, addHeroLoading } = useSelector(
    (state) => state.loading
  );

  const headerTitle = isEdit ? `Edit Hero` : `Add Hero`;
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const formik = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema: HeroValidation,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", values?.image);
      if (!isEdit) {
        dispatch(
          AddHero(formData, () => {
            successHandler();
          })
        );
      }
    },
  });

  const handleFile = (file) => {
    if (isEdit) return;

    const allowedTypes = /jpeg|jpg|png|webp/;
    const fileType = file?.type.split("/")[1];

    if (file && file.type.startsWith("image/") && allowedTypes.test(fileType)) {
      setPreview(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    } else {
      dispatchToast(
        dispatch,
        "error",
        `${file?.name} is not a valid image format. Allowed: jpeg, jpg, png, webp`
      );
      formik.setFieldError("image", "Invalid image format.");
    }
  };

  const handleDrop = (e) => {
    if (isEdit) return;
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    if (isEdit) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    if (isEdit) return;
    setIsDragging(false);
  };

  const handleBrowse = (e) => {
    if (isEdit) return;
    const file = e.target.files[0];
    handleFile(file);
  };

  useEffect(() => {
    if (isOpen) {
      formik.resetForm();
      if (data) {
        const { image } = data;
        setPreview(image); // for UI
        urlToFile(image, image.split("/").pop()).then((file) => {
          formik.setFieldValue("image", file);
        });
      } else {
        setPreview(null);
      }
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onCancel={cancelHandler}
      maskClosable={false}
      closable={true}
      centered={true}
      closeIcon={<CloseIcon />}
      width={"576px"}
      footer={null}
      className="modelMaxHeight lone-modal"
    >
      <div className="modal-content">
        <h3 className="text-center my-3 fs-2 fw-c-semiBold">{headerTitle}</h3>

        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="row g-4 mt-0"
        >
          {/* Image Upload */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`col-12 ${isDragging ? "bg-light" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (!isEdit) {
                document.getElementById("fileInput").click();
              }
            }}
          >
            <div
              className="border border-2 p-4 text-center rounded align-content-center position-relative overflow-hidden"
              style={{ minHeight: 175 }}
            >
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                hidden
                onChange={handleBrowse}
                onBlur={formik.handleBlur}
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid w-100 theme-image"
                />
              ) : (
                <p className="fs-6">
                  Drag & drop image here or <u>Click to browse</u>
                </p>
              )}
            </div>

            {formik.touched.image && formik.errors.image && (
              <div className="small mt-1 text-danger">
                {formik.errors.image}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg px-3">
              {isEdit ? `Update` : `Save`}{" "}
              {(addHeroLoading || updateThemeLoading) && (
                <Spin
                  indicator={<LoadingOutlined spin />}
                  size="medium"
                  className="text-white ms-2"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
