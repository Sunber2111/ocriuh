import { convertStateHW } from "app/helpers/convert";
import { RootState } from "app/store";
import {
  detectChecksFirst,
  detectChecksFirstPrac,
  detectChecksSecond,
  detectChecksSecPrac,
  detectInfomationCommon,
} from "features/photo/actions/async-action";
import { insertNewPhoto, setStateDetect } from "features/photo/photoSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button, Grid, GridRow, Label } from "semantic-ui-react";
import PreviewList from "./PreviewList";
import "./styles.scss";
import { history } from "index";
import "react-html5-camera-photo/build/css/index.css";
import Camera from "react-html5-camera-photo";

const constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
    facingMode: {
      exact: "environment",
    },
  },
};

interface IParams {
  practice?: string;
}

const TakePicture = () => {
  const params = useParams<IParams>();

  const dispatch = useDispatch();

  const numOfPics = useSelector((state: RootState) => state.photo.data.length);

  const dataOfPhoto = useSelector((state: RootState) => state.photo.data);

  const [loading, setloading] = useState<boolean>(true);

  const cameraRef = useRef<HTMLVideoElement>();

  const handleStream = (stream: MediaStream) => {
    if (cameraRef.current) {
      cameraRef.current.srcObject = null;
      cameraRef.current.srcObject = stream;
      if (loading) setloading(false);
    }
  };

  const startStream = async (constraints: MediaStreamConstraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleStream(stream);
  };

  const handleTakePhoto = () => {
    if (cameraRef.current) {
      const canvas = document.createElement("canvas");
      const result = convertStateHW(
        cameraRef.current.videoHeight,
        cameraRef.current?.videoWidth
      );

      canvas.width = result.width;
      canvas.height = result.height;

      canvas
        .getContext("2d")
        ?.drawImage(
          cameraRef.current,
          result.skipWidth,
          result.skipHeight,
          result.width,
          result.height,
          0,
          0,
          result.width,
          result.height
        );

      dispatch(insertNewPhoto(canvas.toDataURL()));
    }
  };

  const handleDetect = () => {
    history.push("/preview");
    dispatch(
      detectInfomationCommon(
        dataOfPhoto.filter((x) => x.isFirst === true)[0].content,
        true
      )
    );
    if (params.practice === "theory") {
      dispatch(
        detectChecksFirst(
          dataOfPhoto.filter((x) => x.isFirst === true)[0].content
        )
      );

      dispatch(
        detectChecksSecond(
          dataOfPhoto.filter((x) => x.isFirst === false)[0].content
        )
      );
    } else {
      dispatch(
        detectChecksFirstPrac(
          dataOfPhoto.filter((x) => x.isFirst === true)[0].content,
          false
        )
      );

      dispatch(
        detectChecksSecPrac(
          dataOfPhoto.filter((x) => x.isFirst === false)[0].content,
          false
        )
      );
    }
  };

  useEffect(() => {
    // if (
    //   "mediaDevices" in navigator &&
    //   "getUserMedia" in navigator.mediaDevices
    // ) {
    //   startStream(constraints);
    // }
    if (params.practice === "theory") {
      dispatch(setStateDetect(true));
    } else {
      dispatch(setStateDetect(false));
    }
  }, []);

  function handleTakePhoto2(dataUri: string) {
    let canvas = document.createElement("canvas");

    let image = new Image();

    image.onload = function () {
      const result = convertStateHW(image.height, image.width);

      canvas.width = result.width;
      canvas.height = result.height;

      

      canvas
        .getContext("2d")
        ?.drawImage(
          image,
          result.skipWidth,
          result.skipHeight,
          result.width,
          result.height,
          0,
          0,
          result.width,
          result.height
        );

      dispatch(insertNewPhoto(canvas.toDataURL()));
    };

    image.src = dataUri;
  }

  return (
    <div className="wrap-tak-pic">
      <Grid>
        <GridRow className="wrap-des">
          <Label color="black" basic>
            Bạn vui lòng chụp nội dung mặt trước cua phiếu tại đây 😉
          </Label>
        </GridRow>
        <GridRow className="wrap-detect">
          <div className="wrap-video">
            {/* <video
              muted
              ref={(ref) => {
                if (ref) {
                  cameraRef.current = ref;
                  ref.play();
                }
              }}
              autoPlay
              playsInline
            ></video> */}

            <Camera
              isImageMirror={false}
              isSilentMode={true}
              onTakePhoto={(dataUri) => {
                handleTakePhoto2(dataUri);
              }}
              isFullscreen={true}
              idealFacingMode={"environment"}
            />

            <div className="detect"></div>
          </div>
          {/* <GridRow className="wrap-btn">
            <Button
              loading={loading}
              size="medium"
              color="twitter"
              onClick={(e) => handleTakePhoto()}
            >
              Chụp
            </Button>
          </GridRow> */}
        </GridRow>

        <GridRow>
          <PreviewList />
        </GridRow>
        <GridRow className="wrap-btn">
          {numOfPics === 2 && (
            <Button
              size="medium"
              color="youtube"
              onClick={(e) => handleDetect()}
            >
              Nhận diện
            </Button>
          )}
        </GridRow>
      </Grid>
    </div>
  );
};

export default TakePicture;
