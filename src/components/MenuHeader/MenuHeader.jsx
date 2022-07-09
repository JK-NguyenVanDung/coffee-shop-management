import React, { useEffect, useState } from "react";
import "./styles.scss";

import { menuText } from "../../helper/Text";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Switch, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material/";
const { Search } = Input;

const MenuHeader = () => {
  function onSearch() {}
  return (
    <div className="centeredCont">
      <Switch
        checkedChildren={menuText.switchOp1}
        unCheckedChildren={menuText.switchOp2}
        defaultChecked
        style={{ minHeight: "2rem", width: "7rem" }}
      />
      <Input
        placeholder={menuText.searchMenu}
        allowClear
        size="large"
        className="menuSearch"
        addonBefore={
          <IconButton>
            <SearchRoundedIcon />
          </IconButton>
        }
      />
    </div>
  );
};

export default MenuHeader;
