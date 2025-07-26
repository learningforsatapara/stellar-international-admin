import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Empty, Modal, Tooltip } from "antd";

// Icon
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
import svg from "../../assets/svg";

const Index = () => {
  // Use
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector
  const { packages } = useSelector((state) => state.package);

  const [deletePackage, setDeletePackage] = useState({
    open: false,
    content: {},
  });

  const reCall = () => {
    dispatch(
      GetPackage({
        is_domestic_international: "0",
      })
    );
  };

  useEffect(() => {
    reCall();
  }, []);
  return (
    <div className="page">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="title">
            Package {packages?.length ? `(${packages?.length})` : ``}
          </h1>

          <button
            className="btn btn-primary rounded-pill"
            onClick={() => navigate("/package/add")}
          >
            Add
          </button>
        </div>

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
                  <Tooltip
                    title="Package Detail"
                    key="detail"
                    overlayInnerStyle={{
                      backgroundColor: "#f0f9ff", // light blue
                      color: "var(--dark-blue)", // dark blue text
                      borderRadius: 8,
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    <InfoCircleOutlined
                      style={{ color: "var(--dark-blue)" }}
                      onClick={() => navigate(`/package/${item?._id}/detail`)}
                    />
                  </Tooltip>,
                  <Tooltip
                    title="Package Edit"
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
                      onClick={() => navigate(`/package/${item?._id}/edit`)}
                    />
                  </Tooltip>,
                  <Tooltip
                    title="Package Delete"
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
                        setDeletePackage({
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
                    <p className="mb-0 text-primary-2 fs-5">{item.name}</p>
                  }
                  description={
                    <>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <span className="text-capitalize">
                          Theme : {item?.themeId?.name}
                        </span>
                      </p>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <span className="text-capitalize">
                          Type :{" "}
                          {item?.is_domestic_international === "1"
                            ? `Domestic`
                            : `International`}
                        </span>
                      </p>
                      <p className="d-flex align-items-center justify-content-between flex-wrap mb-0">
                        <span className="text-capitalize">
                          Created on : {momentDDMMYY(item?.createdAt)}
                        </span>
                      </p>
                    </>
                  }
                />
              </Card>
            </div>
          ))}

          {packages?.length <= 0 && (
            <Empty
              className="mt-4"
              image={svg?.NoPackagePlaceholder}
              styles={{ image: { height: 100 } }}
              description={
                <span className="text-primary-2">No Package Available</span>
              }
            >
              <button
                className="btn btn-primary rounded-pill"
                onClick={() => navigate("/package/add")}
              >
                Add
              </button>
            </Empty>
          )}
        </div>
      </div>

      <Modal
        title={`Delete ${deletePackage?.content?.name} Package`}
        open={deletePackage?.open}
        onOk={() => {
          const id = deletePackage?.content?._id;
          if (id) {
            dispatch(
              DeletePackage(id, () => {
                setDeletePackage({ open: false, content: {} });
                reCall();
              })
            );
          }
        }}
        onCancel={() => setDeletePackage({ open: false, content: {} })}
        okText="Delete Package"
        cancelText="Cancel"
        centered={true}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{deletePackage?.content?.name}</strong> ?
        </p>
      </Modal>
    </div>
  );
};

export default Index;
