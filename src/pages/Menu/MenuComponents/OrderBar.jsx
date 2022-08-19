import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel, message } from "antd";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./index.scss";
import { billText } from "../../../helper/Text";

import { numbToCurrency } from "../../../helper/currency";

import * as collections from "../../../api/Collections/dish";
import * as cateCollections from "../../../api/Collections/category";
import Loading from "../../../components/Loading";
import { Button } from "@mui/material/";

import WoodBoard from "../../../assets/img/wood.png";
import Clipboard from "../../../assets/img/clipboard.svg";
import Clipper from "../../../assets/img/clipper.svg";

import OrderItem from "./OrderItem";
import { RemoveButton } from "./RemoveButton";
function currentDate() {
  let currentdate = new Date();
  let datetime =
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    " " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear();
  return datetime;
}
const OrderBar = () => {
  let visible = useAppSelector((state) => state.menu.show);
  let orderList = useAppSelector((state) => state.menu.orderList);
  let amount = useAppSelector((state) => state.menu.amount);
  let total = useAppSelector((state) => state.menu.total);

  const dispatch = useAppDispatch();
  function onRemove() {
    dispatch(actions.menuActions.closeOrderBar());
  }
  useEffect(() => {
    dispatch(actions.menuActions.getBillData());
  }, [orderList]);

  function openDetail() {
    dispatch(actions.menuActions.showDetail());
  }
  return (
    <>
      {visible && (
        <div
          className="orderBarCont drop-shadow"
          style={{ backgroundImage: `url(${WoodBoard})` }}
        >
          {orderList.map((item) => {
            return (
              <div>
                <OrderItem item={item} />
              </div>
            );
          })}
          <div className="clipboardCont">
            <div className="divider"></div>
            <div className="cbCont">
              <div
                className="clipboardImg "
                style={{ backgroundImage: `url(${Clipboard})` }}
              >
                <h2>Đơn mới</h2>
                <i>{currentDate()}</i>
                <div className="contentCont">
                  <span>Số lượng: {amount}</span>
                  <br />
                  <span>Tổng tiền: {numbToCurrency(total)}</span>
                </div>
                <Button
                  variant="contained"
                  onClick={openDetail}
                  color="secondary"
                >
                  Chi tiết
                </Button>
              </div>
            </div>
          </div>
          <div className="removeBtnCont">
            <RemoveButton action={onRemove} size="large" />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderBar;
