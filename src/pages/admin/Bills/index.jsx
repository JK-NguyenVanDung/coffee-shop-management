import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { CloseOutlined } from '@ant-design/icons'
import {menuText} from '../../../helper/Text'

const { Search } = Input;
const columns = [
    {
        title: 'ID đơn hàng',
        dataIndex: 'id_order',
    },
    {
        title: 'Đơn hàng',
        dataIndex: 'order_name',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'order_dayCreate',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'order_status',
    },
    {
        title: 'Phương thức thanh toán',
        dataIndex: 'payment_methods',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'order_totalMoney',
    },
];
const data = [
    {
        key: '1',
        id_order: "01234",
        order_name: "Cafe đá, 25.000 VND, 1",
        order_dayCreate: "12/6/2022",
        order_status: "Đã thanh toán",
        payment_methods: "Tiền mặt",
        order_totalMoney: "100.000 VND",
    },
    {
        key: '2',
        id_order: "01234",
        order_name: "Cafe đá, 25.000 VND, 1",
        order_dayCreate: "12/6/2022",
        order_status: "Chưa thanh toán",
        payment_methods: "Ví điện tử",
        order_totalMoney: "100.000 VND",
    },
    {
        key: '3',
        id_order: "01234",
        order_name: "Cafe đá, 25.000 VND, 1",
        order_dayCreate: "12/6/2022",
        order_status: "Đã thanh toán",
        payment_methods: "Zalo pay",
        order_totalMoney: "100.000 VND",
    },
    {
        key: '4',
        id_order: "01234",
        order_name: "Cafe đá, 25.000 VND, 1",
        order_dayCreate: "12/6/2022",
        order_status: "Đã thanh toán",
        payment_methods: "Tiền mặt",
        order_totalMoney: "100.000 VND",
    },
    {
        key: '5',
        id_order: "01234",
        order_name: "Cafe đá, 25.000 VND, 1",
        order_dayCreate: "12/6/2022",
        order_status: "Đã thanh toán",
        payment_methods: "Tiền mặt",
        order_totalMoney: "100.000 VND",
    },
    {
        key: '6',
        id_order: "01234",
        order_name: "Cafe đá, 25.000 VND, 1",
        order_dayCreate: "12/6/2022",
        order_status: "Đã thanh toán",
        payment_methods: "Tiền mặt",
        order_totalMoney: "100.000 VND",
    },
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const Bills = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    return (<>
        <div>
        <div className="dishSearchCont">
            <Button variant="contained" endIcon={<CloseOutlined/>} style={{marginRight:'10px'}} size= "small">
                HỦY ĐƠN
            </Button>
            <Button variant="contained" endIcon={<LocalPrintshopOutlinedIcon/>} style={{marginRight:'10px'}} >
                IN ĐƠN
            </Button>
            <div className="dishSearch">
                <Search placeholder={menuText.searchMenu} allowClear size="default" />
            </div>
        </div>
            <Table
                rowSelection={{
                    type: selectionType,
                          rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    </>)
}
export default Bills;


