import { selectionChecks } from "app/constants/selection.checks";
import { RootState } from "app/store";
import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

interface IProps {
  label: string;
  check: number;
  row: number;
  col: number;
  onChangeSelect: (row: number, col: number, value: any) => void;
}

const detectStateLoading = (
  loadingFirst: boolean,
  loadingSecond: boolean,
  isDetectTheory: boolean,
  row: number,
  col: number
) => {
  if (isDetectTheory) {
    if (row < 2) {
      if (row === 0) {
        if (loadingFirst) return true;
        return false;
      } else {
        if (col < 2) {
          if (loadingFirst) return true;
          return false;
        }
      }
    }

    if (row >= 1) {
      if (row === 1) {
        if (col >= 2) {
          if (loadingSecond) return true;
          return false;
        }
      } else {
        if (loadingSecond) return true;
        return false;
      }
    }
  }
};

const PreviewCheckItem: React.FC<IProps> = ({
  label,
  check,
  onChangeSelect,
  row,
  col,
}) => {
  const { loadingChecksFirst, isDetectTheory, loadingChecksSecond } =
    useSelector((store: RootState) => store.photo);

  const loading = detectStateLoading(
    loadingChecksFirst,
    loadingChecksSecond,
    isDetectTheory,
    row,
    col
  );

  return (
    <div className="pre-view-check">
      <div className="label">{label}</div>
      <div className="check">
        {loading ? (
          <Loader active inline />
        ) : (
          <Dropdown
            onChange={(e, { value }) => onChangeSelect(row, col, value)}
            text={check + ""}
            options={selectionChecks.map((value, index) => {
              return {
                key: index,
                text: value,
                value: index + 1,
              };
            })}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(PreviewCheckItem);
