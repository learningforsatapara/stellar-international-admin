import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Empty, Input, Modal, Upload } from "antd";

// Icon
import svg from "../../assets/svg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ThemePlaceholder from "../../assets/image/ThemePlaceholder.svg";

// Redux
import { DeletePackage, GetPackage } from "../../Redux/Redux";

// Helpers
import { momentDDMMYY } from "../../helpers/utils";
import { FieldArray, useFormik } from "formik";
import { PackageValidation } from "../../helpers/schema/authSchema";
import Dragger from "antd/es/upload/Dragger";

const Package = () => {
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
      const formData = new FormData();
    },
  });
  return (
    <div className="page">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="title">Add Package</h1>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate className="row g-4">
          <Input
            placeholder="Theme ID"
            value={formik.values.themeId}
            onChange={(e) => formik.setFieldValue("themeId", e.target.value)}
          />

          <div className="col-md-6">
            <label className="form-label">Package Name</label>
            <input
              type="text"
              name="name"
              className={`form-control form-control-lg fs-6 ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
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
            <label className="block font-medium mb-1">Location</label> <br />
            <FieldArray name="locations">
              {({ push, remove }) => (
                <>
                  {formik?.values?.locations?.map((loc, index) => (
                    <Card
                      key={index}
                      title={`Location ${index + 1}`}
                      style={{ marginBottom: 16 }}
                      extra={
                        index > 0 && (
                          <Button danger onClick={() => remove(index)}>
                            Remove
                          </Button>
                        )
                      }
                    >
                      <Input
                        placeholder="Location Name"
                        value={loc.name}
                        onChange={(e) =>
                          setFieldValue(
                            `locations[${index}].name`,
                            e.target.value
                          )
                        }
                      />
                      <Input
                        placeholder="Description"
                        value={loc.description}
                        onChange={(e) =>
                          setFieldValue(
                            `locations[${index}].description`,
                            e.target.value
                          )
                        }
                      />
                      <Upload
                        beforeUpload={(file) => {
                          setFieldValue(`locations[${index}].image`, file);
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
                    icon={<PlusOutlined />}
                    type="dashed"
                    onClick={() =>
                      push({ name: "", description: "", image: null })
                    }
                  >
                    Add Location
                  </Button>
                </>
              )}
            </FieldArray>
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
        </form>
      </div>
    </div>
  );
};

export default Package;
