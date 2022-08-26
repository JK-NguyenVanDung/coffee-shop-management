import React, { useEffect, useState, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./index.scss";
import { billText } from "../../../helper/Text";
import { message } from "antd";
import { Button, Typography } from "@mui/material/";

import { RemoveButton } from "./RemoveButton";
import { numbToCurrency } from "../../../helper/currency";

import Clipper from "../../../assets/img/clipper.svg";
import * as collections from "../../../api/Collections/bill";
import { shopPhone, shopAddress } from "../../../helper/Text";
import { useReactToPrint } from "react-to-print";

function currentDate() {
  let currentdate = new Date();
  let datetime =
    currentdate.getHours() +
    ":" +
    (currentdate.getMinutes() < 10 ? "0" : "") +
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
  let openPrint = useAppSelector((state) => state.menu.openPrint);
  let id = useAppSelector((state) => state.menu.billID);
  const info = useAppSelector((state) => state.auth.info);
  let totalBill = useAppSelector((state) => state.menu.totalBill);
  let total = useAppSelector((state) => state.menu.total);
  let printBill = useAppSelector((state) => state.menu.printBill);
  let paymentMethod = useAppSelector((state) => state.menu.paymentMethod);
  let note = useAppSelector((state) => state.menu.note);
  const [bill, setBill] = useState();
  let dispatch = useAppDispatch();
  let billRef = useRef();

  function onRemove() {
    dispatch(actions.menuActions.cancelOrder());
  }
  function printOutBill() {
    dispatch(actions.menuActions.printBill());
    dispatch(actions.menuActions.cancelOrder());
  }
  function cancelPrint() {
    dispatch(actions.menuActions.cancelOrder());
  }
  useEffect(() => {
    // let res = collections.getBill(id);
    // console.log(res);
    // setBill(res);
  }, []);

  const paymentText = [
    { value: "cash", label: "Tiền mặt" },
    { value: "momo", label: "Momo" },
    { value: "vnpay", label: "VNPay" },
  ];
  const billContent = [
    { label: "ID đơn hàng", content: id },
    {
      label: "Ngày tạo:",
      content: currentDate(),
    },
    { label: "Thu ngân", content: info ? info.full_name : "N/A" },
  ];
  const billContent2 = {
    label: "Tên món",
    content1: "SL ",
    content2: "Đơn giá",
  };

  const billContent3 = [
    {
      label: "Tổng đơn:",
      content: numbToCurrency(total) ? numbToCurrency(total) : "N/A", // Phần này add đường ngang vào tui ko biết có gì chú copy phần đó dưới á
    },
    { label: "Thuế VAT", content: "0%" },
    {
      label: "Tổng tiền:",
      content: numbToCurrency(totalBill) ? numbToCurrency(totalBill) : "N/A",
    },
    {
      label: "Phương thức thanh toán:",
      content: paymentText.map((item) => {
        if (item.value === paymentMethod) {
          return item.label;
        }
      }),
    },
    { label: "Trạng thái:", content: "Đã thanh toán" },
  ];
  const handlePrint = useReactToPrint({
    content: () => billRef.current,

    // documentTitle: "Hoá đơn quán LINH COFFEE",
    pageStyle: "print",
    onAfterPrint: () => printOutBill(),
  });
  const PrintWrapper = React.forwardRef((props, ref) => (
    <div ref={ref}>{props.children}</div>
  ));
  const PrintBody = () => {
    return (
      <div className="billBgCont">
        <div className="billHeader">
          <h4>Linh's Coffee</h4>
        </div>
        <div className="locationCont">
          <h4>Địa chỉ: {shopAddress}</h4>
          <h4>SĐT: {shopPhone}</h4>
        </div>
        <hr width="100%" size="1%" align="center" />
        <div className="cardCont">
          <div className="billContentsCont">
            <Typography
              sx={{ fontSize: "1.5rem", mb: 3 }}
              color="text.secondary"
              gutterBottom
              textAlign="center"
            >
              {billText.header3}
            </Typography>
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
            <hr width="100%" size="1%" align="center" />
            <div className="billItemsCont">
              <Typography
                sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {billContent2.label}
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {billContent2.content1}
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
                {billContent2.content2}
              </Typography>
            </div>
            {orderList.map((item) => {
              return (
                <>
                  <div className="billItemsCont">
                    <div className="rowCont">
                      <Typography
                        sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {item.amount}
                      </Typography>
                    </div>
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {numbToCurrency(item.price)}
                    </Typography>
                  </div>
                </>
              );
            })}
            <hr width="100%" size="1%" align="center" />
            {billContent3.map((item) => {
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
        </div>
      </div>
    );
  };
  return (
    <>
      {openPrint && (
        <div>
          <div className="backdrop" onClick={onRemove}></div>
          <div class="billDetailCont">
            <img class="clipper" src={Clipper} />
            <div className="billLayoutCont">
              <PrintWrapper ref={billRef}>
                <PrintBody />
              </PrintWrapper>

              <div className="buttonCont">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handlePrint()}
                  color="secondary"
                >
                  In đơn
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  onClick={() => cancelPrint()}
                >
                  Huỷ In
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
