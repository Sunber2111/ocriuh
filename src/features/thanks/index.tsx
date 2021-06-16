import React from "react";
import "./styles.scss";
import pic from "assets/tkb.jpg";
import { Image } from "semantic-ui-react";
import Header from "features/header";

const ThanksPage = () => {
  return (
    <div className="thank-page">
      <Header />
      <div className="title">
        <h1>Cảm ơn bạn đã tham gia chương trình khảo sát 🎉</h1>
      </div>
      <div className="wrap-img">
        <Image src={pic} size="large" alt="logo" />
      </div>
    </div>
  );
};

export default ThanksPage;
