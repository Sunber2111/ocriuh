import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { closeModal } from "./modalSlice";

const ModalContainer = () => {
  const { open, body, size } = useSelector((store: RootState) => store.modal);

  return (
    <Modal open={open} onClose={closeModal} size={size}>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

export default ModalContainer;
