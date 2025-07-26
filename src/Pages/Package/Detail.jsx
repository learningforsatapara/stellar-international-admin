import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Flex, Image, List, Tag } from "antd";

// icons
import { ArrowLeftOutlined } from "@ant-design/icons";
import LocationPlaceholder from "../../assets/image/LocationError.png";

// Redux
import { GetPackageId } from "../../Redux/Redux";
import { momentDDMMYY } from "../../helpers/utils";

export const PopOverStyle = {
  cursor: "default",
  background: "#14183E",
  color: "#fff",
  textTransform: "capitalize",
  padding: ".35rem .65rem",
  borderRadius: 8,
};

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Selector
  const { packageDetail } = useSelector((state) => state.package);
  const {
    themeId,
    description,
    name,
    duration,
    is_domestic_international,
    services,
    locations,
    tourImages,
    createdAt,
    updatedAt,
  } = packageDetail || {};
  useEffect(() => {
    if (id) dispatch(GetPackageId(id));
  }, [id]);

  return (
    <div className="page package-detail">
      <div className="container-fluid overflow-hidden">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1
            className="title d-flex gap-2 align-content-center cursor-pointer"
            onClick={() => navigate("/package")}
          >
            <ArrowLeftOutlined style={{ fontSize: 18 }} />
            {name} Package
          </h1>
        </div>

        <div className="card card-shadow rounded-4 border-0 overflow-hidden mb-4">
          <div className="card-body shadow-sm">
            <div className="row gy-3">
              <div className="col-6">
                <h6 className="mb-1">Package Name</h6>
                <p className="mb-0 txt-gray">{name}</p>
              </div>
              <div className="col-6">
                <h6 className="mb-1">Theme Name</h6>
                <p className="mb-0 txt-gray">{themeId?.name}</p>
              </div>
              <div className="col-6">
                <h6 className="mb-1">Domestic/International</h6>
                <p className="mb-0 txt-gray">
                  {is_domestic_international == 1
                    ? `Domestic`
                    : `International`}
                </p>
              </div>
              <div className="col-6">
                <h6 className="mb-1">Duration</h6>
                <p className="mb-0 txt-gray">{duration}</p>
              </div>
              <div className="col-12">
                <h6 className="mb-1">Description</h6>
                <p className="mb-0 txt-gray">{description}</p>
              </div>
              <div className="col-12">
                <h6 className="mb-1">Locations</h6>
                <List
                  itemLayout="horizontal"
                  dataSource={locations}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Image
                            src={item?.image || LocationPlaceholder}
                            width={60}
                            height={60}
                            style={{ objectFit: "cover", borderRadius: 8 }}
                            alt={item?.name}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = LocationPlaceholder;
                            }}
                          />
                        }
                        title={item?.name}
                      />
                    </List.Item>
                  )}
                />
              </div>
              <div className="col-12">
                <h6 className="mb-2">Services</h6>
                <Flex gap="4px 0" wrap className="last-item-m-0">
                  {services?.map((ele, index) => (
                    <Tag key={index} style={PopOverStyle}>
                      {ele?.name}
                    </Tag>
                  ))}
                </Flex>
              </div>

              <div className="col-12 package-drawer">
                <h6 className="mb-2">Tour Images</h6>
                <div className="tour-images">
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                    }}
                  >
                    {tourImages?.map((src, index) => (
                      <Image
                        key={index}
                        src={src}
                        alt={`tour-image-${index}`}
                      />
                    ))}
                  </Image.PreviewGroup>
                </div>
              </div>

              <div className="col-6">
                <h6 className="mb-1">Created By</h6>
                <p className="mb-0 txt-gray">{momentDDMMYY(createdAt)}</p>
              </div>
              <div className="col-6">
                <h6 className="mb-1">Updated By</h6>
                <p className="mb-0 txt-gray">{momentDDMMYY(updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
