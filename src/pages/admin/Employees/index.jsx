import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, Form, DatePicker } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, } from '@ant-design/icons';
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import './index.scss';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ConstructionIcon from '@mui/icons-material/Construction';
import { CloseOutlined } from '@ant-design/icons'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { menuText } from '../../../helper/Text'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


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
                    <Button variant="contained" endIcon={<EditIcon />} style={{ marginRight: '7%' }} size="small">
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
    const [value, setValue] = React.useState('still break');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    

    return (<>
        <div className="dishSearchCont">
            <Button variant="contained" endIcon={<ConstructionIcon />} style={{ marginRight: '1%' }} size="small">
                QUẢN LÝ
            </Button>

            <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon />} style={{ marginRight: '1%' }} size="small">
                THÊM NHÂN VIÊN
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="employeesTitleAdd"
                aria-describedby="employeesContAdd"
            >
                <Box sx={{ style }}>
                    {/* Thêm nhân viên */}
                    <Form layout="horizontal" class="employeesAdd">
                        <Form className="totalContentAdd">
                            <Form.Item class="employeesTitleAdd">
                                <h2>Thêm nhân viên</h2>
                                <CloseOutlined />
                            </Form.Item>
                            <Form class="employeesContAdd">
                                <Form className='employeesAddL'>
                                    <Form.Item className='employeesAvatarAdd'>
                                        <h4>Hình ảnh</h4>
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            Upload File
                                            <input
                                                type="file"
                                                hidden
                                            />
                                        </Button>
                                    </Form.Item>
                                    <Form.Item className='employeesNameAdd'>
                                        <h4>Họ tên</h4>
                                        <Input placeholder="Nhập họ tên" />
                                    </Form.Item>
                                    <Form.Item className='employeesBirthdayAdd'>
                                        <h4>Ngày sinh</h4>
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item className='identityCardAdd'>
                                        <h4>CMND/CCCD</h4>
                                        <Input placeholder="Nhập CMND" />
                                    </Form.Item>
                                </Form>
                                <Form className='employeesAddR'>
                                    <Form.Item className='employeesIDAdd'>
                                        <h4>ID nhân viên</h4>
                                        <Input placeholder="Nhập ID nhân viên" />
                                    </Form.Item>
                                    <Form.Item className='employeesEmailAdd'>
                                        <h4>Email</h4>
                                        <Input placeholder="Nhập email" />
                                    </Form.Item>
                                    <Form.Item className='employeesPhoneAdd'>
                                        <h4>SĐT</h4>
                                        <Input placeholder="Nhập số điện thoại" />
                                    </Form.Item>
                                    <Form.Item className='employeesPassAdd'>
                                        <h4>Mật khẩu</h4>
                                        <Input.Password placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Form.Item className='employeesAddressAdd'>
                                        <h4>Địa chỉ</h4>
                                        <Input placeholder="Nhập địa chỉ" />
                                    </Form.Item>
                                    <Form.Item className='employeesStatusAdd'>
                                        <h4>Tình trạng</h4>
                                        <RadioGroup
                                            row
                                            value={value}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel value="still break" control={<Radio />} label="Còn làm" />
                                            <FormControlLabel value="temporary break" control={<Radio />} label="Tạm nghỉ" />
                                            <FormControlLabel value="took a break" control={<Radio />} label="Đã nghỉ" />
                                        </RadioGroup>
                                    </Form.Item>
                                    <Form.Item className='employeesPositionAdd'>
                                        <h4>Chức vụ</h4>
                                        <Form.Item className="positionCheckAdd">
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Nhân viên" />
                                            <FormControlLabel control={<Checkbox defaultChecked />} label="Quản lý" />
                                        </Form.Item>
                                    </Form.Item>
                                </Form>
                            </Form>
                            <Form.Item className="employeesBtnAdd">
                                <Button variant="contained">Lưu</Button>
                                <Button variant="contained">Hủy</Button>
                            </Form.Item>
                        </Form>
                    </Form>
                </Box>
            </Modal>

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



        {/* Thông tin nhân viên */}
        <Form class="employeesInfo">
            <Form className="totalContentInfo">
                <Form.Item class="employeesTitleInfo">
                    <h2>Thông tin nhân viên</h2>
                    <CloseOutlined />
                </Form.Item>
                <Form class="employeesContInfo">
                    <Form className='employeesInfoL'>
                        <Form.Item className='employeesAvatarInfo'>
                            <h4>Hình ảnh</h4>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                        </Form.Item>
                        <Form.Item className='employeesNameInfo'>
                            <h4>Họ tên</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesBirthdayInfo'>
                            <h4>Ngày sinh</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='identityCardInfo'>
                            <h4>CMND/CCCD</h4>
                            <Input />
                        </Form.Item>
                    </Form>
                    <Form className='employeesInfoR'>
                        <Form.Item className='employeesIDInfo'>
                            <h4>ID nhân viên</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesEmailInfo'>
                            <h4>Email</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesPhoneInfo'>
                            <h4>SĐT</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesPassInfo'>
                            <h4>Mật khẩu</h4>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item className='employeesAddressInfo'>
                            <h4>Địa chỉ</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesStatusInfo'>
                            <h4>Tình trạng</h4>
                            <RadioGroup
                                row
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="still break" control={<Radio />} label="Còn làm" />
                                <FormControlLabel value="temporary break" control={<Radio />} label="Tạm nghỉ" />
                                <FormControlLabel value="took a break" control={<Radio />} label="Đã nghỉ" />
                            </RadioGroup>
                        </Form.Item>
                        <Form.Item className='employeesPositionInfo'>
                            <h4>Chức vụ</h4>
                            <Form.Item className="positionCheckInfo">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Nhân viên" />
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Quản lý" />
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Form>
                <Form.Item className="employeesBtnInfo">
                    <Button variant="contained">Sửa</Button>
                    <Button variant="contained">Xóa</Button>
                </Form.Item>
            </Form>
        </Form>

        {/* Sửa thông tin nhân viên */}
        <Form class="employeesEdit">
            <Form className="totalContentEdit">
                <Form.Item class="employeesTitleEdit">
                    <h2>Sửa thông tin nhân viên</h2>
                    <CloseOutlined />
                </Form.Item>
                <Form class="employeesContEdit">
                    <Form className='employeesEditL'>
                        <Form.Item className='employeesAvatarEdit'>
                            <h4>Hình ảnh</h4>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload File
                                <input
                                    type="file"
                                    hidden
                                />
                            </Button>
                        </Form.Item>
                        <Form.Item className='employeesNameEdit'>
                            <h4>Họ tên</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesBirthdayEdit'>
                            <h4>Ngày sinh</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='identityCardEdit'>
                            <h4>CMND/CCCD</h4>
                            <Input />
                        </Form.Item>
                    </Form>
                    <Form className='employeesEditR'>
                        <Form.Item className='employeesIDEdit'>
                            <h4>ID nhân viên</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesEmailEdit'>
                            <h4>Email</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesPhoneEdit'>
                            <h4>SĐT</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesPassEdit'>
                            <h4>Mật khẩu</h4>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item className='employeesAddressEdit'>
                            <h4>Địa chỉ</h4>
                            <Input />
                        </Form.Item>
                        <Form.Item className='employeesStatusEdit'>
                            <h4>Tình trạng</h4>
                            <RadioGroup
                                row
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="still break" control={<Radio />} label="Còn làm" />
                                <FormControlLabel value="temporary break" control={<Radio />} label="Tạm nghỉ" />
                                <FormControlLabel value="took a break" control={<Radio />} label="Đã nghỉ" />
                            </RadioGroup>
                        </Form.Item>
                        <Form.Item className='employeesPositionEdit'>
                            <h4>Chức vụ</h4>
                            <Form.Item className="positionCheckEdit">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Nhân viên" />
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Quản lý" />
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Form>
                <Form.Item className="employeesBtnEdit">
                    <Button variant="contained">Lưu</Button>
                    <Button variant="contained">Hủy</Button>
                </Form.Item>
            </Form>
        </Form>   

    </>)
}
export default Employees;
