import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import { CloseOutlined } from "@ant-design/icons";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { menuText } from "../../../helper/Text";
import TextField from "@mui/material/TextField";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormModal from "../../../components/FormElements/FormModal";
import { IconButton } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
const { Search } = Input;

const columns = [
  {
    title: "ID nhân viên",
    dataIndex: "id_card",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Họ tên",
    dataIndex: "full_name",
  },
  {
    title: "Thông tin liên lạc",
    dataIndex: "address",
    // dataIndex: 'sdt',
    // dataIndex: 'avatar',
    // dataIndex: 'age',
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Password",
    dataIndex: "password",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
  },
  {
    title: "Chức vụ",
    dataIndex: "position",
  },
  {
    title: "Hoạt động",
    render: () => {
      return (
        <>
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            style={{ marginRight: "7%" }}
            size="small"
          >
            Sửa
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteSweepIcon />}
            size="small"
          >
            Xóa
          </Button>
        </>
      );
    },
  },
];
const data = [
  {
    key: "1",
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
    key: "2",
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
    key: "3",
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
    key: "4",
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
    key: "5",
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
    key: "6",
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
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
const ModalContent = () => {
  const [value, setValue] = React.useState("still break" & null);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOpen = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeForm());
  const handleOk = () => {};
  function getHeaderTitle() {
    return "Thêm nhân viên";
  }
  const labels = {
    picture: "Hình Ảnh",
  };
  return (
    <div class="ModalCont">
      <div class="headerCont">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <Form form={form}>
        <div class="bodyCont">
          <div>
            <Form.Item>
              <div>
                <h4>{labels.picture}</h4>
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" hidden />
                </Button>
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <h4>Họ tên</h4>
                <Input placeholder="Nhập họ tên" />
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <h4>Ngày sinh</h4>
                {/* <DatePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
              </div>
            </Form.Item>
            <Form.Item
              name="id_card"
              rules={[
                {
                  required: true,
                  message: `Không được để trống CMND/CCCD`,
                },
              ]}
            >
              <div>
                <h4>CMND/CCCD</h4>
                <Input placeholder="Nhập CMND" />
              </div>
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              <div>
                <h4>Email</h4>
                <Input placeholder="Nhập email" />
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <h4>SĐT</h4>
                <Input placeholder="Nhập số điện thoại" />
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <h4>Mật khẩu</h4>
                <Input.Password placeholder="Nhập mật khẩu" />
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <h4>Địa chỉ</h4>
                <Input placeholder="Nhập địa chỉ (không bắt buộc)" />
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <h4>Tình trạng</h4>
                <RadioGroup row value={value} onChange={handleChange}>
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Còn làm"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Tạm nghỉ"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Đã nghỉ"
                  />
                </RadioGroup>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="PositionAdd">
                <h4>Chức vụ</h4>
                <Form.Item>
                  <div className="positionCheckAdd">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Nhân viên"
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Quản lý"
                    />
                  </div>
                </Form.Item>
              </div>
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <div className="BtnAdd">
            <Button variant="contained">Lưu</Button>
            <Button variant="contained">Hủy</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

const Employees = () => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [value, setValue] = React.useState("still break" & null);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dispatch = useAppDispatch();

  const handleOpen = () => dispatch(actions.formActions.showForm());

  return (
    <>
      <div className="dishSearchCont">
        <Button
          variant="contained"
          endIcon={<ConstructionIcon />}
          style={{ marginRight: "1%" }}
          size="small"
        >
          QUẢN LÝ
        </Button>

        <Button
          onClick={handleOpen}
          variant="contained"
          endIcon={<AddIcon />}
          style={{ marginRight: "1%" }}
          size="small"
        >
          THÊM NHÂN VIÊN
        </Button>
        <FormModal children={<ModalContent />} />

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
    </>
  );
};
export default Employees;
{
  /* Thông tin nhân viên */
}
{
  /*  <Form class="Info">
  <Form className="totalContentInfo">
    <Form.Item class="TitleInfo">
      <h2>Thông tin nhân viên</h2>
      <CloseOutlined />
    </Form.Item>
    <Form class="ContInfo">
      <Form className="InfoL">
        <Form.Item className="AvatarInfo">
          <h4>Hình ảnh</h4>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </Form.Item>
        <Form.Item className="NameInfo">
          <h4>Họ tên</h4>
          <Input />
        </Form.Item>
        <Form.Item className="BirthdayInfo">
          <h4>Ngày sinh</h4>
          <Input />
        </Form.Item>
        <Form.Item className="identityCardInfo">
          <h4>CMND/CCCD</h4>
          <Input />
        </Form.Item>
      </Form>
      <Form className="InfoR">
        <Form.Item className="IDInfo">
          <h4>ID nhân viên</h4>
          <Input />
        </Form.Item>
        <Form.Item className="EmailInfo">
          <h4>Email</h4>
          <Input />
        </Form.Item>
        <Form.Item className="PhoneInfo">
          <h4>SĐT</h4>
          <Input />
        </Form.Item>
        <Form.Item className="PassInfo">
          <h4>Mật khẩu</h4>
          <Input.Password />
        </Form.Item>
        <Form.Item className="AddressInfo">
          <h4>Địa chỉ</h4>
          <Input />
        </Form.Item>
        <Form.Item className="StatusInfo">
          <h4>Tình trạng</h4>
          <RadioGroup row value={value} onChange={handleChange}>
            <FormControlLabel
              value="still break"
              control={<Radio />}
              label="Còn làm"
            />
            <FormControlLabel
              value="temporary break"
              control={<Radio />}
              label="Tạm nghỉ"
            />
            <FormControlLabel
              value="took a break"
              control={<Radio />}
              label="Đã nghỉ"
            />
          </RadioGroup>
        </Form.Item>
        <Form.Item className="PositionInfo">
          <h4>Chức vụ</h4>
          <Form.Item className="positionCheckInfo">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Nhân viên"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Quản lý"
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </Form>
    <Form.Item className="BtnInfo">
      <Button variant="contained">Sửa</Button>
      <Button variant="contained">Xóa</Button>
    </Form.Item>
  </Form>
</Form>*/
}

{
  /* Sửa thông tin nhân viên */
}

{
  /* <Form class="Edit">
<div className="totalContentEdit">
  <Form.Item class="TitleEdit">
    <h2>Sửa thông tin nhân viên</h2>
    <CloseOutlined />
  </Form.Item>
  <div class="ContEdit">
    <div className="EditL">
      <Form.Item className="AvatarEdit">
        <h4>Hình ảnh</h4>
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden />
        </Button>
      </Form.Item>
      <Form.Item className="NameEdit">
        <h4>Họ tên</h4>
        <Input />
      </Form.Item>
      <Form.Item className="BirthdayEdit">
        <h4>Ngày sinh</h4>
        <Input />
      </Form.Item>
      <Form.Item className="identityCardEdit">
        <h4>CMND/CCCD</h4>
        <Input />
      </Form.Item>
    </div>
    <div className="EditR">
      <Form.Item className="IDEdit">
        <h4>ID nhân viên</h4>
        <Input />
      </Form.Item>
      <Form.Item className="EmailEdit">
        <h4>Email</h4>
        <Input />
      </Form.Item>
      <Form.Item className="PhoneEdit">
        <h4>SĐT</h4>
        <Input />
      </Form.Item>
      <Form.Item className="PassEdit">
        <h4>Mật khẩu</h4>
        <Input.Password />
      </Form.Item>
      <Form.Item className="AddressEdit">
        <h4>Địa chỉ</h4>
        <Input />
      </Form.Item>
      <Form.Item className="StatusEdit">
        <h4>Tình trạng</h4>
        <RadioGroup row value={value} onChange={handleChange}>
          <FormControlLabel
            value="still break"
            control={<Radio />}
            label="Còn làm"
          />
          <FormControlLabel
            value="temporary break"
            control={<Radio />}
            label="Tạm nghỉ"
          />
          <FormControlLabel
            value="took a break"
            control={<Radio />}
            label="Đã nghỉ"
          />
        </RadioGroup>
      </Form.Item>
      <Form.Item className="PositionEdit">
        <h4>Chức vụ</h4>
        <Form.Item className="positionCheckEdit">
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Nhân viên"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Quản lý"
          />
        </Form.Item>
      </Form.Item>
    </div>
  </div>
  <Form.Item className="BtnEdit">
    <Button variant="contained">Lưu</Button>
    <Button variant="contained">Hủy</Button>
  </Form.Item>
</div>
</Form> */
}
