import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Empty, Modal, Table } from "antd";

// Icon
import svg from "../../assets/svg";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import PackagePlaceholder from "../../assets/image/PackagePlaceholder.svg";

// Redux
import { DeletePackage, GetPackage } from "../../Redux/Redux";

// Helpers
import { momentDDMMYY } from "../../helpers/utils";

const Index = () => {
  // Use
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Selector
  const { packages } = useSelector((state) => state.package);
  const { packageLoading } = useSelector((state) => state.loading);

  const [deletePackage, setDeletePackage] = useState({
    open: false,
    content: {},
  });

  return (
    <div className="page">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="title">Package</h1>
          <button
            className="btn btn-primary rounded-pill"
            onClick={() => navigate("/package/add")}
          >
            Add
          </button>
        </div>

        {/* <div className="card card-shadow rounded-4 border-0 overflow-hidden mb-4">
          <div className="card-body p-0 shadow-sm">
            <Table
              dataSource={packageLoading || []}
              className={"antTable"}
              loading={packageLoading}
              pagination={false}
              scroll={{ x: 768 }}
              columns={
                ({
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                  className: "text-capitalize",
                },
                {
                  title: "Theme ID",
                  dataIndex: "themeId",
                  key: "themeId",
                  className: "text-capitalize",
                  render: (themeId) => (themeId?.name ? themeId?.name : "-"),
                },
                {
                  title: "Domestic/International",
                  dataIndex: "is_domestic_international",
                  key: "is_domestic_international",
                  className: "text-capitalize",
                  render: (value) =>
                    value === "1" ? "Domestic" : "International",
                },
                {
                  title: "Duration",
                  dataIndex: "duration",
                  key: "duration",
                  className: "text-capitalize",
                },
                {
                  title: "Services",
                  dataIndex: "services",
                  key: "services",
                  className: "text-capitalize",
                  render: (services = []) => {
                    const provider = dpList(services || [], 3);
                    const { list, length, sliceLength, sliceList } =
                      provider || {};

                    return (
                      <Flex gap="4px 0" wrap className="last-item-m-0">
                        {list?.map((ele, index) => (
                          <Tag key={index} style={PopOverStyle}>
                            {ele?.name}
                          </Tag>
                        ))}

                        {length > sliceLength && (
                          <Popover
                            content={
                              <>
                                <Flex
                                  gap="4px 0"
                                  wrap
                                  className="last-item-m-0"
                                >
                                  {sliceList?.map((ele, index) => (
                                    <Tag key={index} style={PopOverStyle}>
                                      {ele?.name}
                                    </Tag>
                                  ))}
                                </Flex>
                              </>
                            }
                            trigger="hover"
                          >
                            <Tag style={PopOverStyle}>
                              +{length - sliceLength}
                            </Tag>
                          </Popover>
                        )}
                      </Flex>
                    );
                  },
                },
                {
                  title: "Created",
                  dataIndex: "createdAt",
                  key: "createdAt",
                  className: "text-capitalize",
                  render: (val) => formatToIST12Hour(val),
                },
                {
                  title: "Action",
                  key: "action",
                  className: "text-capitalize",
                  align: "center",
                  render: (_, record) => {
                    const handleMenuClick = ({ key }) => {
                      switch (key) {
                        case "view":
                          setPackageDetail({ open: true, data: record });
                          break;
                        case "edit":
                          setDetail({ open: true, data: record });
                          break;
                        case "delete":
                          handleDelete(record._id);
                          break;
                        default:
                          break;
                      }
                    };

                    const menu = (
                      <Menu onClick={handleMenuClick}>
                        <Menu.Item key="view" icon={<EyeOutlined />}>
                          View
                        </Menu.Item>
                        <Menu.Item key="edit" icon={<EditOutlined />}>
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          key="delete"
                          icon={<DeleteOutlined />}
                          danger
                        >
                          Delete
                        </Menu.Item>
                      </Menu>
                    );

                    return (
                      <Dropdown
                        overlay={menu}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <Button icon={<EllipsisOutlined />} />
                      </Dropdown>
                    );
                  },
                })
              }
            />
          </div>
        </div> */}

        <div className="row mb-4">
          {packages?.map((item, index) => (
            <div className="col-lg-4 col-xxl-3 mb-4" key={index}>
              <Card
                className="theme-item antd-card"
                style={{ width: "100%" }}
                cover={
                  <img
                    className="object-fit-cover"
                    alt={item?.name}
                    src={item?.tourImages?.[0] || PackagePlaceholder}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = PackagePlaceholder;
                    }}
                    style={{
                      minHeight: "175px",
                      maxHeight: "175px",
                      borderBottom: "0.5px solid  #f0f0f0",
                    }}
                  />
                }
                actions={[
                  <InfoCircleOutlined style={{ color: "var(--dark-blue)" }} />,
                  <EditOutlined
                    style={{ color: "var(--dark-blue)" }}
                    onClick={() =>
                      setEditTheme({
                        open: true,
                        content: { ...item },
                      })
                    }
                  />,
                  <DeleteOutlined
                    style={{ color: "var(--orange)" }}
                    onClick={() =>
                      setDeleteTheme({
                        open: true,
                        content: { ...item, index },
                      })
                    }
                  />,
                ]}
              >
                <Card.Meta
                  title={`${item.name}`}
                  description={
                    <>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <span className="text-capitalize">
                          Theme: {item?.themeId?.name}
                        </span>
                      </p>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <span className="text-capitalize">
                          Type:{" "}
                          {item?.is_domestic_international === "1"
                            ? `Domestic`
                            : `International`}
                        </span>
                      </p>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <span className="text-capitalize">
                          Created on: {momentDDMMYY(item?.createdAt)}
                        </span>
                      </p>
                    </>
                  }
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
