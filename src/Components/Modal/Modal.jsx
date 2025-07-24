import React from "react";
import { Modal } from "antd";
import imageCompression from "browser-image-compression";

// Image
import Close from "../../assets/Images/Icons/Close.svg";

// Close Icon Image
const CloseIcon = () => <img src={Close} alt="close" />;

/** Function to compress image before API call */
export const imageCompressorFn = async (file, setState) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compFile = await imageCompression(file, options);
    setState(compFile);
  } catch (error) {
    setState(file);
  }
};

// GoRebelModal
export const BasicModal = ({ isOpen, cancelSuperHandler }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={cancelSuperHandler}
      maskClosable={false}
      closable={true}
      centered={true}
      closeIcon={<CloseIcon />}
      width={"32.5rem"}
      footer={null}
      className="basic-modal"
    >
      <GoRebel />
    </Modal>
  );
};
