import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Empty, List, Modal, Tooltip, Typography } from "antd";

// Icon
import svg from "../assets/svg";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import ThemePlaceholder from "../../assets/image/ThemePlaceholder.svg";

// Redux
import { DeleteHero, GetHero } from "../Redux/Redux";

// Helpers
import { momentDDMMYY } from "../helpers/utils";
import { HeroModal } from "../Components/Modal/Modal";

// Modal
// import { ThemeModal } from "../../Components/Modal/Modal";

const Hero = () => {
  // Use
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector
  const { hero } = useSelector((state) => state.hero);

  const [deleteHero, setDeleteHero] = useState({
    open: false,
    content: {},
  });

  const [editHero, setEditHero] = useState({
    open: false,
    content: undefined,
  });

  const reCall = () => {
    dispatch(GetHero());
  };

  useEffect(() => {
    reCall();
  }, []);

  return (
    <div className="page">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="title">
            Hero {hero?.length ? `(${hero?.length})` : ``}
          </h1>
          <button
            className="btn btn-primary rounded-pill"
            onClick={() => {
              setEditHero({
                open: true,
                content: undefined,
              });
            }}
          >
            Add
          </button>
        </div>

        <div className="row mt-4">
          {hero?.map((item, index) => (
            <div className="col-md-6 col-lg-4 col-xxl-3 mb-4" key={index}>
              <Card
                className="hero-item antd-card"
                style={{ width: "100%" }}
                cover={
                  <img
                    className="object-fit-cover"
                    alt={item.image}
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
                    title="Delete Hero"
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
                        setDeleteHero({
                          open: true,
                          content: { ...item, index },
                        })
                      }
                    />
                  </Tooltip>,
                ]}
              ></Card>
            </div>
          ))}

          {hero?.length <= 0 && (
            <Empty
              className="mt-4"
              image={svg?.NoThemePlaceholder}
              styles={{ image: { height: 100 } }}
              description={
                <span className="text-primary-2">No Hero Available</span>
              }
            >
              <button
                className="btn btn-primary rounded-pill"
                onClick={() => {
                  setDeleteHero({
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
        title={`Delete Hero`}
        open={deleteHero?.open}
        onOk={() => {
          const id = deleteHero?.content?._id || deleteHero?.content?.id;
          if (id) {
            dispatch(
              DeleteHero(id, () => {
                setDeleteHero({ open: false, content: {} });
                reCall();
              })
            );
          }
        }}
        onCancel={() => setDeleteHero({ open: false, content: {} })}
        okText="Delete Hero"
        cancelText="Cancel"
        centered={true}
      >
        <p>Are you sure you want to delete ?</p>
      </Modal>

      {editHero?.open && (
        <HeroModal
          isOpen={editHero?.open}
          data={editHero?.content}
          cancelHandler={() => {
            setEditHero({ open: false, content: {} });
          }}
          successHandler={() => {
            setEditHero({ open: false, content: {} });
            reCall();
          }}
        />
      )}
    </div>
  );
};

export default Hero;
