import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import {menuText} from '../../../helper/Text'


const { Search } = Input;
const columns = [
    {
        title: 'ID mặt hàng',
        dataIndex: 'id_items',
    },
    {
        title: 'Ngày nhập',
        dataIndex: 'items_dateAdded',
    },
    {
        title: 'Hình/Tên mặt hàng',
        dataIndex: 'items_name',
        // dataIndex: 'items_avatar',
    },
    {
        title: 'Số lượng/Đơn vị',
        dataIndex: 'items_amount',
        // dataIndex: 'items_unit',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'items_totalMoney',
    },
    {
        title: 'Hoạt động',
        render: () => {
            return (
                <>
                    <Button variant="contained" endIcon={<EditIcon />} style={{marginRight:'20px'}} size= "small">
                        Sửa
                    </Button>
                    <Button variant="contained" endIcon={<DeleteSweepIcon />} size= "small">
                        Xóa
                    </Button>
                </>
            );
        }
    },
];
const data = [
    {
        key: '1',
        id_items: "0288335",
        items_name: "Cafe",
        items_dateAdded: "12/6/2022",
        items_avatar: "Hình cafe",
        items_amount: "10",
        items_unit: "Thùng",
        items_totalMoney: "600.000 VND",
    },
    {
        key: '2',
        id_items: "288335",
        items_name: "Cafe",
        items_dateAdded: "12/6/2022",
        items_avatar: "Hình cafe",
        items_amount: "10",
        items_unit: "Thùng",
        items_totalMoney: "600.000 VND",
    },
    {
        key: '3',
        id_items: "288335",
        items_name: "Cafe",
        items_dateAdded: "12/6/2022",
        items_avatar: "Hình cafe",
        items_amount: "10",
        items_unit: "Thùng",
        items_totalMoney: "600.000 VND",
    },
    {
        key: '4',
        id_items: "288335",
        items_name: "Cafe",
        items_dateAdded: "12/6/2022",
        items_avatar: "Hình cafe",
        items_amount: "10",
        items_unit: "Thùng",
        items_totalMoney: "600.000 VND",
    },
    {
        key: '5',
        id_items: "288335",
        items_name: "Cafe",
        items_dateAdded: "12/6/2022",
        items_avatar: "Hình cafe",
        items_amount: "10",
        items_unit: "Thùng",
        items_totalMoney: "600.000 VND",
    },
    {
        key: '6',
        id_items: "288335",
        items_name: "Cafe",
        items_dateAdded: "12/6/2022",
        items_avatar: "Hình cafe",
        items_amount: "10",
        items_unit: "Thùng",
        items_totalMoney: "600.000 VND",
    },
];
// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
// };
const Inventory = () => {
    // const [selectionType, setSelectionType] = useState('checkbox');
    return (<>
          <div className="dishSearchCont">
            <Button variant="contained" endIcon={<AddIcon/>} style={{marginRight:'10px'}} size= "small">
                NHẬP HÀNG
            </Button>
            <div className="dishSearch">
                <Search placeholder={menuText.searchMenu} allowClear size="default" />
            </div>
        </div>
        <div>
            <Table
                // rowSelection={{
                //     type: selectionType,
                //     rowSelection,
                // }}
                columns={columns}
                dataSource={data}
            />
        </div>
    </>)
}
export default Inventory;


