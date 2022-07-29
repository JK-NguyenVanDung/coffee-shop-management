// chi tiết món
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
import PlaceHolder from "../../../assets/img/placeholder.png";

import { RemoveButton } from "./RemoveButton";
import { numbToCurrency } from "../../../helper/currency";
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
import Coffee from "../../../assets/img/coffee_test.png";

import WoodBoard from "../../../assets/img/wood.svg";
import Clipboard from "../../../assets/img/clipboard.svg";
import Clipper from "../../../assets/img/clipper.svg";

const MenuItemDetail = () => {
  let info = useAppSelector((state) => state.menu.info);
  let open = useAppSelector((state) => state.menu.showInfo);

  let user = "test";
  let totalBill = useAppSelector((state) => state.menu.totalBill);
  let total = useAppSelector((state) => state.menu.total);
  let printBill = useAppSelector((state) => state.menu.printBill);
  let paymentMethod = useAppSelector((state) => state.menu.paymentMethod);
  let note = useAppSelector((state) => state.menu.note);

  let dispatch = useAppDispatch();

  function onRemove() {
    dispatch(actions.menuActions.hideInfo());
  }
  function createOrder() {
    dispatch(actions.menuActions.addOrderItem(info));
    dispatch(actions.menuActions.hideInfo());
  }
  function cancelOrder() {
    dispatch(actions.menuActions.cancelOrder());
  }
  const billContent = [
    {
      label: "Đơn giá: ",
      content: numbToCurrency(info.price) ? numbToCurrency(info.price) : "N/A",
    },
    { label: "Trạng thái: ", content: "Còn hàng" },
    // { label: "Thuế VAT: ", content: "10%" },
  ];
  return (
    <>
      {open && (
        <div>
          <div className="backdrop" onClick={onRemove}></div>
          <div className="orderItemDetailCont">
            <div className="orderItemBgCont">
              <div className="infoImageCont">
                <img
                  className="infoImage"
                  src={info.url ? info.url : PlaceHolder}
                />
              </div>
              <h1>{info.name}</h1>
              <div className="billContentsCont">
                {billContent.map((item) => {
                  return (
                    <>
                      <div className="billContentCont">
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            paddingRight: "3%",
                          }}
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

              <div className="cardCont">
                <Card sx={{ minWidth: "100%" }}>
                  <CardContent sx={{ minWidth: "100%" }}>
                    <div className="noteCont">
                      <TextField
                        disabled={true}
                        placeholder="Nhập ghi chú của khách hàng ở đây"
                        label="Công thức"
                        value={info.recipe}
                        multiline
                        rows={2}
                        maxRows={4}
                        fullWidth
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="buttonCont">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => createOrder()}
                  color="secondary"
                >
                  Đặt món
                </Button>
              </div>
            </div>
            <div
              className="removeBtnCont"
              style={{
                top: "1.5rem",
                right: "-1.3rem",
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

export default MenuItemDetail;
