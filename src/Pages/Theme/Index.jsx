import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Empty, Modal } from "antd";

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

  // Selector
  const { theme } = useSelector((state) => state.theme);
  const { themeLoading } = useSelector((state) => state.loading);

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

  useEffect(() => {
    reCall();
  }, []);

  const dataList = [];

  return (
    <div className="page">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="title">Theme</h1>
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
          {dataList?.map((item, index) => (
            <div className="col-lg-4 col-xxl-3 mb-4" key={index}>
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
                  <EditOutlined
                    style={{ color: "var(--orange)" }}
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
                  title={`${item.name} (${item?.package?.length})`}
                  description={
                    <>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <b className="fw-semibold text-capitalize">
                          Created on: {momentDDMMYY(item?.createdAt)}
                        </b>
                      </p>
                    </>
                  }
                />
              </Card>
            </div>
          ))}

          {dataList?.length <= 0 && (
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
          const id = deleteTheme?.content?._id;
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
