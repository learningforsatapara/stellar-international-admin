import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Input, Radio, Select, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";

// Icon
import {
  PlusOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

// Redux
import { AddPackage, GetPackageId, UpdatePackage } from "../../Redux/Redux";

// Helpers
import {
  AddPackageValidation,
  UpdatePackageValidation,
} from "../../helpers/schema/authSchema";

// Modal
import {
  convertLocationsWithImageUrls,
  convertTourImageUrls,
} from "../../Components/Modal/Modal";

// Destructure
import Dragger from "antd/es/upload/Dragger";
import { dispatchToast } from "../../helpers/utils";
import TiptapEditorBlock from "../../Components/TiptapEditorBlock";

// This would typically come from your API or constants
const serviceOptions = [
  {
    name: "Best Flights",
    description: "Find and book the best domestic and international flights.",
  },
  {
    name: "Accommodation",
    description: "Stay at hotels, guesthouses, or vacation rentals.",
  },
  {
    name: "Food & Dining",
    description: "Enjoy curated meal plans and local culinary experiences.",
  },
  {
    name: "Best Trains",
    description: "Book comfortable and scenic train journeys with ease.",
  },
  {
    name: "Best Cars",
    description: "Rent cars for local or intercity travel at affordable rates.",
  },
  {
    name: "Tour Guide Services",
    description: "Hire experienced guides for a richer travel experience.",
  },
  {
    name: "Customization",
    description: "Tailor your travel package to suit your preferences.",
  },
  {
    name: "Adventure Activities",
    description:
      "Explore thrilling adventures like trekking, rafting, and more.",
  },
];

// File
const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const Package = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { theme } = useSelector((state) => state.theme);
  const { addPackageLoading, updatePackageLoading } = useSelector(
    (state) => state.loading
  );

  const [previewFiles, setPreviewFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      duration: "",
      themeId: null,
      is_domestic_international: "1",
      locations: [],
      services: [],
    },
    validationSchema: id ? UpdatePackageValidation : AddPackageValidation,
    onSubmit: (values) => {
      const data = new FormData();

      // Append basic fields
      data.append("themeId", values.themeId);
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("duration", values.duration);
      data.append(
        "is_domestic_international",
        values.is_domestic_international
      );
      data.append("services", JSON.stringify(values.services));

      // Prepare locations array with only image name (for backend matching)
      const processedLocations = values.locations.map((loc) => ({
        ...loc,
        image: typeof loc.image === "string" ? loc.image : loc.image.name,
      }));

      data.append("locations", JSON.stringify(processedLocations));

      // Append location images (only if they are new File objects)
      values.locations.forEach((loc) => {
        if (loc.image && typeof loc.image !== "string") {
          data.append("locationImages", loc.image); // Must match backend field
        }
      });

      // Handle tourImages (new uploads vs existing URLs)
      const retainedTourImageUrls = [];

      previewFiles.forEach((file) => {
        if (typeof file === "string") {
          // Old image URL (e.g., from edit mode)
          retainedTourImageUrls.push(file);
        } else if (file.originFileObj) {
          // New image file
          data.append("tourImages", file.originFileObj);
        }
      });

      // Send existing URLs as JSON string so backend can retain them
      if (retainedTourImageUrls.length > 0) {
        data.append("tourImages", JSON.stringify(retainedTourImageUrls));
      }

      // Submit to backend
      if (!id) {
        dispatch(
          AddPackage(data, () => {
            navigate("/package");
          })
        );
      } else {
        dispatch(
          UpdatePackage(id, data, () => {
            navigate("/package");
          })
        );
      }
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(
        GetPackageId(id, (data) => {
          const {
            themeId,
            description,
            name,
            duration,
            is_domestic_international,
            services,
            locations,
            tourImages,
          } = data || {};
          formik.setFieldValue("name", name);
          formik.setFieldValue("description", description);
          formik.setFieldValue("duration", duration);
          formik.setFieldValue("themeId", themeId?._id);
          formik.setFieldValue(
            "is_domestic_international",
            is_domestic_international
          );
          formik.setFieldValue(
            "services",
            services?.map((ele) => ({
              name: ele?.name,
              description: ele?.name,
            }))
          );

          if (locations?.length) {
            convertLocationsWithImageUrls(locations).then(
              (formattedLocations) => {
                formik.setFieldValue("locations", formattedLocations);
              }
            );
          }

          if (tourImages?.length) {
            convertTourImageUrls(tourImages).then((formatted) => {
              formik.setFieldValue("tourImages", formatted);
              setPreviewFiles(formatted);
            });
          }
        })
      );
    }
  }, [id, theme]);

  const handleImageChange = ({ fileList }) => {
    const validFiles = [];
    fileList.forEach((file) => {
      if (allowedTypes.includes(file.type)) {
        validFiles.push(file);
      } else {
        dispatchToast(
          dispatch,
          "error",
          `${file.name} is not a valid image format. Allowed: jpeg, jpg, png, webp`
        );
      }
    });
    setPreviewFiles(validFiles);
  };

  console.log("calling formik", formik?.errors);
  return (
    <div className="page package-create">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1
            className="title d-flex gap-2 align-content-center cursor-pointer"
            onClick={() => navigate("/package")}
          >
            <ArrowLeftOutlined style={{ fontSize: 18 }} />
            {id ? `Edit ${formik?.values?.name}` : `Add`} Package
          </h1>

          <Button
            type="primary"
            size="large"
            className="shadow-none"
            onClick={formik.handleSubmit}
            loading={addPackageLoading || updatePackageLoading}
          >
            {id ? "Update Package" : "Add Package"}
          </Button>
        </div>

        <div className="card card-shadow rounded-4 border-0 overflow-hidden mb-4">
          <div className="card-body shadow-sm">
            <form onSubmit={formik.handleSubmit} noValidate className="row g-4">
              <div className="col-12">
                <label className="d-block font-medium mb-1">Theme Type</label>{" "}
                <Radio.Group
                  value={formik.values.is_domestic_international}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "is_domestic_international",
                      e.target.value
                    )
                  }
                >
                  <Radio value="1" className="me-4">
                    Domestic
                  </Radio>
                  <Radio value="2" className="me-4">
                    International
                  </Radio>
                </Radio.Group>
              </div>

              <div className="col-md-6">
                <label className="form-label">Package Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control form-control-lg fs-6 ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter your package name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">
                  {formik.touched.name && formik.errors.name}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Package Duration</label>
                <input
                  rows={4}
                  type="text"
                  name="duration"
                  className={`form-control form-control-lg fs-6 ${
                    formik.touched.duration && formik.errors.duration
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter your package name"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">
                  {formik.touched.duration && formik.errors.duration}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Package Description</label>
                <TiptapEditorBlock
                  item={formik.values.description}
                  onChange={(newHTML) => {
                    formik.setFieldValue("description", newHTML);
                  }}
                />
                <div className="error">
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>

              <div className="col-12">
                <label className="block font-medium mb-1">Theme</label>{" "}
                <Select
                  size="large"
                  className="w-100"
                  showSearch
                  placeholder="Select Theme"
                  optionFilterProp="label"
                  value={formik?.values?.themeId}
                  onChange={(value) => {
                    formik.setFieldValue("themeId", value);
                  }}
                  options={theme?.map((ele) => ({
                    value: ele?._id,
                    label: ele?.name,
                  }))}
                />
              </div>

              <div className="col-12">
                <label className="block font-medium mb-1">Service</label>
                <Select
                  size="large"
                  className="w-100"
                  showSearch
                  mode="multiple"
                  placeholder="Select Services"
                  value={formik.values.services.map((item) => item.name)}
                  onChange={(selectedValues) => {
                    const selectedObjects = serviceOptions.filter((option) =>
                      selectedValues.includes(option.name)
                    );
                    formik.setFieldValue("services", selectedObjects);
                  }}
                  optionFilterProp="label"
                  options={serviceOptions?.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                />
              </div>

              {/* LOCATIONS */}
              <div className="col-12">
                <div className="d-flex align-items-center justify-content-between">
                  <label className="block font-medium">Location</label>
                  <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className={`shadow-none ${
                      formik.values.locations?.length > 0 ? `mb-2` : ``
                    }`}
                    onClick={() => {
                      const updated = [...formik.values.locations];
                      updated.push({ name: "", description: "", image: null });
                      formik.setFieldValue("locations", updated);
                    }}
                  >
                    Add Location
                  </Button>
                </div>
                {formik.values.locations.map((loc, index) => (
                  <Card
                    key={index}
                    title={loc?.name ? loc?.name : `Location ${index + 1}`}
                    extra={
                      index > 0 && (
                        <Button
                          size="small"
                          danger
                          onClick={() => {
                            const updated = [...formik.values.locations];
                            updated.splice(index, 1);
                            formik.setFieldValue("locations", updated);
                          }}
                        >
                          Remove Location
                        </Button>
                      )
                    }
                    style={
                      index !== formik?.values?.locations?.length - 1
                        ? { marginBottom: "1rem" }
                        : {}
                    }
                  >
                    <Input
                      className="mb-3"
                      size="large"
                      placeholder="Location Name"
                      value={loc.name}
                      onChange={(e) => {
                        const updated = [...formik.values.locations];
                        updated[index].name = e.target.value;
                        formik.setFieldValue("locations", updated);
                      }}
                    />

                    <Upload
                      listType="picture"
                      // beforeUpload={(file) => {
                      //   const updated = [...formik.values.locations];
                      //   updated[index].image = file;
                      //   formik.setFieldValue("locations", updated);
                      //   return false;
                      // }}
                      beforeUpload={(file) => {
                        if (!allowedTypes.includes(file.type)) {
                          dispatchToast(
                            dispatch,
                            "error",
                            `${file.name} is not a valid image format. Allowed: jpeg, jpg, png, webp`
                          );
                          return false;
                        }

                        const updated = [...formik.values.locations];
                        updated[index].image = file;
                        formik.setFieldValue("locations", updated);
                        return false; // Prevent auto-upload
                      }}
                      onRemove={() => {
                        const updated = [...formik.values.locations];
                        updated[index].image = null;
                        formik.setFieldValue("locations", updated);
                      }}
                      fileList={
                        loc.image
                          ? [
                              {
                                uid: "-1",
                                name: loc.image.name,
                                status: "done",
                              },
                            ]
                          : []
                      }
                    >
                      {!loc.image && (
                        <Button icon={<UploadOutlined />}>
                          Upload Location Image
                        </Button>
                      )}
                    </Upload>
                  </Card>
                ))}
              </div>

              {/* TOUR IMAGES */}
              <div className="col-12">
                <label className="d-block font-medium mb-1">Tour Images</label>
                <Dragger
                  multiple
                  listType="picture"
                  beforeUpload={() => false}
                  fileList={previewFiles}
                  onChange={handleImageChange}
                  className="d-block"
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag images here to upload
                  </p>
                </Dragger>
              </div>

              <div className="col-12">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="shadow-none"
                  size="large"
                  loading={addPackageLoading || updatePackageLoading}
                >
                  {id ? "Update Package" : "Add Package"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
