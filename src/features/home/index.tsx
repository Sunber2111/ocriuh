import React from "react";
import { Button, Grid, GridColumn, GridRow } from "semantic-ui-react";
import "./styles.scss";
import logo from "assets/Logo_IUH.png";
import bg from "assets/bg.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Grid className="home-page">
      <GridRow>
        <GridColumn mobile={6}>
          <img src={logo} alt="logo_iuh" className="logo" />
        </GridColumn>
        <GridColumn mobile={10} className="d-flex">
          <p>Khoa công nghệ thông tin</p>
        </GridColumn>
      </GridRow>
      <GridRow className="wrap-title">
        <h1>Ứng dụng quét thông tin phiếu khảo sát đánh giá giảng viên</h1>
      </GridRow>
      <GridRow>
        <GridColumn mobile={16}>
          <img src={bg} alt="bg" />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn className="app-c">
          <div className="til">App Creater </div>
          <div className="cre">
            <p>TS. Đặng Thị Phúc</p>
            <p>Sv. Đặng Hoài Nam</p>
            <p>Sv. Trần Quang Vũ</p>
          </div>
        </GridColumn>
      </GridRow>
      <GridRow className="wrap-btn">
        <GridColumn mobile={8}>
          <Button className="btn-practice" as={Link} to="/photo/takepicture/practice">
            Quét phiếu khảo sát Thực Hành
          </Button>
        </GridColumn>
        <GridColumn mobile={8}>
          <Button className="btn-theory" as={Link} to="/photo/takepicture/theory">
            Quét phiếu khảo sát Lý Thuyết
          </Button>
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default HomePage;
