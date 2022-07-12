import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel } from "antd";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import "./index.scss";
import { billText } from "../../helper/Text";
import { numbToCurrency } from "../../../helper/currency";

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
