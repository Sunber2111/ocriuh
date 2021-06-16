import educationAPI from "app/api/services/education";
import { showError } from "app/notify/notification";
import { RootState } from "app/store";
import {
  setDataGetSCById,
  setInformationSelected,
  setLoadingWhenDetect,
} from "features/photo/photoSlice";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dropdown,
  Grid,
  GridColumn,
  GridRow,
  Input,
  Label,
} from "semantic-ui-react";

interface IProps {
  isLoading?: boolean;
  content?: string | number;
}

const PreviewInfoCommonLabel: React.FC<IProps> = ({
  isLoading = true,
  content,
  children,
}) => {
  if (isLoading) return <div className="animated-background"></div>;

  return <Fragment>{children ? children : <p>{content}</p>}</Fragment>;
};

const PreviewInfoCommon = () => {
  const loadingWhenDetect = useSelector(
    (store: RootState) => store.photo.loadingWhenDetect
  );

  const { informationCommonDetect, isCommonInfoFail } = useSelector(
    (store: RootState) => store.photo
  );

  const data = useSelector(
    (store: RootState) => store.photo.informationCommonSelect
  );

  const [subjectClassId, setSubjectClassId] = useState("");

  const dispatch = useDispatch();

  const handleChangeSelection = (index: any) => {
    dispatch(setInformationSelected(informationCommonDetect[index]));
  };

  const handleClick = () => {
    dispatch(setLoadingWhenDetect(true));
    educationAPI
      .getByIds(subjectClassId)
      .then((res) => {
        if (res.data[0]) {
          dispatch(setDataGetSCById(res.data[0]));
        } else {
          showError("Không tìm thấy !!!", 3000);
        }
      })
      .catch((err) => {
        showError("Không tìm thấy !!!", 3000);
      });
  };

  return (
    <Grid className="wrap-info">
      <div className="wrap-label">
        <Label color={isCommonInfoFail ? "red" : "grey"} basic>
          {isCommonInfoFail
            ? "Vui lòng chụp lại mặt trước hoặc điền mã lớp học phần "
            : loadingWhenDetect
            ? "Đang nhận dạng..."
            : "Phần thông tin nhận diện được 🎉🎉🎉"}
        </Label>
      </div>
      {(isCommonInfoFail || data?.subjectClassId !== 0) && (
        <>
          <GridRow>
            {!isCommonInfoFail && (
              <Label color="grey" basic>
                Bạn có thể tìm lại lớp học phần khác nếu thông tin không chính
                xác
              </Label>
            )}
          </GridRow>
          <GridRow>
            <GridColumn mobile={12} className="term">
              <Input
                className="w-100"
                value={subjectClassId}
                onChange={(e, { value }) => setSubjectClassId(value)}
                placeholder="Nhập mã lớp học phần...."
              />
            </GridColumn>
            <GridColumn mobile={3}>
              <Button color="twitter" onClick={(e) => handleClick()}>
                Tìm
              </Button>
            </GridColumn>
          </GridRow>
        </>
      )}
      <GridRow>
        <p className="p1">Tên giảng viên</p>
        <PreviewInfoCommonLabel
          isLoading={loadingWhenDetect}
          content={data?.teacherName}
        />
      </GridRow>
      <GridRow>
        <p className="p1">Khoa</p>
        <p>Công nghệ thông tin</p>
      </GridRow>
      <GridRow>
        <p className="p1">Môn học</p>
        <PreviewInfoCommonLabel
          isLoading={loadingWhenDetect}
          content={data?.subjectName}
        />
      </GridRow>
      <GridRow>
        <p className="p1">Lớp học phần</p>
        <PreviewInfoCommonLabel isLoading={loadingWhenDetect}>
          <Dropdown
            onChange={(e, { value }) => handleChangeSelection(value)}
            text={data?.subjectClassName}
            options={informationCommonDetect.map((value, index) => {
              return {
                key: index,
                text: value.subjectClassName,
                value: index,
              };
            })}
          />
        </PreviewInfoCommonLabel>
      </GridRow>
      <GridRow>
        <p className="p1">Học kỳ</p>
        <PreviewInfoCommonLabel
          isLoading={loadingWhenDetect}
          content={data?.semester}
        />
      </GridRow>
      <GridRow>
        <p className="p1">Năm Học</p>
        <PreviewInfoCommonLabel
          isLoading={loadingWhenDetect}
          content={data?.yearStudy}
        />
      </GridRow>
    </Grid>
  );
};

export default PreviewInfoCommon;
