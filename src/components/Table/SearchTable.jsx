import React, { useEffect, useState } from "react";
import "./styles.scss";

import { menuText } from "../../helper/Text";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Switch, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material/";
const { Search } = Input;

const SearchTable = (props) => {
  return (
    <>
      <Input
        {...props}
        size="large"
        className="tableSearch"
        addonBefore={
          <IconButton>
            <SearchRoundedIcon />
          </IconButton>
        }
      />
    </>
  );
};

export default SearchTable;
