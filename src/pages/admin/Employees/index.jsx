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
import ConstructionIcon from '@mui/icons-material/Construction';
import { CloseOutlined } from '@ant-design/icons'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { menuText } from '../../../helper/Text'

const { Search } = Input
const columns = [
    {
        title: 'ID nhân viên',
        dataIndex: 'id_card',
        // render: (text) => <a>{text}</a>,
    },
    {
        title: 'Họ tên',
        dataIndex: 'full_name',
    },
    {
        title: 'Thông tin liên lạc',
        dataIndex: 'address',
        // dataIndex: 'sdt',
        // dataIndex: 'avatar',
        // dataIndex: 'age',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Password',
        dataIndex: 'password',
    },
    {
        title: 'Tình trạng',
        dataIndex: 'status',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'position',
    },
    {
        title: 'Hoạt động',
        render: () => {
            return (
                <>
                    <Button variant="contained" endIcon={<EditIcon />} style={{ marginRight: '20px' }} size="small">
                        Sửa
                    </Button>
                    <Button variant="contained" endIcon={<DeleteSweepIcon />} size="small">
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
        id_card: "0123456789",
        full_name: "Trần Văn A",
        email: "spottran2001@gmail.com",
        sdt: "0567656521",
        address: "123 Trần Phú",
        age: 25,
        avatar: "Hình",
        password: "sadasdasd",
        status: "Còn làm",
        position: "Nhân viên",

    },
    {
        key: '2',
        id_card: "1234567890",
        full_name: "Trần Văn B",
        email: "spottran2001@gmail.com",
        sdt: "0123347685",
        address: "231 Trần Phú",
        age: 10,
        avatar: "Hình",
        password: "sadasdasd",
        status: "Còn làm",
        position: "Nhân viên",

    },
    {
        key: '3',
        id_card: "2345678901",
        full_name: "Trần Văn C",
        email: "spottran2001@gmail.com",
        sdt: "0182763347",
        address: "321 Trần Phú",
        age: 27,
        avatar: "Hình",
        password: "sadasdasd",
        status: "Tạm nghỉ",
        position: "Nhân viên",

    },
    {
        key: '4',
        id_card: "3456789012",
        full_name: "Trần Văn D",
        email: "spottran2001@gmail.com",
        sdt: "0127324334",
        address: "012 Trần Phú",
        age: 20,
        avatar: "Hình",
        password: "sadasdasd",
        status: "Đã nghỉ",
        position: "Nhân viên",

    },
    {
        key: '5',
        id_card: "3456789012",
        full_name: "Trần Văn D",
        email: "spottran2001@gmail.com",
        sdt: "0127324334",
        address: "012 Trần Phú",
        age: 20,
        avatar: "Hình",
        password: "sadasdasd",
        status: "Còn làm",
        position: "Nhân viên",

    },
    {
        key: '6',
        id_card: "3456789012",
        full_name: "Trần Văn D",
        email: "spottran2001@gmail.com",
        sdt: "0127324334",
        address: "012 Trần Phú",
        age: 20,
        avatar: "Hình",
        password: "sadasdasd",
        status: "Còn làm",
        position: "Nhân viên",

    },
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const Employees = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [fullname, setFullName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [identityCard, setIdentityCard] = React.useState('');
    const [employeesID, setEmployeesID] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    // const [age, setAge] = React.useState('');
    // const [age, setAge] = React.useState('');
    // const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setFullName(event.target.value);
        setAge(event.target.value);
        setIdentityCard(event.target.value);
        setEmployeesID(event.target.value);
        setEmail(event.target.value);
        setPhone(event.target.value);
        setAddress(event.target.value);
        setAge(event.target.value);
    };
    return (<>
        <div className="dishSearchCont">
            <Button variant="contained" endIcon={<ConstructionIcon />} style={{ marginRight: '10px' }} size="small">
                QUẢN LÝ
            </Button>
            <Button variant="contained" endIcon={<AddIcon />} style={{ marginRight: '10px' }} size="small">
                THÊM NHÂN VIÊN
            </Button>
            <div className="dishSearch">
                <Search placeholder={menuText.searchMenu} allowClear size="default" />
            </div>
        </div>
        <div>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
        <div class="employeesInfo">
            <div className="totalContent">
                <div class="employeesTitleInfo">
                    <h2>Thông tin nhân viên</h2>
                    <CloseOutlined />
                </div>
                <div class="employeesCont">
                    <div className='employeesContL'>
                        <div className='employeesAvatar'>
                            <h3>Hình ảnh</h3>
                        </div>
                        <div className='employeesName'>
                            <Box sx={{ minWidth: 306 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Họ Tên</InputLabel>
                                    <Select

                                        value={fullname}
                                        label="FullName"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Nguyễn Thị A</MenuItem>
                                        <MenuItem value={20}>Nguyễn Thị B</MenuItem>
                                        <MenuItem value={30}>Nguyễn Thị C</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='employeesAge'>
                            <Box sx={{ minWidth: 306 }}>
                                <FormControl fullWidth>
                                    <InputLabel >Tuổi</InputLabel>
                                    <Select

                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>20</MenuItem>
                                        <MenuItem value={20}>30</MenuItem>
                                        <MenuItem value={30}>40</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='identityCard'>
                            <Box sx={{ minWidth: 306 }}>
                                <FormControl fullWidth>
                                    <InputLabel>CMND/CCCD</InputLabel>
                                    <Select

                                        value={identityCard}
                                        label="IdentityCard"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>4646586786767</MenuItem>
                                        <MenuItem value={20}>2131241151251</MenuItem>
                                        <MenuItem value={30}>1251251345355</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='employeesContR'>
                        <div className='employeesID'>
                        
                            <Box sx={{ minWidth: 590 }}>
                                <FormControl fullWidth>
                                    <InputLabel >ID nhân viên</InputLabel>
                                    <Select
                                        value={employeesID}
                                        label="EmployeesID"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>32423423423</MenuItem>
                                        <MenuItem value={20}>23423423423</MenuItem>
                                        <MenuItem value={30}>75887867866</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='employeesEmail'>
                            <Box sx={{ minWidth: 590 }}>
                                <FormControl fullWidth>
                                    <InputLabel >Email</InputLabel>
                                    <Select
                                        value={email}
                                        label="Email"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>spottran2001@gmail.com</MenuItem>
                                        <MenuItem value={20}>spottran2002@gmail.com</MenuItem>
                                        <MenuItem value={30}>spottran2003@gmail.com</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='employeesPhone'>
                            <Box sx={{ minWidth: 590 }}>
                                <FormControl fullWidth>
                                    <InputLabel >SĐT</InputLabel>
                                    <Select
                                        value={phone}
                                        label="Phone"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>0987564523</MenuItem>
                                        <MenuItem value={20}>0923434134</MenuItem>
                                        <MenuItem value={30}>0122353456</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='employeesPass'>
                            <h3>Mật khẩu</h3>

                        </div>
                        <div className='employeesAddress'>
                            <Box sx={{ minWidth: 590 }}>
                                <FormControl fullWidth>
                                    <InputLabel >Địa chỉ</InputLabel>
                                    <Select
                                        value={address}
                                        label="Address"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>123 Trần Phú</MenuItem>
                                        <MenuItem value={20}>231 Trần Phú</MenuItem>
                                        <MenuItem value={30}>321 Trần Phú</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className='employeesStatus'>
                            <h3>Tình trạng</h3>

                        </div>
                        <div className='employeesPosition'>
                            <h3>Chức vụ</h3>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Nhân viên" />
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Quản lý" />
                            </FormGroup>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Employees;
