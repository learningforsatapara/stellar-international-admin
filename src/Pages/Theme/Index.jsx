import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Empty, List, Modal, Tooltip, Typography } from "antd";

// Icon
import svg from "../../assets/svg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ThemePlaceholder from "../../assets/image/ThemePlaceholder.svg";

// Redux
import { DeleteTheme, GetTheme } from "../../Redux/Redux";

// Helpers
import { momentDDMMYY } from "../../helpers/utils";

// Modal
import { ThemeModal } from "../../Components/Modal/Modal";

const Index = () => {
  // Use
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector
  const { theme } = useSelector((state) => state.theme);

  const [deleteTheme, setDeleteTheme] = useState({
    open: false,
    content: {},
  });

  const [editTheme, setEditTheme] = useState({
    open: false,
    content: undefined,
  });

  const reCall = () => {
    dispatch(GetTheme());
  };

  return (
    <div className="page">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="title">
            Theme {theme?.length ? `(${theme?.length})` : ``}
          </h1>
          <button
            className="btn btn-primary rounded-pill"
            onClick={() => {
              setEditTheme({
                open: true,
                content: undefined,
              });
            }}
          >
            Add
          </button>
        </div>

        <div className="row mt-4">
          {theme?.map((item, index) => (
            <div className="col-md-6 col-lg-4 col-xxl-3 mb-4" key={index}>
              <Card
                className="theme-item antd-card"
                style={{ width: "100%" }}
                cover={
                  <img
                    className="object-fit-cover"
                    alt={item.name}
                    src={item.image}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = ThemePlaceholder;
                    }}
                    style={{
                      minHeight: "175px",
                      maxHeight: "175px",
                      borderBottom: "0.5px solid  #f0f0f0",
                    }}
                  />
                }
                actions={[
                  <Tooltip
                    title="Edit Theme"
                    key="edit"
                    overlayInnerStyle={{
                      backgroundColor: "#f0f9ff", // light blue
                      color: "var(--dark-blue)", // dark blue text
                      borderRadius: 8,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <EditOutlined
                      style={{ color: "var(--dark-blue)" }}
                      onClick={() =>
                        setEditTheme({
                          open: true,
                          content: { ...item },
                        })
                      }
                    />
                  </Tooltip>,
                  <Tooltip
                    title="Delete Theme"
                    key="delete"
                    overlayInnerStyle={{
                      backgroundColor: "#f0f9ff", // light blue
                      color: "#f44336", // dark blue text
                      borderRadius: 8,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <DeleteOutlined
                      style={{ color: "#f44336" }}
                      onClick={() =>
                        setDeleteTheme({
                          open: true,
                          content: { ...item, index },
                        })
                      }
                    />
                  </Tooltip>,
                ]}
              >
                <Card.Meta
                  title={
                    <p className="mb-0 text-primary-2 fs-5">
                      {item.name}
                      {item?.package?.length > 0 && (
                        <span className="text-primary-2 fw-semibold ms-auto cursor-pointer">
                          <Tooltip
                            overlayInnerStyle={{
                              backgroundColor: "#f0f9ff", // light blue
                              color: "var(--dark-blue)", // dark blue text
                              borderRadius: 8,
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                            }}
                            title={
                              <List
                                size="small"
                                dataSource={item?.package}
                                renderItem={(ele) => (
                                  <List.Item
                                    className="cursor-pointer"
                                    onClick={() =>
                                      navigate(`/package/${ele?._id}/detail`)
                                    }
                                  >
                                    <Typography.Text>
                                      {ele?.name}
                                    </Typography.Text>
                                  </List.Item>
                                )}
                              />
                            }
                          >
                            <span className="cursor-pointer">
                              ({item?.package?.length})
                            </span>
                          </Tooltip>
                        </span>
                      )}
                    </p>
                  }
                  description={
                    <>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <span className="text-capitalize">
                          Total Package:{" "}
                          <span className="text-primary-2 fw-semibold">
                            <Tooltip
                              title={
                                <List
                                  size="small"
                                  dataSource={item?.package}
                                  renderItem={(ele) => (
                                    <List.Item
                                      className="cursor-pointer"
                                      onClick={() =>
                                        navigate(`/package/${ele?._id}/detail`)
                                      }
                                    >
                                      <Typography.Text>
                                        {ele?.name}
                                      </Typography.Text>
                                    </List.Item>
                                  )}
                                />
                              }
                            >
                              {item?.package?.length}
                            </Tooltip>
                          </span>
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

          {theme?.length <= 0 && (
            <Empty
              className="mt-4"
              image={svg?.NoThemePlaceholder}
              styles={{ image: { height: 100 } }}
              description={
                <span className="text-primary-2">No Theme Available</span>
              }
            >
              <button
                className="btn btn-primary rounded-pill"
                onClick={() => {
                  setEditTheme({
                    open: true,
                    content: undefined,
                  });
                }}
              >
                Add
              </button>
            </Empty>
          )}
        </div>
      </div>

      <Modal
        title={`Delete ${deleteTheme?.content?.name} Theme`}
        open={deleteTheme?.open}
        onOk={() => {
          const id = deleteTheme?.content?._id || deleteTheme?.content?.id;
          if (id) {
            dispatch(
              DeleteTheme(id, () => {
                setDeleteTheme({ open: false, content: {} });
                reCall();
              })
            );
          }
        }}
        onCancel={() => setDeleteTheme({ open: false, content: {} })}
        okText="Delete Theme"
        cancelText="Cancel"
        centered={true}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{deleteTheme?.content?.name}</strong> ?
        </p>
      </Modal>

      {editTheme?.open && (
        <ThemeModal
          isOpen={editTheme?.open}
          data={editTheme?.content}
          cancelHandler={() => {
            setEditTheme({ open: false, content: {} });
          }}
          successHandler={() => {
            setEditTheme({ open: false, content: {} });
            reCall();
          }}
        />
      )}
    </div>
  );
};

export default Index;
