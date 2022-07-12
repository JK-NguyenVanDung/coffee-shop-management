import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel } from "antd";

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
import numbToCurrency from "../../../helper/currency";

import WoodBoard from "../../assets/img/wood.svg";
import Clipboard from "../../assets/img/clipboard.svg";
import Clipper from "../../assets/img/clipper.svg";

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

const BillDetail = () => {
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
    {
      label: "Ngày tạo",
      content: currentDate(),
    },
    { label: "Người tạo", content: user ? user : "N/A" },
    {
      label: "Tổng đơn",
      content: numbToCurrency(total) ? numbToCurrency(total) : "N/A",
    },
    { label: "Thuế VAT", content: "10%" },
    {
      label: "Tổng tiền",
      content: numbToCurrency(totalBill) ? numbToCurrency(totalBill) : "N/A",
    },
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
                <h1>TẠO ĐƠN</h1>
              </div>
              <div className="billListCont">
                {orderList.map((item) => {
                  return (
                    <div className="billItemCont">
                      <OrderItem item={item} changeAmount={true} />
                    </div>
                  );
                })}
              </div>
              <div class="noteCont">
                <TextField
                  placeholder="Nhập ghi chú của khách hàng ở đây"
                  label="Ghi chú"
                  onChange={(e) => dispatch(actions.menuActions.setNote(e))}
                  multiline
                  rows={2}
                  maxRows={4}
                  fullWidth
                />
              </div>
              <div className="cardCont">
                <Card sx={{ minWidth: "100%" }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: "1.2rem" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {billText.header1}
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
                                {item.content}
                              </Typography>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: "1.2rem" }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {billText.header2}
                    </Typography>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={paymentMethod}
                        onChange={(value) =>
                          dispatch(actions.menuActions.changePayment(value))
                        }
                      >
                        <FormControlLabel
                          value="cash"
                          control={<Radio />}
                          label="Tiền mặt"
                        />
                        <FormControlLabel
                          value="momo"
                          control={<Radio />}
                          label="Momo"
                        />
                        <FormControlLabel
                          value="vnpay"
                          control={<Radio />}
                          label="VNPay"
                        />
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
              </div>
              <div className="checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={printBill}
                      onChange={() =>
                        dispatch(actions.menuActions.changePrint())
                      }
                    />
                  }
                  label="In hoá đơn"
                />
              </div>

              <div className="buttonCont">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => createOrder()}
                  color="success"
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
export default BillDetail;
