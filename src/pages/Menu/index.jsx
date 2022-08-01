import React, { useEffect, useState, useRef } from "react";
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
import BillPrint from "./MenuComponents/BillPrint";
import MenuItemDetail from "./MenuComponents/MenuItemDetail";
import OrderBar from "./MenuComponents/OrderBar";
import BillDetail from "./MenuComponents/BillDetail";
import { MenuItem } from "./MenuComponents/MenuItem";
import { RemoveButton } from "./MenuComponents/RemoveButton";

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

const useMountEffect = (fun) => useEffect(fun, []);

export const MenuLists = ({ dataList, category }) => {
  const myRef = useRef(null);
  const menuGroup = useAppSelector((state) => state.menu.menuGroup);
  const selectedCate = useAppSelector((state) => state.menu.selectedCate);

  const [data, setData] = useState([]);

  function refreshData() {
    setData(
      dataList.filter(
        (record) =>
          record.category_type === menuGroup &&
          (record.dish_type[0] === category.name ||
            record.dish_type[0] === category._id) &&
          record.status === true
      )
    );
  }
  useEffect(() => {
    refreshData();
  }, [menuGroup]);

  const executeScroll = () => {
    if (selectedCate === category._id) {
      myRef.current.scrollIntoView();
    }
  };
  useEffect(() => {
    executeScroll();
  }, [selectedCate]);

  useMountEffect(executeScroll); // Scroll on mount

  let settings = {
    infinite: data.length > 5,
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
    ],
  };

  return (
    <div className="menuCont" ref={myRef}>
      <h2>
        {category.category_type_id === menuGroup.toString()
          ? data.length > 0
            ? category.name
            : category.name + ": Hết hàng"
          : undefined}
      </h2>
      <div className="menuItemCont">
        <Slider {...settings}>
          {data.map((item) => {
            return <MenuItem key={item._id} item={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
};
export const Category = () => {
  let selected = useAppSelector((state) => state.menu.selectedCate);
  const dispatch = useAppDispatch();
  let listCate = useAppSelector((state) => state.menu.listCate);
  const menuGroup = useAppSelector((state) => state.menu.menuGroup);

  let settings = {
    infinite: listCate.length > 10 ? true : false,
    speed: 500,
    slidesToShow: 8,
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
  const [data, setData] = useState(listCate);

  function refreshData() {
    setData(
      listCate.filter(
        (record) => record.category_type_id === menuGroup.toString()
      )
    );
  }

  useEffect(() => {
    refreshData();
  }, [menuGroup]);

  const selectCategory = (cate) => {
    dispatch(actions.menuActions.changeCategory(cate));
  };
  useEffect(() => {
    refreshData();

    {
      listCate[0] && selectCategory(listCate[0]._id);
    }
  }, [listCate]);

  return (
    <Slider {...settings}>
      {data.map((item) => {
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
              color: "#111",
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

export default function Menu() {
  let dispatch = useAppDispatch();
  const checkOnload = useAppSelector((state) => state.menu.loadData);

  const [loading, setLoading] = useState(false);
  const dataList = useAppSelector((state) => state.menu.listAll);
  const cateList = useAppSelector((state) => state.menu.listCate);
  const menuGroup = useAppSelector((state) => state.menu.menuGroup);
  let openPrint = useAppSelector((state) => state.menu.openPrint);
  const fetchData = async (value) => {
    try {
      setLoading(true);
      if (dataList.length === 0) {
        const response = await collections.getDishes();
        // let temp = response.map((item =>{

        // }))
        dispatch(actions.menuActions.setListAll(response));
      }
      if (cateList.length === 0) {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Loading loading={loading} />
      <Category />
      {cateList.map((item) => {
        return <MenuLists dataList={dataList} category={item} />;
      })}
      <div style={{ width: "100%", height: "30vh" }}></div>
      <OrderBar />
      <BillDetail />
      <BillPrint />
      <MenuItemDetail />
    </div>
  );
}
