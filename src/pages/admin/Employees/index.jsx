import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, Form, Popconfirm, Upload, message } from "antd";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import FormModal from "../../../components/FormElements/FormModal";
import { IconButton } from "@mui/material";
import * as collections from "../../../api/Collections/employees";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import SearchTable from "../../../components/Table/SearchTable";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const { Search } = Input;

const data = [
  {
    id_card: "0123456789",
    full_name: "Trần Văn A",
    email: "spottran2001@gmail.com",
    phone_number: "0567656521",
    address: "123 Trần Phú",
    date_of_birth: 25,
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
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.employees.detail);
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [role, setRole] = React.useState("");

  const handleChange = (newValue) => {
    setDate(newValue);
  };
  const handleRole = (newValue) => {
    setRole(newValue);
  };
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOpen = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeForm());

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        setLoading(true);
        const temp = [];
        if (dataItem) {
        } else {
          await collections.addEmployee({
            email: values.email,
            phone_number: values.phone_number,
            password: values.password,
            address: values.address,
            account_status: 1,
            role: 1,
            full_name: values.full_name,
            id_card: values.id_card,
            date_of_birth:
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear(),
            avatar: "a",
          });
          handleClose();
          setLoading(false);
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setLoading(false);
      });
  };
  function getHeaderTitle() {
    return "Thêm nhân viên";
  }
  const labels = {
    avatar: "Hình ảnh",
    fullname: "Họ tên",
    birthday: "Ngày sinh",
    idcard: "CMND/CCCD",
    email: "Email",
    phone: "SĐT",
    password: "Mật khẩu",
    address: "Địa chỉ",
    status: "Tình trạng",
    position: "Chức vụ",
  };
  return (
    <div className="ModalCont">
      <div className="headerCont">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <Form form={form} className="form" initialValues={{ modifier: "public" }}>
        <div className="bodyCont">
          <div>
            <Form.Item name="avatar">
              <div>
                {/* <h4>{labels.avatar}</h4>
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" hidden />
                </Button> */}
                <Input placeholder="test" />
              </div>
            </Form.Item>
            <Form.Item
              name="full_name"
              rules={[
                {
                  required: true,
                  message: `Không được để trống họ tên`,
                },
              ]}
            >
              <div>
                <h4>{labels.fullname}</h4>
                <Input placeholder="Nhập họ tên" />
              </div>
            </Form.Item>
            <Form.Item name="date_of_birth">
              <div>
                <h4>Ngày sinh</h4>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        variant="standard"
                        InputLabelProps={{ shrink: false }}
                      />
                    )}
                  />
                </LocalizationProvider>
                <Input placeholder="test" />
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
                <h4>{labels.idcard}</h4>
                <Input placeholder="Nhập CMND" />
              </div>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: `Không được để trống email`,
                },
              ]}
            >
              <div>
                <h4>{labels.email}</h4>
                <Input placeholder="Nhập email" />
              </div>
            </Form.Item>
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: `Không được để trống sdt`,
                },
              ]}
            >
              <div>
                <h4>{labels.phone}</h4>
                <Input placeholder="Nhập số điện thoại" />
              </div>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: `Không được để trống mật khẩu`,
                },
              ]}
            >
              <div>
                <h4>{labels.password}</h4>
                <Input.Password placeholder="Nhập mật khẩu" />
              </div>
            </Form.Item>
            <Form.Item name="address">
              <div>
                <h4>{labels.address}</h4>
                <Input placeholder="Nhập địa chỉ" />
              </div>
            </Form.Item>
            <Form.Item name="status">
              <div>
                <h4>{labels.status}</h4>
                <RadioGroup row value={role} onChange={handleRole}>
                  <div class="still">
                    <FormControlLabel
                      value="1"
                      control={<Radio size="small" />}
                      label="Còn làm"
                    />
                  </div>
                  <div class="temporary">
                    <FormControlLabel
                      value="2"
                      control={<Radio size="small" />} // radio này có khi nó lỗi chú chỉnh width lại giúp tui vs nha
                      label="Tạm nghỉ"
                    />
                  </div>
                  <div class="vacation">
                    <FormControlLabel
                      value="3"
                      control={<Radio size="small" />}
                      label="Đã nghỉ"
                    />
                  </div>
                </RadioGroup>
              </div>
            </Form.Item>
            <Form.Item
              name="position"
              rules={[
                {
                  required: true,
                  message: `Không được để trống chức vụ`,
                },
              ]}
            >
              <div className="PositionAdd">
                <h4>{labels.position}</h4>
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
        <div className="BtnAdd">
          <Button
            size="Large"
            color="primary"
            variant="contained"
            style={{
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            onClick={handleOk}
          >
            Lưu
          </Button>
          <Button
            size="Large"
            color="primary"
            variant="contained"
            style={{
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
          >
            Hủy
          </Button>
        </div>
      </Form>
    </div>
  );
};

const Employees = () => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState({});
  const [showList, setShowList] = useState(false);

  const [selectionType, setSelectionType] = useState("checkbox");
  const [value, setValue] = React.useState("still break" & null);

  const [postList, setPostList] = useState({ page: 1, per_page: 10 });
  const checkOnload = useAppSelector((state) => state.employees.loadData);

  const loadData = useAppSelector((state) => state.form.loadData);

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
      dataIndex: "account_status",
      render: (item) => {
        let status = " ";
        switch (item.account_status) {
          case 1:
            status = "Còn làm";
            break;
          case 2:
            status = "Tạm nghỉ";
            break;
          case 3:
            status = "Đã nghỉ";
            break;
          default:
            status = "Còn làm";
            break;
        }

        return (
          <>
            <p>{status}</p>
          </>
        );
      },
    },
    {
      title: "Chức vụ",
      dataIndex: "role",
      render: (item) => {
        let role = " ";
        switch (item.role) {
          case 1:
            role = "Nhân viên";
            break;
          case 2:
            role = "Quản lý";
            break;

          default:
            role = "Nhân viên";
            break;
        }

        return (
          <>
            <p>{role}</p>
          </>
        );
      },
    },
    {
      title: "Hoạt động",
      render: (item) => {
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
            <Popconfirm
              title={`Bạn có muốn xoá ${item.name}`}
              onConfirm={() => handleDelete(item)}
              onCancel={cancel}
              okText="Có"
              cancelText="Không"
              placement="left"
            >
              <Button
                variant="contained"
                endIcon={<DeleteSweepIcon />}
                size="small"
              >
                Xóa
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const fetchData = async (value) => {
    try {
      setLoading(true);
      const response = await collections.getEmployees();
      dispatch(actions.employeesActions.setListAll(response));
      setDataList(response);
      setShowList(true);
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
    fetchData(postList);
  }, [checkOnload]);

  useEffect(() => {
    fetchData(postList);
  }, []);

  const data = showList
    ? dataList.map((item, index) => {
        return {
          _id: item._id,
          email: item.email,
          phone_number: item.phone_number,
          password: item.password,
          address: item.address,
          account_status: item.account_status,
          role: item.role,
          full_name: item.full_name,
          id_card: item.id_card,
          date_of_birth: item.date_of_birth,
          avatar: item.avatar,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      })
    : [];
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(actions.employeesActions.setDetail(null));
    dispatch(actions.formActions.showForm());
  };
  async function handleDelete(item) {
    loading = true;
    await collections.removeEmployee(item._id);
    dispatch(actions.formActions.changeLoad(!loadData));
    loading = false;
  }
  function cancel(e) {
    // message.error('Click on No');
  }

  const onSearch = (value) => console.log(value);
  const onChangeSearch = async (value) => {
    // await setSearch(value);
    // pagination.name = value;
  };

  return (
    <>
      <div className="dishSearchCont">
        <Button
          variant="contained"
          endIcon={<ConstructionIcon />}
          style={{ marginRight: "1%", backgroundColor: "#111", color: "#fff" }}
          size="small"
        >
          QUẢN LÝ
        </Button>

        <Button
          onClick={handleOpen}
          variant="contained"
          endIcon={<AddIcon />}
          style={{
            marginRight: "1%",
            backgroundColor: "#4BB984",
            color: "#fff",
          }}
          size="small"
        >
          THÊM NHÂN VIÊN
        </Button>
        <FormModal children={<ModalContent />} />

        <div className="dishSearch">
          <SearchTable
            placeholder={menuText.searchEmployees}
            allowClear
            size="default"
            onChange={(e) => onChangeSearch(e.target.value)}
            onSearch={onSearch}
            enterButton
          />
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
