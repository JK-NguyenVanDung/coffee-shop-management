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
import MenuItemDetail from "./MenuComponents/MenuItemDetail";
import { numbToCurrency } from "../../helper/currency";

import * as collections from "../../api/Collections/dish";
import * as cateCollections from "../../api/Collections/category";
import Loading from "../../components/Loading";
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
import PlaceHolder from "../../assets/img/placeholder.png";

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
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%),url(${
            item.url ? item.url : PlaceHolder
          })`,
        }}
      />
      <div className="infoCont">
        <span>{item.name + " x " + item.amount}</span>
        <span>{numbToCurrency(item.price)}</span>
      </div>
      {changeAmount && (
        <div
          className="changeAmountCont"
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

export const MenuItem = ({ item }) => {
  const dispatch = useAppDispatch();
  let orderList = useAppSelector((state) => state.menu.orderList);
  const [hover, setHover] = useState(false);
  const bindTap = useDoubleTap((event) => {
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
export const MenuList = (props) => {
  return (
    <div className="">
      <MenuItem item={props.item} />
    </div>
  );
};
export const MenuLists = ({ dataList, category }) => {
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

  // <MenuItem item={props.item} />
  // const listCate = useAppSelector((state) => state.menu.listCate);
  // function getCategoryName() {
  //   let name = "";
  //   for (let i = 0; i < listCate.length; i++) {
  //     if (
  //       listCate[i]._id === dataList[0].dish_type[0] ||
  //       listCate[i].name === dataList[0].dish_type[0]
  //     ) {
  //       return listCate[i].name;
  //     } else {
  //       console.log(dataList[0].dish_type[0]);
  //     }
  //   }

  //   return name;
  // }
  let filteredList = dataList.filter(
    (record) =>
      record.dish_type[0] === category.name ||
      record.dish_type[0] === category._id
  );
  const [data, setData] = useState(filteredList);
  return (
    <div className="menuCont">
      <h2> {category.name}</h2>
      <div className="menuItemCont">
        <Slider {...settings}>
          {data.map((item) => {
            return (
              <MenuList key={item._id} category={item.dish_type} item={item} />
            );
          })}
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
  let listCate = useAppSelector((state) => state.menu.listCate);
  useEffect(() => {
    {
      listCate[0] && selectCategory(listCate[0]._id);
    }
  }, [listCate]);

  return (
    <Slider {...settings}>
      {listCate.map((item) => {
        return (
          <Button
            disableElevation
            disableRipple
            key={item._id}
            className="categoryCont"
            onClick={() => selectCategory(item._id)}
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
                selected === item._id ? "cateItem selected" : "cateItem "
              }
            >
              {item.name}
            </div>
          </Button>
        );
      })}
    </Slider>
  );
};

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
  let openPrint = useAppSelector((state) => state.menu.openPrint);

  let dispatch = useAppDispatch();

  function onRemove() {
    dispatch(actions.menuActions.closeDetail());
  }
  function createOrder() {
    let order = {};
    dispatch(actions.menuActions.createOrder());

    if (printBill) {
      dispatch(actions.menuActions.showPrintBill());
    } else {
      dispatch(actions.menuActions.resetOrder());
    }
    message.success("Tạo đơn thành công");
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
          <div className="billDetailCont">
            <img className="clipper" src={Clipper} />
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
              <div className="noteCont">
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

export default function Menu() {
  let dispatch = useAppDispatch();
  const checkOnload = useAppSelector((state) => state.menu.loadData);

  const [loading, setLoading] = useState(false);
  const dataList = useAppSelector((state) => state.menu.listAll);
  const cateList = useAppSelector((state) => state.menu.listCate);

  let openPrint = useAppSelector((state) => state.menu.openPrint);
  const fetchData = async (value) => {
    try {
      setLoading(true);
      if (dataList.length === 0) {
        const response = await collections.getDishes();
        // let temp = response.map((item =>{

        // }))
        dispatch(actions.menuActions.setListAll(response));
        const categories = await cateCollections.getCategories();

        dispatch(actions.menuActions.setListCate(categories));
      }

      setLoading(false);

      // setPagination({
      //   totalDocs: response.metadata.count,
      // });
    } catch (error) {
      //history.replace("/");
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [dataList]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Loading loading={loading} />
      <Category />
      {cateList.map((item) => {
        return (
          <MenuLists refs={item._id} dataList={dataList} category={item} />
        );
      })}
      <div style={{ width: "100%", height: "30vh" }}></div>
      <OrderBar />
      <BillDetail />
      <BillPrint />
      <MenuItemDetail />
    </div>
  );
}
