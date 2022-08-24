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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const OrderBar = () => {
  let visible = useAppSelector((state) => state.menu.show);
  let orderList = useAppSelector((state) => state.menu.orderList);
  let amount = useAppSelector((state) => state.menu.amount);
  let total = useAppSelector((state) => state.menu.total);
  const { height, width } = useWindowDimensions();
  let shortedList = [];
  const [maxI, setMaxI] = useState(8);
  function getMaxSize() {
    if (width >= 1920) {
      setMaxI(8);
    } else if (width >= 1800) {
      setMaxI(7);
    } else if (width >= 1600) {
      setMaxI(6);
    } else if (width >= 1400) {
      setMaxI(5);
    } else if (width >= 1200) {
      setMaxI(4);
    } else if (width >= 1000) {
      setMaxI(3);
    } else if (width < 1000) {
      setMaxI(3);
    } else {
      let i = width / orderList.length;
      console.log(i);
    }
    // let i = width / 10 / orderList.length - 5;
    // setMaxI(Math.floor(i));
  }
  useEffect(() => {
    getMaxSize();
  }, [width, orderList]);
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
          {orderList.map((item, i) => {
            if (i <= maxI) {
              return (
                <div>
                  <OrderItem item={item} />
                </div>
              );
            }
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
