import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel, message } from "antd";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import "./index.scss";
import { billText } from "../../helper/Text";

import Slider from "react-slick";
import { useDoubleTap } from "use-double-tap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import BillPrint from "./MenuComponents/BillPrint";
import { numbToCurrency } from "../../helper/currency";
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
import Coffee from "../../assets/img/coffee_test.png";

import WoodBoard from "../../assets/img/wood.svg";
import Clipboard from "../../assets/img/clipboard.svg";
import Clipper from "../../assets/img/clipper.svg";

const SearchResult = () => {
  let list = useAppSelector((state) => state.menu.orderList);
  const dispatch = useAppDispatch();

  const onRemove = () => {
    dispatch(actions.menuActions.removeOrderItem(item));
    dispatch(actions.menuActions.resetOrderBar());
  };
  function onDecrease() {
    dispatch(actions.menuActions.decreaseAmount(item.id));
  }
  function onIncrease() {
    dispatch(actions.menuActions.increaseAmount(item.id));
  }
  return <div className="orderItemCont">{result.map((item) => {})}</div>;
};

export default function Search() {
  return (
    <div className="container">
      <SearchResult />
    </div>
  );
}
