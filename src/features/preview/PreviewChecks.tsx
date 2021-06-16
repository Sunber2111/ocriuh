import { contentChecks, contentChecksPracs } from "app/constants/theory.case";
import { RootState } from "app/store";
import { setSelectChecks } from "features/photo/photoSlice";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment } from "semantic-ui-react";
import PreviewCheckItem from "./PreviewCheckItem";

const PreviewChecks = () => {
  const { checks, isDetectTheory } = useSelector(
    (store: RootState) => store.photo
  );

  const dispatch = useDispatch();

  const onChangeSelect = useCallback(
    (row: number, col: number, value: any) => {
      dispatch(setSelectChecks({ row, col, choose: value }));
    },
    [dispatch]
  );

  const createCheck = () => {
    let comps: any = [];
    let indexR = 0;
    for (let key in contentChecksPracs) {
      comps.push(
        <Segment>
          {contentChecksPracs[key].map((x: any, id: any) => (
            <PreviewCheckItem
              row={indexR}
              col={id}
              onChangeSelect={onChangeSelect}
              key={id}
              label={x}
              check={checks[indexR][id]}
            />
          ))}
        </Segment>
      );
      indexR++;
    }
    return comps;
  };

  return (
    <div className="pre-checks">
      {isDetectTheory ? (
        <>
          <Segment>
            {contentChecks.part1.map((x, id) => (
              <PreviewCheckItem
                row={0}
                col={id}
                onChangeSelect={onChangeSelect}
                key={id}
                label={x}
                check={checks[0][id]}
              />
            ))}
          </Segment>
          <Segment>
            {contentChecks.part2.map((x, id) => (
              <PreviewCheckItem
                row={1}
                col={id}
                onChangeSelect={onChangeSelect}
                key={id}
                label={x}
                check={checks[1][id]}
              />
            ))}
          </Segment>
          <Segment>
            {contentChecks.part3.map((x, id) => (
              <PreviewCheckItem
                row={2}
                col={id}
                onChangeSelect={onChangeSelect}
                key={id}
                label={x}
                check={checks[2][id]}
              />
            ))}
          </Segment>
          <Segment>
            {contentChecks.part4.map((x, id) => (
              <PreviewCheckItem
                row={3}
                col={id}
                onChangeSelect={onChangeSelect}
                key={id}
                label={x}
                check={checks[3][id]}
              />
            ))}
          </Segment>
        </>
      ) : (
        <>{createCheck()}</>
      )}
    </div>
  );
};

export default React.memo(PreviewChecks);
