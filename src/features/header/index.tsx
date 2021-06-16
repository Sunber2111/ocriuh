import React from "react";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import logo from "assets/Logo_IUH.png";
import "./styles.scss";
import { history } from "index";

const Header = () => {
  const handleClick = () => {
    history.push("/");
  };

  return (
    <div className="header-bar">
      <Grid>
        <GridRow>
          <GridColumn mobile={6}>
            <img src={logo} alt="logo" onClick={(e) => handleClick()} />
          </GridColumn>
          <GridColumn mobile={10} className="wrap-title">
            <p onClick={(e) => handleClick()}>Khoa Công Nghệ Thông Tin</p>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
};

export default Header;
