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
import { CloseOutlined } from "@ant-design/icons";
import { IconButton } from "@mui/material";

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
function getHeaderTitle() {
    return "Danh sách thống kê/ngày";
  }
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
                            <Typography sx={{ fontSize: 16 }} gutterBottom>
                                Tổng doanh thu
                            </Typography>
                            <Typography sx={{ fontSize: 28 }}>
                                $ 120,000
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className="cardConts">
                                12% Increase From Target
                                <ArrowUpwardOutlinedIcon />
                            </div>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: "50%", marginRight: "2%" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} gutterBottom>
                                Ví điện tử
                            </Typography>
                            <Typography sx={{ fontSize: 28 }}>
                                $ 16,500
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className="cardConts">
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
                            <div className="cardConts">
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

                    <Line {...config} />
                </div>
                <div>
                    <h2>{labels.activity_summary}</h2>
                   
                </div>
                <div className="modalCont">
                        {/* {modalError && <AlertModal chilren={errorText.formValidation} />} */}
                        <div className="headerCont">
                            <h2>{getHeaderTitle()}</h2>
                            <IconButton >
                                <CloseOutlined />
                            </IconButton>
                        </div>
                        <Form  className="form" initialValues={{ modifier: "public" }}>
                            <div className="bodyCont">
                                <div style={{ width: "40%" }}>
                                    <h4>{labels.morning_money}</h4>
                                    <Form.Item
                                        name=""
                                        rules={[
                                            {
                                                required: true,
                                                message: `Không được để trống tiền buổi sáng`,
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
                                            placeholder="Nhập tiền buổi sáng"
                                        >
                                            <Option value={true}>100.000 VND</Option>
                                            <Option value={false}>200.000 VND</Option>
                                        </Select>
                                    </Form.Item>
                                    <h4>{labels.lunch_money}</h4>
                                    <Form.Item
                                        name=""
                                        rules={[
                                            {
                                                required: true,
                                                message: `Không được để trống tiền buổi trưa`,
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
                                            placeholder="Nhập tiền buổi trưa"
                                        >
                                            <Option value={true}>100.000 VND</Option>
                                            <Option value={false}>200.000 VND</Option>
                                        </Select>
                                    </Form.Item>
                                    <h4>{labels.evening_money}</h4>
                                    <Form.Item
                                        name=""
                                        rules={[
                                            {
                                                required: true,
                                                message: `Không được để trống tiền buổi tối`,
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
                                            placeholder="Nhập tiền buổi tối"
                                        >
                                            <Option value={true}>100.000 VND</Option>
                                            <Option value={false}>200.000 VND</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="btnAnalysis">
                                <Button
                                    size="Large"
                                    color="primary"
                                    variant="contained"
                                    style={{
                                        paddingLeft: "15%",
                                        paddingRight: "15%",
                                        paddingTop: "2%",
                                        paddingBottom: "2%",
                                        color: "#fff",
                                    }}
                                    // disabled={loading}
                                    // onClick={dataItem && isDetail === true ? editItem : handleOk}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </Form>
                        {/* <AlertDialog
                            children={`Xác nhận xoá ${dataItem ? dataItem.name : null} ?`}
                            title="Xoá nhóm món"
                            onAccept={handleDelete}
                        /> */}
                    </div>
            </div>
            <div className="rightAnalysis">
                <div className="bankCard">
                    <h3>{labels.bank_card}</h3>
                    <Card sx={{ width: "140%", backgroundColor: "#4CACBA" }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 16 }} gutterBottom>
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
                </div>
                <div>
                    <h3>{labels.target}</h3>
                </div>
            </div>
        </div>
    </>)

}

