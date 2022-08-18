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
import * as collections from "../../../api/Collections/analysis";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { vi } from "date-fns/locale";
import { numbToDecimal } from "../../../helper/currency";
import { Area } from "@ant-design/charts";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { CloseOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material";
import Loading from "../../../components/Loading";

import CreditCard from "../../../assets/img/CreditCard.svg";
const { Search } = Input;
const { Option } = Select;
const cardTitle = {
  total_revenue: "Tổng doanh thu (VND)",
  electronic_wallet: "Ví điện tử (VND)",
  total_cost: "Tổng chi phí (VND)",
  account_balance: "Lợi nhuận (VND)",
};
const cardCont = {
  revenue_target: "12% Increase From Target",
  wallet_target: "2% Decrease From Target",
  cost_target: "6% Increase From Target",
  balance_target: "1% Increase From Target",
};
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
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.analysis.listAll);

  const date = useAppSelector((state) => state.analysis.date);
  const fetchData = async (value) => {
    try {
      setLoading(true);
      let response = null;
      let stat = null;
      if (date) {
        response = await collections.getData(date);
        stat = await collections.getStat(date);
      } else {
        let out = getMonthAndYear(new Date());
        response = await collections.getData(out);
        stat = await collections.getStat(out);
      }
      console.log(stat.statistics[0]);
      let total = stat.statistics[0].bills_total[0].sum;
      let momo = stat.statistics[1].momo_total[0].sum;
      let vn_pay = stat.statistics[3].vnpay_total[0].sum;
      let cash = stat.statistics[2].cash_total[0].sum;
      let inventory = stat.statistics[4].stored_total[0]
        ? stat.statistics[4].stored_total[0].sum
        : 0;
      let group = {
        total: total,
        cash: cash,
        inventory: inventory,
        momo: momo,
        vn_pay: vn_pay,
      };
      dispatch(actions.analysisActions.setStats(group));

      let data = response.sum_data.map((item) => {
        return {
          month: "Tháng  " + item.month,
          value: item[0] ? item[0].sum : 0,
        };
      });

      console.log(data);
      dispatch(actions.analysisActions.setListAll(data));

      setLoading(false);
      // setPagination({
      //   totalDocs: response.metadata.count,
      // });
    } catch (error) {
      //history.replace("/");
    }
  };

  useEffect(() => {
    // test.current = 2;
    fetchData();
  }, [date]);

  // const data = [
  //   { month: "1", value: 3000000 },
  //   { month: "2", value: 4000000 },
  //   { month: "3", value: 350000 },
  //   { month: "4", value: 5000000 },
  //   { month: "5", value: 490000 },
  //   { month: "6", value: 6000000 },
  //   { month: "7", value: 7000000 },
  //   { month: "8", value: 9000000 },
  //   { month: "9", value: 13000000 },
  //   { month: "10", value: 13000000 },
  //   { month: "11", value: 13000000 },
  //   { month: "12", value: 13000000 },
  // ];
  const config = {
    data,
    xField: "month",
    yField: "value",
    yAxis: {
      line: {
        style: {
          lineDash: [0, 0],
          lineWidth: 1,
          stroke: "#e9e9e9",
        },
      },

      label: {
        formatter: (val) => {
          let str = val.toString();
          const withoutLast3 = str.slice(0, -3);

          return val > 999 ? withoutLast3 + "K" : val;
        },
      },
    },
    xAxis: {
      label: {
        formatter: (val) => {
          return val;
        },
      },
    },
    meta: {
      month: {
        alias: "Tháng",
      },
      value: {
        alias: "Tổng doanh thu",
      },
    },
    label: {},
    smooth: true,
    padding: "auto",
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#3450B1 1:#3450B1",
      };
    },
    // point: {
    //   size: 5,
    //   shape: "circule",
    //   style: {
    //     fill: "white",
    //     stroke: "#5B8FF9",
    //     lineWidth: 2,
    //   },
    // },
    // tooltip: {
    //   showMarkers: false,
    // },
    // state: {
    //   active: {
    //     style: {
    //       shadowBlur: 4,
    //       stroke: "#000",
    //       fill: "red",
    //     },
    //   },
    // },
    // interactions: [
    //   {
    //     type: "marker-active",
    //   },
    // ],
  };
  return (
    <>
      <Loading loading={loading} /> <Area {...config} />{" "}
    </>
  );
};

function getMonthAndYear(e) {
  let month = new Date(e).getMonth();
  let year = new Date(e).getFullYear();
  return {
    month: month + 1,
    year: year,
  };
}
export default function Analysis() {
  const dispatch = useAppDispatch();
  const stats = useAppSelector((state) => state.analysis.stats);

  const [date, setDate] = useState();
  function getDate(e) {
    setDate(e);
    let out = getMonthAndYear(e);
    dispatch(actions.analysisActions.setDate(out));
    console.log(out);
  }
  return (
    <>
      <div className="analysisCont">
        <div className="leftAnalysis">
          <div className="cards">
            <Card
              sx={{ width: "54%", marginRight: "2%", borderRadius: "12px" }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {cardTitle.total_revenue}
                </Typography>
                <Typography sx={{ fontSize: 28 }}>
                  {stats ? numbToDecimal(stats.total) : 0}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <div className="cardConts">
                  {cardCont.revenue_target}
                  <ArrowUpwardOutlinedIcon />
                </div> */}
              </CardActions>
            </Card>
            <Card
              sx={{ width: "50%", marginRight: "2%", borderRadius: "12px" }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                  {cardTitle.electronic_wallet}
                </Typography>
                <Typography sx={{ fontSize: 28 }}>
                  {stats ? numbToDecimal(stats.momo + stats.vn_pay) : 0}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <div className="cardConts">
                  {cardCont.wallet_target}
                  <ArrowDownwardOutlinedIcon />
                </div> */}
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
                  {cardTitle.total_cost}
                </Typography>
                <Typography sx={{ fontSize: 28 }}>
                  {stats ? numbToDecimal(stats.inventory) : 0}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <div className="cardConts">
                  {cardCont.cost_target}
                  <ArrowUpwardOutlinedIcon />
                </div> */}
              </CardActions>
            </Card>
            <Card sx={{ width: "50%", borderRadius: "12px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {cardTitle.account_balance}
                </Typography>
                <Typography sx={{ fontSize: 28 }}>
                  {stats ? numbToDecimal(stats.total - stats.inventory) : 0}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <div className="cardConts">
                  {cardCont.balance_target}
                  <ArrowUpwardOutlinedIcon />
                </div> */}
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
                {/* <Select
                  // disabled={isDetail}
                  dropdownStyle={{ zIndex: 2000 }}
                  // onChange={handleSelect}
                  placeholder="Nhập tháng"
                >
                  {/* {listCate.map((item) => {
                                    return <Option value={item._id}>{item.name}</Option>;
                                })} 
                                                </Select>
*/}
                <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    views={["year", "month"]}
                    label="Chọn năm và tháng"
                    minDate={new Date("2022-07-01")}
                    maxDate={new Date()}
                    value={date}
                    onChange={getDate}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} size="small" />
                    )}
                  />{" "}
                </LocalizationProvider>
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
            <h3
              style={{
                display: "flex",
                width: "150%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              UNAVAILABLE
            </h3>
          </div>
          {/* <div>
            <h3>{labels.target}</h3>
          </div> */}
        </div>
      </div>
    </>
  );
}
