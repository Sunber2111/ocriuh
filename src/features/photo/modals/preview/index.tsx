import { closeModal } from "features/modal/modalSlice";
import { removePhoto } from "features/photo/photoSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, GridRow, Image } from "semantic-ui-react";
import "./styles.scss";

interface IProps {
  indexSelected: number;
  data: string;
}

const PreViewImage: React.FC<IProps> = ({ indexSelected, data }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    dispatch(removePhoto(indexSelected));
    dispatch(closeModal());
  };

  return (
    <div className="preview-modal">
      <div className="wrap-img">
        <Image src={data} alt="preview-img" size="massive" />
      </div>
      <GridRow>
        <Button.Group>
          <Button color="youtube" onClick={(e) => handleDelete()}>
            Xóa
          </Button>
          <Button.Or />
          <Button onClick={(e) => handleCloseModal()}>Thoát</Button>
        </Button.Group>
      </GridRow>
    </div>
  );
};

export default PreViewImage;
