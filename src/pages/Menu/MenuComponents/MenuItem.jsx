import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel, message } from "antd";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./index.scss";
import { billText } from "../../../helper/Text";

import { useDoubleTap } from "use-double-tap";

import { numbToCurrency } from "../../../helper/currency";

import * as collections from "../../../api/Collections/dish";
import * as cateCollections from "../../../api/Collections/category";
import Loading from "../../../components/Loading";
import {
  Button,
  TextField,
  IconButton,
  Card,
  Typography,
  CardContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material/";

import PlaceHolder from "../../../assets/img/placeholder.png";

export const MenuItem = ({ item }) => {
  const dispatch = useAppDispatch();
  let orderList = useAppSelector((state) => state.menu.orderList);
  const [hover, setHover] = useState(false);
  const bindTap = useDoubleTap((event) => {
    console.log(item);
    dispatch(actions.menuActions.addOrderItem(item));
  });
  function openDetail() {
    dispatch(actions.menuActions.showInfo(item));
  }
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="itemCont  drop-shadow"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%),url(${
          item.url ? item.url : PlaceHolder
        })`,
      }}
      {...bindTap}
    >
      <div>
        <Button
          color={!item.url ? "secondary" : "info"}
          style={{ visibility: !hover ? "hidden" : "visible" }}
          onClick={() => openDetail()}
        >
          Chi tiết
        </Button>
      </div>
      <div className="itemContent">
        <span>{item.name}</span>
        <span>{numbToCurrency(item.price)}</span>
      </div>
    </div>
  );
};
