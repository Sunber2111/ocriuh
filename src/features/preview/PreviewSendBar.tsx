import { RootState } from "app/store";
import {
  sendRating,
  sendRatingPracs,
} from "features/photo/actions/async-action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";

const PreviewSendBar = () => {
  const { checks, informationCommonSelect, isDetectTheory } = useSelector(
    (store: RootState) => store.photo
  );

  const dispatch = useDispatch();

  const handleSend = () => {
    if (informationCommonSelect?.subjectClassId) {
      if (isDetectTheory) {
        dispatch(sendRating(checks, informationCommonSelect.subjectClassId));
      } else {
        dispatch(
          sendRatingPracs(checks, informationCommonSelect.subjectClassId)
        )
      }
    }
  };

  return (
    <div>
      <div className="send-bar"></div>
      <div className="btn-circle" onClick={(e) => handleSend()}>
        <Icon name="send" size="big" />
      </div>
    </div>
  );
};

export default React.memo(PreviewSendBar);
