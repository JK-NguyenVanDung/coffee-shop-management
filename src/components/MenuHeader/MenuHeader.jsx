import React, { useEffect, useState } from "react";
import "./styles.scss";

import { menuText } from "../../helper/Text";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Switch, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material/";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import { useNavigate } from "react-router-dom";

const MenuHeader = (props) => {
  const dispatch = useAppDispatch();

  const { Search } = Input;
  const [search, setSearch] = useState("");
  const dataList = useAppSelector((state) => state.menu.listAll);

  let menuGroup = useAppSelector((state) => state.menu.menuGroup);

  const navigate = useNavigate();
  const onChangeSearch = async (value) => {
    setSearch(value);
    // console.log(value);
  };
  const onSearch = async () => {
    const reg = new RegExp(search, "gi");
    const filteredData = map(dataList, (record) => {
      const name = get(record, "name").match(reg);
      if (!name) {
        return null;
      }
      return record;
    }).filter((record) => !!record);
    dispatch(actions.formActions.setNameMenu(`Tìm kiếm: ${search}`));
    navigate(`../menu/search`);
    dispatch(
      actions.menuActions.setListSearch(search ? filteredData : dataList)
    );
  };
  return (
    <div className={props.switch === true ? "centeredCont" : "rightCont"}>
      <div class="switchCont">
        {props.switch && (
          <Switch
            checkedChildren={menuText.switchOp1}
            unCheckedChildren={menuText.switchOp2}
            defaultChecked
            onChange={() => dispatch(actions.menuActions.setGroup(!menuGroup))}
            style={{ minHeight: "2rem", width: "7rem" }}
          />
        )}
      </div>
      <Input
        placeholder={menuText.searchMenu}
        allowClear
        size="large"
        className="menuSearch"
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        enterButton={onSearch}
        addonBefore={
          <IconButton onClick={onSearch}>
            <SearchRoundedIcon />
          </IconButton>
        }
      />
    </div>
  );
};

export default MenuHeader;
