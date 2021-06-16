import { RootState } from "app/store";
import { openModal } from "features/modal/modalSlice";
import PreViewImage from "features/photo/modals/preview";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridColumn, Label } from "semantic-ui-react";

const PreviewList = () => {
  const data = useSelector((store: RootState) => store.photo.data);

  const dispatch = useDispatch();

  const handleOpen = (index: number, content: string) => {
    dispatch(
      openModal({ body: <PreViewImage indexSelected={index} data={content} /> })
    );
  };

  return (
    <>
      {data.map((imgPreview, index) => (
        <GridColumn mobile={7} className="pre-img">
            <Label basic color="black">
              {imgPreview.isFirst ? "Mặt Trước" : "Mặt sau"}
            </Label>
            <img
              alt="img-first"
              src={imgPreview.content}
              onClick={(e) => handleOpen(index, imgPreview.content)}
            />
        </GridColumn>
      ))}
    </>
  );
};

export default PreviewList;
