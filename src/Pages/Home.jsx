import React from "react";
import { Button, Dropdown, Flex, Menu, Popover, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Assets
import { EyeOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";

// helpers
import { momentDDMMYY } from "../helpers/utils";
import { PopOverStyle } from "./Package/Detail";
import { dpList } from "../Components/Modal/Modal";

const Home = () => {
  const navigate = useNavigate();
  // Selector
  const { theme } = useSelector((state) => state.theme);
  const { packages } = useSelector((state) => state.package);
  const { themeLoading, packageLoading } = useSelector(
    (state) => state.loading
  );
  return (
    <div className="page">
      <div className="container-fluid">
        <h1 className="title">Theme</h1>
        <div className="card card-shadow rounded-4 border-0 overflow-hidden my-4">
          <div className="card-body shadow-sm">
            <Table
              dataSource={theme || []}
              className={`antTable `}
              loading={themeLoading}
              pagination={false}
              scroll={{ x: 768 }}
              columns={[
                {
                  title: "Theme Name",
                  dataIndex: "name",
                  key: "name",
                  className: "text-capitalize",
                  width: "160px",
                  ellipsis: true,
                },
                {
                  title: "Theme Total Packages",
                  dataIndex: "Package",
                  key: "Package",
                  className: "text-capitalize",
                  render: (_, data) => {
                    const provider = dpList(data?.package || [], 3);
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
                  title: "Created At",
                  dataIndex: "CreatedAt",
                  key: "CreatedAt",
                  width: "200px",
                  align: "center",
                  render: (_, data) => {
                    return momentDDMMYY(data?.createdAt);
                  },
                },
                {
                  title: "Updated At",
                  dataIndex: "updatedAt",
                  key: "updatedAt",
                  width: "200px",
                  align: "center",
                  render: (_, data) => {
                    return data?.updatedAt
                      ? momentDDMMYY(data?.updatedAt)
                      : "-";
                  },
                },
              ]}
            />
          </div>
        </div>
        <h1 className="title">Package</h1>
        <div className="card card-shadow rounded-4 border-0 overflow-hidden my-4">
          <div className="card-body shadow-sm">
            <Table
              dataSource={packages || []}
              className={`antTable `}
              loading={packageLoading}
              pagination={false}
              scroll={{ x: 768 }}
              columns={[
                {
                  title: "Package Name",
                  dataIndex: "name",
                  key: "name",
                  width: "160px",
                  ellipsis: true,
                  className: "text-capitalize",
                },
                {
                  title: "Tour Type",
                  dataIndex: "is_domestic_international",
                  key: "is_domestic_international",
                  className: "text-capitalize",
                  width: "160px",
                  render: (value) =>
                    value === "1" ? "Domestic" : "International",
                },
                {
                  title: "Package Duration",
                  dataIndex: "duration",
                  key: "duration",
                  className: "text-capitalize",
                  width: "240px",
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
                  title: "Created At",
                  dataIndex: "CreatedAt",
                  key: "CreatedAt",
                  width: "180px",
                  align: "center",
                  render: (_, data) => {
                    return momentDDMMYY(data?.createdAt);
                  },
                },
                {
                  title: "Updated At",
                  dataIndex: "updatedAt",
                  key: "updatedAt",
                  width: "180px",
                  align: "center",
                  render: (_, data) => {
                    return data?.updatedAt
                      ? momentDDMMYY(data?.updatedAt)
                      : "-";
                  },
                },
                {
                  title: "Action",
                  key: "action",
                  width: "100px",
                  className: "text-capitalize",
                  align: "center",
                  render: (_, record) => {
                    const handleMenuClick = ({ key }) => {
                      switch (key) {
                        case "view":
                          navigate(`/package/${record?._id}/detail`);
                          break;
                        case "edit":
                          navigate(`/package/${record?._id}/edit`);
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
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
