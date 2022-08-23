import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Form, Switch } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import { Column } from "@ant-design/plots";
import { each, groupBy } from "@antv/util";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
import * as bankCollections from "../../../api/Collections/bank";

import CreditCard from "../../../assets/img/CreditCard.svg";

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
  bank: "Báo cáo thống kê ngân sách mỗi ngày",
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
  const type = useAppSelector((state) => state.analysis.type);
  const date = useAppSelector((state) => state.analysis.date);
  const fetchData = async (value) => {
    try {
      setLoading(true);
      let response = null;
      let stat = null;
      if (date) {
        response = type
          ? await collections.getData(date)
          : await collections.getTotalMonth(date);
        stat = await collections.getStat(date);
      } else {
        let out = getMonthAndYear(new Date());
        response = type
          ? await collections.getData(out)
          : await collections.getTotalMonth(date);
        stat = await collections.getStat(out);
      }
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
      let data = [];
      if (type) {
        data = response.month_data.map((item) => {
          return {
            month: "Ngày  " + item.day,
            value: item[0] ? item[0].sum : 0,
          };
        });
      } else {
        data = response.sum_data.map((item) => {
          return {
            month: "Tháng  " + item.month,
            value: item[0] ? item[0].sum : 0,
          };
        });
      }

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
    console.log(date);
    fetchData();
  }, [date, type]);

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
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
function getMonthAndYear(e) {
  let month = new Date(e).getMonth();
  let year = new Date(e).getFullYear();
  let numberOfDate = daysInMonth(month, year);
  return {
    month: month + 1,
    year: year,
    days_of_month: numberOfDate,
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
  function changeType(e) {
    getDate(new Date());
    dispatch(actions.analysisActions.setType(e));
  }
  return (
    <>
      <div className="analysisCont">
        <div className="leftAnalysis">
          <div className="cards">
            <Card
              sx={{
                width: "54%",
                height: "15vh",
                marginRight: "2%",
                borderRadius: "12px",
              }}
              className="card drop-shadow"
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
              className="card drop-shadow"
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
              className="card drop-shadow"
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
            <Card sx={{ width: "50%", borderRadius: "12px" }} className="card">
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
              <Form.Item style={{ marginTop: "3.5%" }}>
                <div className="chartsHeader">
                  <Box sx={{ minWidth: 200, marginRight: "5%" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Lọc</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={true}
                        size="small"
                        label="Age"
                        onChange={(e) => changeType(e)}
                      >
                        <MenuItem value={true}>Hiển thị theo ngày</MenuItem>
                        <MenuItem value={false}>Hiển thị theo tháng</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <LocalizationProvider
                    locale={vi}
                    dateAdapter={AdapterDateFns}
                  >
                    <DesktopDatePicker
                      views={["year", "month"]}
                      label="Chọn năm và tháng"
                      minDate={new Date("2022-08-01")}
                      maxDate={new Date()}
                      value={date}
                      onChange={getDate}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} size="small" />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </Form.Item>
            </div>
            <div className="chartCont">
              <SaleChart />
            </div>
          </div>
        </div>
        {/* <div className="rightAnalysis">
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
       
        </div> */}
      </div>
      <BankColumn />
    </>
  );
}

const BankColumn = () => {
  const [apiData, setAPIData] = useState([]);

  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function checkMonth(date) {
    return true ? selectedDate.getMonth() === date.getMonth() : false;
  }
  useEffect(() => {
    asyncFetch();
  }, []);
  useEffect(() => {
    getData(apiData);
  }, [selectedDate]);
  function getDate(e) {
    setSelectedDate(e);
  }
  async function getData(data) {
    let tempList = [];
    for (let i = 0; i < data.length; i++) {
      let date = new Date(data[i].createdAt).toLocaleDateString("vi-VN");
      let isMonth = checkMonth(new Date(data[i].createdAt));
      if (isMonth) {
        let m = {
          date: date,
          value: data[i].morning,
          type: "Ca sáng",
        };
        let a = {
          date: date,
          value: data[i].afternoon,
          type: "Ca chiều",
        };
        let n = {
          date: date,
          value: data[i].night,
          type: "Ca tối",
        };
        let e = {
          date: date,
          value: data[i].proceeds,
          type: "Tổng tiền trong ngày",
        };
        tempList.push(e, n, a, m);
      }
    }
    console.log(tempList);
    setData(tempList);
  }
  const asyncFetch = async () => {
    let data = await bankCollections.getBanks();
    console.log(data);
    getData(data);
    setAPIData(data);
  };

  const config = {
    data,
    isGroup: true,
    dodgePadding: 2,
    intervalPadding: 20,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    xField: "date",
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
    seriesField: "type",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle", // 'top', 'bottom', 'middle'
    },
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
    connectedArea: {
      style: (oldStyle, element) => {
        return {
          fill: "rgba(0,0,0,0.25)",
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        };
      },
    },
  };

  return (
    <div className="charts">
      <div className="chartTitle">
        <h2>{labels.bank}</h2>
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
          <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              views={["year", "month"]}
              label="Chọn năm và tháng"
              minDate={new Date("2022-08-01")}
              maxDate={new Date()}
              value={selectedDate}
              onChange={getDate}
              renderInput={(params) => (
                <TextField {...params} helperText={null} size="small" />
              )}
            />
          </LocalizationProvider>
        </Form.Item>
      </div>
      <div className="chartCont">
        <Column {...config} />
      </div>
    </div>
  );
};
