import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Select, Form } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Line } from "@ant-design/charts";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { CloseOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material";
import CreditCard from "../../../assets/img/CreditCard.svg";
const { Search } = Input;
const { Option } = Select;
const labels = {
  statistic: "Báo cáo thống kê doanh thu",
  activity_summary: "Tóm tắt hoạt động",
  bank_card: "Thẻ ngân hàng của tôi",
  target: "Mục tiêu",
  morning_money: "Tiền sáng",
  lunch_money: "Tiền trưa",
  evening_money: "Tiền tối",
};

const SaleChart = () => {
  const data = [
    { month: "1", value: 3 },
    { month: "2", value: 4 },
    { month: "3", value: 3.5 },
    { month: "4", value: 5 },
    { month: "5", value: 4.9 },
    { month: "6", value: 6 },
    { month: "7", value: 7 },
    { month: "8", value: 9 },
    { month: "9", value: 13 },
    { month: "10", value: 13 },
    { month: "11", value: 13 },
    { month: "12", value: 13 },
  ];
  const config = {
    data,
    xField: "month",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "circule",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };
  return <Line {...config} />;
};

export default function Analysis() {
  return (
    <>
      <div className="analysisCont">
        <div className="leftAnalysis">
          <div className="cards">
            <Card
              sx={{ width: "50%", marginRight: "2%", borderRadius: "12px" }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  Tổng doanh thu
                </Typography>
                <Typography sx={{ fontSize: 28 }}>$ 120,000</Typography>
              </CardContent>
              <CardActions>
                <div className="cardConts">
                  12% Increase From Target
                  <ArrowUpwardOutlinedIcon />
                </div>
              </CardActions>
            </Card>
            <Card
              sx={{ width: "50%", marginRight: "2%", borderRadius: "12px" }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  Ví điện tử
                </Typography>
                <Typography sx={{ fontSize: 28 }}>$ 16,500</Typography>
              </CardContent>
              <CardActions>
                <div className="cardConts">
                  2% Decrease From Target
                  <ArrowDownwardOutlinedIcon />
                </div>
              </CardActions>
            </Card>
            <Card
              sx={{ width: "50%", marginRight: "2%", borderRadius: "12px" }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Tổng chi phí
                </Typography>
                <Typography sx={{ fontSize: 28 }}>$ 48,670</Typography>
              </CardContent>
              <CardActions>
                <div className="cardConts">
                  6% Increase From Target
                  <ArrowUpwardOutlinedIcon />
                </div>
              </CardActions>
            </Card>
            <Card sx={{ width: "50%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Số dư (tài khoản)
                </Typography>
                <Typography sx={{ fontSize: 28 }}>$ 74,330</Typography>
              </CardContent>
              <CardActions>
                <div className="cardConts">
                  1% Increase From Target
                  <ArrowUpwardOutlinedIcon />
                </div>
              </CardActions>
            </Card>
          </div>
          <div className="charts">
            <div className="chartTitle">
              <h2>{labels.statistic}</h2>
              <Form.Item
                style={{ marginTop: "3.5%" }}
                name=""
                rules={[
                  {
                    required: true,
                    message: `Không được để trống`,
                  },
                  {
                    pattern: new RegExp(/^\w/),
                    // message: errorText.space,
                  },
                ]}
              >
                <Select
                  // disabled={isDetail}
                  dropdownStyle={{ zIndex: 2000 }}
                  // onChange={handleSelect}
                  placeholder="Nhập tháng"
                >
                  {/* {listCate.map((item) => {
                                    return <Option value={item._id}>{item.name}</Option>;
                                })} */}
                </Select>
              </Form.Item>
            </div>
            <div className="chartCont">
              <SaleChart />
            </div>
          </div>
        </div>
        <div className="rightAnalysis">
          <div className="bankCard">
            <h3>{labels.bank_card}</h3>
            <img src={CreditCard} />
            <h3 style={{ marginLeft: "25%" }}>COMING SOON</h3>
          </div>
          <div>
            <h3>{labels.target}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
