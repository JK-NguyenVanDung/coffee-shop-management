import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import './index.scss';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { menuText } from '../../../helper/Text'


const { Search } = Input;
const columns = [
    {
        title: 'ID món ăn',
        dataIndex: 'id_dish',
    },
    {
        title: 'Hình/Tên món',
        dataIndex: 'dish_name',
    },
    {
        title: 'Công thức',
        dataIndex: 'dish_recipes',
    },
    {
        title: 'Đơn giá',
        dataIndex: 'unit_price',
    },
    {
        title: 'Ẩn món',
        render: () => {
            return (
                <>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked />} label="Hiện" size= "small"/>                        
                    </FormGroup>
                </>
            );
        }
    },
    {
        title: 'Hoạt động',
        render: () => {
            return (
                <>
                    <Button variant="contained" endIcon={<EditIcon />} style={{ marginRight: '20px' }} size= "small">
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
        id_dish: "0123456789",
        dish_name: "Cafe Sữa",
        dish_avatar: "Hình",
        dish_recipes: "Rót cafe 2/3 ly  pha với 10ml sữa đặt và 2/3...",
        unit_price: "25.000 VND",
    },
    {
        key: '2',
        id_dish: "0123456789",
        dish_name: "Cafe Sữa",
        dish_avatar: "Hình",
        dish_recipes: "Rót cafe 2/3 ly  pha với 10ml sữa đặt và 2/3...",
        unit_price: "25.000 VND",
    },
    {
        key: '3',
        id_dish: "0123456789",
        dish_name: "Cafe Sữa",
        dish_avatar: "Hình",
        dish_recipes: "Rót cafe 2/3 ly  pha với 10ml sữa đặt và 2/3...",
        unit_price: "25.000 VND",
    },
    {
        key: '4',
        id_dish: "0123456789",
        dish_name: "Cafe Sữa",
        dish_avatar: "Hình",
        dish_recipes: "Rót cafe 2/3 ly  pha với 10ml sữa đặt và 2/3...",
        unit_price: "25.000 VND",
    },
    {
        key: '5',
        id_dish: "0123456789",
        dish_name: "Cafe Sữa",
        dish_avatar: "Hình",
        dish_recipes: "Rót cafe 2/3 ly  pha với 10ml sữa đặt và 2/3...",
        unit_price: "25.000 VND",
    },
    {
        key: '6',
        id_dish: "0123456789",
        dish_name: "Cafe Sữa",
        dish_avatar: "Hình",
        dish_recipes: "Rót cafe 2/3 ly  pha với 10ml sữa đặt và 2/3...",
        unit_price: "25.000 VND",
    },
];
// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
// };
const FoodAndDrink = () => {
    // const [selectionType, setSelectionType] = useState('checkbox');
    return (<>
        <div className="dishSearchCont">
            <Button variant="contained" endIcon={<AddIcon />} style={{ marginRight: '10px'}} size= "small">
                THÊM MÓN
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
export default FoodAndDrink;
