import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Select, Form } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Line } from "@ant-design/charts";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

const { Search } = Input;
const labels = {
    statistic: "Báo cáo thống kê doanh thu",
    activity_summary: "Tóm tắt hoạt động",
    bank_card: "Thẻ ngân hàng của tôi",
    target: "Mục tiêu",
};
const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
];
const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    point: {
        size: 5,
        shape: "diamond | circule",
    },
    tooltip: {
        formatter: (data) => {
            return {
                name: "",
                value: "",
            };
        },
        customContent: (name, data) =>
            `<div>${data?.map((item) => {
                return `<div class="tooltip-chart" >
              <span class="tooltip-item-name">${item?.name}</span>
              <span class="tooltip-item-value">${item?.value}</span>
            </div>`;
            })}</div>`,
        showMarkers: true,
        showContent: true,
        position: "right | left",
        showCrosshairs: true,
    },
};
export default function Analysis() {
    return (<>
        <div className="analysisCont">
            <div className="leftAnalysis">
                <div className="cards">
                    <Card sx={{ width: "50%", marginRight: "2%" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Tổng doanh thu
                            </Typography>
                            <Typography sx={{ fontSize: 28 }}>
                                $ 120,000
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className="cardCont">
                                12% Increase From Target
                                <ArrowUpwardOutlinedIcon />
                            </div>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: "50%", marginRight: "2%" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Ví điện tử
                            </Typography>
                            <Typography sx={{ fontSize: 28 }}>
                                $ 16,500
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className="cardCont">
                                2% Decrease From Target
                                <ArrowDownwardOutlinedIcon />
                            </div>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: "50%", marginRight: "2%" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Tổng chi phí
                            </Typography>
                            <Typography sx={{ fontSize: 28 }}>
                                $ 48,670
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className="cardCont">
                                6% Increase From Target
                                <ArrowUpwardOutlinedIcon />
                            </div>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: "50%" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Số dư (tài khoản)
                            </Typography>
                            <Typography sx={{ fontSize: 28 }}>
                                $ 74,330
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className="cardCont">
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

                    <Line {...config} />
                </div>
                <div>
                    <h2>{labels.activity_summary}</h2>
                </div>
            </div>
            <div className="rightAnalysis">
                <div>
                    <h3>{labels.bank_card}</h3>
                </div>
                <div>
                    <h3>{labels.target}</h3>
                </div>
            </div>
        </div>
    </>)

}

