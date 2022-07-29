import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel, message } from "antd";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./index.scss";
import { MenuItem } from "./MenuItem";
import BillPrint from "./BillPrint";
import MenuItemDetail from "./MenuItemDetail";
import OrderBar from "./OrderBar";
import BillDetail from "./BillDetail";
const SearchResult = (item) => {
  let list = useAppSelector((state) => state.menu.orderList);
  const dispatch = useAppDispatch();
};

export default function Search() {
  let list = useAppSelector((state) => state.menu.searchList);

  return (
    <div className="container">
      {list.length > 0 ? (
        <div className="listSearch">
          {list.map((item) => {
            return <MenuItem item={item} />;
          })}
        </div>
      ) : (
        <div className="emptySearch">
          <p>
            {`Không có kết quả tìm kiếm với từ khoá trên!\n Vui lòng thử tìm kiếm lại
          với từ khoá khác!`}
          </p>
        </div>
      )}
      <div style={{ width: "100%", height: "30vh" }}></div>
      <OrderBar />
      <BillDetail />
      <BillPrint />
      <MenuItemDetail />
    </div>
  );
}
