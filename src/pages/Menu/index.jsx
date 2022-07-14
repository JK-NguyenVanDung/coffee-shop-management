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
let orderItem = {
  id: "01",
  name: "Cafe sữa",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe:
    "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
};
let menuItem = {
  id: 1,
  name: "Cafe sữa",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe:
    "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
  create_date: "30/06/2022",
  update_by: "dung001",
};

let menuItem2 = {
  id: 2,
  name: "Cafe sữa đá",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe:
    "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
  create_date: "30/06/2022",
  update_by: "dung001",
};
let menuItem3 = {
  id: 3,
  name: "Cafe sữa đá",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe:
    "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
  create_date: "30/06/2022",
  update_by: "dung001",
};
let menuItem42 = {
  id: 42,
  name: "Cafe sữa đá",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe:
    "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
  create_date: "30/06/2022",
  update_by: "dung001",
};

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
export const RemoveButton = (props = { size: "medium", action: null }) => {
  return (
    <div>
      <IconButton color="info" aria-label="add an alarm" onClick={props.action}>
        <CancelIcon fontSize={props.size} style={{ zIndex: 10 }} />
      </IconButton>
    </div>
  );
};

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
                  Tạo đơn
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

export const MenuItem = ({ item }) => {
  const dispatch = useAppDispatch();
  let orderList = useAppSelector((state) => state.menu.orderList);

  const bind = useDoubleTap((event) => {
    dispatch(actions.menuActions.addOrderItem(item));
  });
  return (
    <div
      className="itemCont  drop-shadow"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%),url(${item.url})`,
      }}
      {...bind}
    >
      <span>{item.name}</span>
      <span>{numbToCurrency(item.price)}</span>
    </div>
  );
};
export const MenuList = ({ categoryName }) => {
  let settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: true,
    dots: true,
    cssEase: "ease-out",
    swipeToSlide: true,
    prevArrow: <ArrowBackIosRoundedIcon />,
    nextArrow: <ArrowForwardIosRoundedIcon />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div class="menuCont">
      <h2> {categoryName}</h2>
      <div className="meunItemCont">
        <Slider {...settings}>
          <div className="meunItemsCont ">
            <MenuItem item={menuItem} />
          </div>
          <div className="meunItemsCont ">
            <MenuItem item={menuItem2} />
          </div>
          <div className="meunItemsCont ">
            <MenuItem item={menuItem3} />
          </div>

          <div className="meunItemsCont ">
            <MenuItem item={menuItem42} />
          </div>
          <div className="meunItemsCont ">
            <MenuItem item={menuItem} />
          </div>
          <div className="meunItemsCont ">
            <MenuItem item={menuItem2} />
          </div>
          <div className="meunItemsCont ">
            <MenuItem item={menuItem3} />
          </div>

          <div className="meunItemsCont ">
            <MenuItem item={menuItem42} />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export const Category = () => {
  let selected = useAppSelector((state) => state.menu.selectedCate);
  const dispatch = useAppDispatch();

  let settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
    arrows: true,
    dots: true,
    cssEase: "ease-out",
    swipeToSlide: true,
    prevArrow: <ArrowBackIosRoundedIcon />,
    nextArrow: <ArrowForwardIosRoundedIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const selectCategory = (cate) => {
    dispatch(actions.menuActions.changeCategory(cate));
  };
  let listCate = [
    {
      id: "CT01",
      name: "Cà phê đá",
    },
    {
      id: "CT02",
      name: "Cà phê sữa",
    },
  ];
  return (
    <Slider {...settings}>
      {listCate.map((item) => {
        return (
          <Button
            disableElevation
            disableRipple
            key={item.id}
            className="categoryCont"
            onClick={() => selectCategory(item.id)}
            size="small"
            sx={{
              ml: 1,
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
              mr: 1,
            }}
          >
            <div
              className={
                selected === item.id ? "cateItem selected" : "cateItem "
              }
            >
              {item.name}
            </div>{" "}
          </Button>
        );
      })}
    </Slider>
  );
};
const { Search } = Input;


// chi tiết món

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
      label: "Đơn giá: ",
      content: numbToCurrency(total) ? numbToCurrency(total) : "N/A",
    },
    { label: "Trạng thái: ", content: "Còn hàng" },
    { label: "Thuế VAT: ", content: "10%" },
 
  ];
  return (
    <>
      {open && (
        <div>
          <div className="backdrop" onClick={onRemove}></div>
          <div class="billDetailCont">
            <div className="billBgCont">

              <div className="billListCont">
                {orderList.map((item) => {
                  return (
                    <div className="billItemCont">
                      <OrderItem item={item} changeAmount={true} />
                    </div>
                  );
                })}
              </div>

              <div className="cardCont">
                <Card sx={{ minWidth: "100%" }}>
                  
                   
                    <div className="billContentsCont">
                      {billContent.map((item) => {
                        return (
                          <>
                            <div className="billContentCont">
                              <Typography
                                sx={{ fontSize: "0.8rem", fontWeight: "bold", paddingRight: "3%" }}
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
                  
                  <CardContent>
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

// HÓA ĐƠN

// const BillDetail = () => {
//   let orderList = useAppSelector((state) => state.menu.orderList);
//   let open = useAppSelector((state) => state.menu.openDetail);

//   let user = "test";
//   let totalBill = useAppSelector((state) => state.menu.totalBill);
//   let total = useAppSelector((state) => state.menu.total);
//   let printBill = useAppSelector((state) => state.menu.printBill);
//   let paymentMethod = useAppSelector((state) => state.menu.paymentMethod);
//   let note = useAppSelector((state) => state.menu.note);

//   let dispatch = useAppDispatch();

//   function onRemove() {
//     dispatch(actions.menuActions.closeDetail());
//   }
//   function createOrder() {
//     let order = {};
//   }
//   function cancelOrder() {
//     dispatch(actions.menuActions.cancelOrder());
//   }
//   const billContent = [
//     { label: "ID đơn hàng", content2: "CFM872022" },
//     {
//       label: "Ngày tạo",
//       content2: currentDate(),
//     },
//     // { label: "Người tạo", content: user ? user : "N/A" },
//     { label: "Thu ngân", content2: user ? user : "N/A" },
//     { label: "Tên món", content1: "SL",  content2: "Đơn giá" },
//     { label: "Cafe Đá", content1: "2", content2: "40.000 VNĐ" },
//     {
//       label: "Tổng đơn",
//       content: numbToCurrency(total) ? numbToCurrency(total) : "N/A",               // Phần này add đường ngang vào tui ko biết có gì chú copy phần đó dưới á
//     },
//     { label: "Thuế VAT", content2: "10%" },
//     {
//       label: "Tổng tiền",
//       content2: numbToCurrency(totalBill) ? numbToCurrency(totalBill) : "N/A",
//     },
//     { label: "Phương thức thanh toán", content2: "Tiền mặt" },
//     { label: "Trạng thái", content2: "Đã thanh toán" },
//   ];
//   return (
//     <>
//       {open && (
//         <div>
//           <div className="backdrop" onClick={onRemove}></div>
//           <div class="billDetailCont">
//             <img class="clipper" src={Clipper} />
//             <div className="billBgCont">
//               <div className="billHeader">
//                 <h2>Linh's Coffee</h2>
//               </div>
//               <div className="locationCont">
//                   <h4>Địa chỉ:*********</h4>
//                   <h4>SĐT:********</h4>
//               </div>
//               <hr  width="100%" size="1%" align="center" />

//               <div className="cardCont">

//                     <Typography
//                       sx={{ fontSize: "1.5rem" }}
//                       color="text.secondary"
//                       gutterBottom
//                       textAlign= "center"
//                     >
//                       {billText.header3}
//                     </Typography>
//                     <div className="billContentsCont">
//                       {billContent.map((item) => {
//                         return (
//                           <>
//                             <div className="billContentCont">
//                               <Typography
//                                 sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
//                                 color="text.secondary"
//                                 gutterBottom
//                               >
//                                 {item.label}
//                               </Typography>
//                               <Typography
//                                 sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
//                                 color="text.secondary"
//                                 gutterBottom
//                               >
//                                 {item.content1}
//                               </Typography>
//                               <Typography
//                                 sx={{ fontSize: "0.8rem", fontWeight: "bold", textAlign: "center" }}
//                                 color="text.secondary"
//                                 gutterBottom
//                               >
//                                 {item.content2}
//                               </Typography>
//                             </div>
//                           </>
//                         );
//                       })}
//                     </div>

//               </div>
//               <hr  width="100%" size="1%" align="center" />

//               <div className="buttonCont">
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={() => createOrder()}
//                   color="secondary"
//                 >
//                   Tạo đơn
//                 </Button>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   color="error"
//                   onClick={() => cancelOrder()}
//                 >
//                   Huỷ đơn
//                 </Button>
//               </div>
//             </div>
//             <div
//               className="removeBtnCont"
//               style={{
//                 top: "3.5rem",
//                 right: "-1rem",
//               }}
//             >
//               <RemoveButton action={onRemove} size="large" />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };


// TẠO ĐƠN

// const BillDetail = () => {
//   let orderList = useAppSelector((state) => state.menu.orderList);
//   let open = useAppSelector((state) => state.menu.openDetail);

//   let user = "test";
//   let totalBill = useAppSelector((state) => state.menu.totalBill);
//   let total = useAppSelector((state) => state.menu.total);
//   let printBill = useAppSelector((state) => state.menu.printBill);
//   let paymentMethod = useAppSelector((state) => state.menu.paymentMethod);
//   let note = useAppSelector((state) => state.menu.note);

//   let dispatch = useAppDispatch();

//   function onRemove() {
//     dispatch(actions.menuActions.closeDetail());
//   }
//   function createOrder() {
//     let order = {};
//   }
//   function cancelOrder() {
//     dispatch(actions.menuActions.cancelOrder());
//   }
//   const billContent = [
//     {
//       label: "Ngày tạo",
//       content: currentDate(),
//     },
//     { label: "Người tạo", content: user ? user : "N/A" },
//     {
//       label: "Tổng đơn",
//       content: numbToCurrency(total) ? numbToCurrency(total) : "N/A",
//     },
//     { label: "Thuế VAT", content: "10%" },
//     {
//       label: "Tổng tiền",
//       content: numbToCurrency(totalBill) ? numbToCurrency(totalBill) : "N/A",
//     },
//   ];
//   return (
//     <>
//       {open && (
//         <div>
//           <div className="backdrop" onClick={onRemove}></div>
//           <div class="billDetailCont">
//             <img class="clipper" src={Clipper} />
//             <div className="billBgCont">
//               <div className="billHeader">
//                 <h2>Linh's Coffee</h2>
//                 <h1>TẠO ĐƠN</h1>
//               </div>
//               <div className="billListCont">
//                 {orderList.map((item) => {
//                   return (
//                     <div className="billItemCont">
//                       <OrderItem item={item} changeAmount={true} />
//                     </div>
//                   );
//                 })}
//               </div>
//               <div class="noteCont">
//                 <TextField
//                   placeholder="Nhập ghi chú của khách hàng ở đây"
//                   label="Ghi chú"
//                   onChange={(e) => dispatch(actions.menuActions.setNote(e))}
//                   multiline
//                   rows={2}
//                   maxRows={4}
//                   fullWidth
//                 />
//               </div>
//               <div className="cardCont">
//                 <Card sx={{ minWidth: "100%" }}>
//                   <CardContent>
//                     <Typography
//                       sx={{ fontSize: "1.2rem" }}
//                       color="text.secondary"
//                       gutterBottom
//                     >
//                       {billText.header1}
//                     </Typography>
//                     <div className="billContentsCont">
//                       {billContent.map((item) => {
//                         return (
//                           <>
//                             <div className="billContentCont">
//                               <Typography
//                                 sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
//                                 color="text.secondary"
//                                 gutterBottom
//                               >
//                                 {item.label}
//                               </Typography>
//                               <Typography
//                                 sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
//                                 color="text.secondary"
//                                 gutterBottom
//                               >
//                                 {item.content}
//                               </Typography>
//                             </div>
//                           </>
//                         );
//                       })}
//                     </div>
//                   </CardContent>
//                   <CardContent>
//                     <Typography
//                       sx={{ fontSize: "1.2rem" }}
//                       color="text.secondary"
//                       gutterBottom
//                     >
//                       {billText.header2}
//                     </Typography>
//                     <FormControl>
//                       <RadioGroup
//                         row
//                         aria-labelledby="demo-row-radio-buttons-group-label"
//                         name="row-radio-buttons-group"
//                         value={paymentMethod}
//                         onChange={(value) =>
//                           dispatch(actions.menuActions.changePayment(value))
//                         }
//                       >
//                         <FormControlLabel
//                           value="cash"
//                           control={<Radio />}
//                           label="Tiền mặt"
//                         />
//                         <FormControlLabel
//                           value="momo"
//                           control={<Radio />}
//                           label="Momo"
//                         />
//                         <FormControlLabel
//                           value="vnpay"
//                           control={<Radio />}
//                           label="VNPay"
//                         />
//                       </RadioGroup>
//                     </FormControl>
//                   </CardContent>
//                 </Card>
//               </div>
//               <div className="checkbox">
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={printBill}
//                       onChange={() =>
//                         dispatch(actions.menuActions.changePrint())
//                       }
//                     />
//                   }
//                   label="In hoá đơn"
//                 />
//               </div>

//               <div className="buttonCont">
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={() => createOrder()}
//                   color="success"
//                 >
//                   Tạo đơn
//                 </Button>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   color="error"
//                   onClick={() => cancelOrder()}
//                 >
//                   Huỷ đơn
//                 </Button>
//               </div>
//             </div>
//             <div
//               className="removeBtnCont"
//               style={{
//                 top: "3.5rem",
//                 right: "-1rem",
//               }}
//             >
//               <RemoveButton action={onRemove} size="large" />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
export default function Menu() {
  let dispatch = useAppDispatch();

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="container">
      <Category />
      <MenuList categoryName={"Cà phê"} />
      <OrderBar />
      <BillDetail />
    </div>
  );
}
