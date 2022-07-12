import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import "./index.scss";
import Slider from "react-slick";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button } from "@mui/material/";

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
            </div>
          </Button>
        );
      })}
    </Slider>
  );
};

export default Category;
