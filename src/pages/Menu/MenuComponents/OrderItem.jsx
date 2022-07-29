import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel } from "antd";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./index.scss";
import { billText } from "../../../helper/Text";

import Slider from "react-slick";
import { useDoubleTap } from "use-double-tap";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
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

import { numbToCurrency } from "../../../helper/currency";
import { RemoveButton } from "./RemoveButton";
const OrderItem = ({ item, changeAmount = false }) => {
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
  return (
    <div className="orderItemCont">
      <div
        className="orderItemImage "
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%),url(${item.url})`,
        }}
      />
      <div className="infoCont">
        <span>{item.name + " x " + item.amount}</span>
        <span>{numbToCurrency(item.price)}</span>
      </div>
      {changeAmount && (
        <div
          class="changeAmountCont"
          style={{
            display: "flex",
            width: "80%",
            alignItem: "center",
            justifyContent: "center",
            marginLeft: 5,
            marginTop: 5,
          }}
        >
          <IconButton
            size="small"
            onClick={onDecrease}
            color="primary"
            style={{ width: 30, height: 30, marginRight: 2 }}
          >
            <RemoveCircleIcon />
          </IconButton>
          <Input style={{ width: 40 }} value={item.amount} disabled />
          <IconButton
            color="primary"
            onClick={onIncrease}
            size="small"
            style={{ width: 30, height: 30, marginLeft: 2 }}
          >
            <AddCircleIcon />
          </IconButton>
        </div>
      )}
      <div className="smallRemoveBtnCont">
        <RemoveButton action={onRemove} />
      </div>
    </div>
  );
};
export default OrderItem;
