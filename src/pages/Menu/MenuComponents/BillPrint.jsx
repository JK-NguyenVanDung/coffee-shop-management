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
import { Button, Typography } from "@mui/material/";

import { RemoveButton } from "./RemoveButton";
import { numbToCurrency } from "../../../helper/currency";

import WoodBoard from "../../../assets/img/wood.svg";
import Clipboard from "../../../assets/img/clipboard.svg";
import Clipper from "../../../assets/img/clipper.svg";

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
const BillPrint = () => {
  let orderList = useAppSelector((state) => state.menu.orderList);
  let open = useAppSelector((state) => state.menu.openDetail);

  let user = "test";
  let totalBill = useAppSelector((state) => state.menu.totalBill);
  let total = useAppSelector((state) => state.menu.total);
  let printBill = useAppSelector((state) => state.menu.printBill);
  let paymentMethod = useAppSelector((state) => state.menu.paymentMethod);
  let note = useAppSelector((state) => state.menu.note);

  let dispatch = useAppDispatch();

  function onRemove() {
    dispatch(actions.menuActions.closeDetail());
  }
  function createOrder() {
    let order = {};
  }
  function cancelOrder() {
    dispatch(actions.menuActions.cancelOrder());
  }
  const billContent = [
    { label: "ID đơn hàng", content2: "CFM872022" },
    {
      label: "Ngày tạo",
      content2: currentDate(),
    },
    // { label: "Người tạo", content: user ? user : "N/A" },
    { label: "Thu ngân", content2: user ? user : "N/A" },
    { label: "Tên món", content1: "SL", content2: "Đơn giá" },
    { label: "Cafe Đá", content1: "2", content2: "40.000 VNĐ" },
    {
      label: "Tổng đơn",
      content: numbToCurrency(total) ? numbToCurrency(total) : "N/A", // Phần này add đường ngang vào tui ko biết có gì chú copy phần đó dưới á
    },
    { label: "Thuế VAT", content2: "10%" },
    {
      label: "Tổng tiền",
      content2: numbToCurrency(totalBill) ? numbToCurrency(totalBill) : "N/A",
    },
    { label: "Phương thức thanh toán", content2: "Tiền mặt" },
    { label: "Trạng thái", content2: "Đã thanh toán" },
  ];
  return (
    <>
      {open && (
        <div>
          <div className="backdrop" onClick={onRemove}></div>
          <div class="billDetailCont">
            <img class="clipper" src={Clipper} />
            <div className="billBgCont">
              <div className="billHeader">
                <h2>Linh's Coffee</h2>
              </div>
              <div className="locationCont">
                <h4>Địa chỉ:*********</h4>
                <h4>SĐT:********</h4>
              </div>
              <hr width="100%" size="1%" align="center" />

              <div className="cardCont">
                <Typography
                  sx={{ fontSize: "1.5rem" }}
                  color="text.secondary"
                  gutterBottom
                  textAlign="center"
                >
                  {billText.header3}
                </Typography>
                <div className="billContentsCont">
                  {billContent.map((item) => {
                    return (
                      <>
                        <div className="billContentCont">
                          <Typography
                            sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {item.content1}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.8rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {item.content2}
                          </Typography>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <hr width="100%" size="1%" align="center" />

              <div className="buttonCont">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => createOrder()}
                  color="secondary"
                >
                  Tạo đơn
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={() => cancelOrder()}
                >
                  Huỷ đơn
                </Button>
              </div>
            </div>
            <div
              className="removeBtnCont"
              style={{
                top: "3.5rem",
                right: "-1rem",
              }}
            >
              <RemoveButton action={onRemove} size="large" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default BillPrint;
