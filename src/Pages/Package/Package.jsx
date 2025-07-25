import React, { useEffect, useState } from "react";
import { FieldArray, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Empty, Input, Modal, Upload } from "antd";
import { useNavigate, useParams } from "react-router-dom";

// Icon
import svg from "../../assets/svg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ThemePlaceholder from "../../assets/image/ThemePlaceholder.svg";

// Redux
import { AddPackage, GetPackageId, UpdatePackage } from "../../Redux/Redux";

// Helpers
import { PackageValidation } from "../../helpers/schema/authSchema";
import Dragger from "antd/es/upload/Dragger";

const Package = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [images, setImages] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      duration: "",
      themeId: "",
      is_domestic_international: "1",
      locations: [],
      services: [],
    },
    validationSchema: PackageValidation,
    onSubmit: (values) => {
      const data = new FormData();
      data.append("themeId", values.themeId);
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("duration", values.duration);
      data.append(
        "locations",
        JSON.stringify(
          values.locations.map((loc, i) => ({
            ...loc,
            image: loc.image.name, // only name in metadata
          }))
        )
      );
      data.append("services", JSON.stringify(values.services));
      data.append(
        "is_domestic_international",
        values.is_domestic_international
      );

      // Append tourImages
      previewFiles.forEach((file) =>
        data.append("tourImages", file.originFileObj)
      );

      // Optional: Add location images to FormData too if API needs them separately
      values.locations.forEach((loc, idx) => {
        data.append(`locationImages[${idx}]`, loc.image);
      });

      if (id) {
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
  return (
    <div className="page">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="title">Add Package</h1>
        </div>

        <div className="card card-shadow rounded-4 border-0 overflow-hidden mb-4">
          <div className="card-body shadow-sm">
            <form onSubmit={formik.handleSubmit} noValidate className="row g-4">
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
                <textarea
                  rows={4}
                  type="text"
                  name="description"
                  className={`form-control form-control-lg fs-6 ${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Enter your package name"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">
                  {formik.touched.description && formik.errors.description}
                </div>
              </div>

              {/* LOCATIONS */}
              <div className="col-12">
                <label className="block font-medium mb-1">Location</label>{" "}
                <br />
                {formik.values.locations.map((loc, index) => (
                  <Card
                    key={index}
                    title={`Location ${index + 1}`}
                    style={{ marginBottom: 16 }}
                    extra={
                      index > 0 && (
                        <Button
                          danger
                          onClick={() => {
                            const updated = [...formik.values.locations];
                            updated.splice(index, 1);
                            formik.setFieldValue("locations", updated);
                          }}
                        >
                          Remove
                        </Button>
                      )
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
                      beforeUpload={(file) => {
                        const updated = [...formik.values.locations];
                        updated[index].image = file;
                        formik.setFieldValue("locations", updated);
                        return false;
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
                      <Button icon={<UploadOutlined />}>
                        Upload Location Image
                      </Button>
                    </Upload>
                  </Card>
                ))}
                <Button
                  size="large"
                  icon={<PlusOutlined />}
                  type="dashed"
                  onClick={() => {
                    const updated = [...formik.values.locations];
                    updated.push({ name: "", description: "", image: null });
                    formik.setFieldValue("locations", updated);
                  }}
                >
                  Add Location
                </Button>
              </div>

              {/* TOUR IMAGES */}
              <div className="col-12">
                <label className="block font-medium mb-1">Tour Images</label>
                <Dragger
                  multiple
                  beforeUpload={() => false}
                  fileList={previewFiles}
                  onChange={({ fileList }) => setPreviewFiles(fileList)}
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag images here to upload
                  </p>
                </Dragger>
              </div>

              <div className="col-12"></div>

              <div className="col-12">
                <Button type="primary" htmlType="submit" size="large">
                  {id ? "Update Package" : "Create Package"}
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
