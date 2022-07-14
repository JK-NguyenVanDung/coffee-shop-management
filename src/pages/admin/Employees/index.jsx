import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, Form, Popconfirm } from "antd";
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

const { Search } = Input;

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
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.employees.detail);
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOpen = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeForm());

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        if (dataItem) {
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
    picture: "Hình ảnh",
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
      <Form form={form} className="form">
        <div className="bodyCont">
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
            <Form.Item
              name="age"
              rules={[
                {
                  required: true,
                  message: `Không được để trống ngày sinh`,
                },
              ]}
            >
              <div>
                <h4>Ngày sinh</h4>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="MM/dd/yyyy"
                    value={value}
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
              name="sdt"
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
            <Form.Item
              name="status"
              rules={[
                {
                  required: true,
                  message: `Không được để trống tình trạng`,
                },
              ]}
            >
              <div>
                <h4>{labels.status}</h4>
                <RadioGroup row value={value} onChange={handleChange}>
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
    async function getData() {
      const response = await collections();
    }
  }, []);
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
              onConfirm={() => handleDelete(item, item.stt)}
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
  const data = showList
    ? dataList.map((item, index) => {
        return {
          id: item._id,
          key: index + 1,
          stt: index + 1,
          // active: item, // placeholder, still waiting for API
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
  async function handleDelete(item, index) {
    // loading = true;
    // await productService.delete(item.id);
    // dispatch(actions.formActions.changeLoad(!loadData));
    // loading = false;
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
{
  /* Thông tin nhân viên */
}
{
  // <div class="ModalCont">
  //   <div class="headerCont">
  //     <h2>{getHeaderTitle()}</h2>                          // thêm giúp tui title với lại xét cho nó hiện bên trong input tui ko biết
  //     <IconButton onClick={handleClose}>
  //       <CloseOutlined />
  //     </IconButton>
  //   </div>
  //   <Form form={form}>
  //     <div class="bodyCont">
  //       <div>
  //         <Form.Item>
  //           <div>
  //             <h4>{labels.picture}</h4>
  //             <Button variant="contained" component="label">
  //               Upload File
  //               <input type="file" hidden />
  //             </Button>
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="full_name"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống họ tên`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.fullname}</h4>
  //             <Input placeholder="Nhập họ tên" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="age"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống ngày sinh`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.birthday}</h4>
  //             {/* <DatePicker
  //             value={value}
  //             onChange={(newValue) => {
  //               setValue(newValue);
  //             }}
  //             renderInput={(params) => <TextField {...params} />}
  //           /> */}
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="id_card"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống CMND/CCCD`,
  //             },
  //           ]}
  //         >
  //           <div>
  //             <h4>{labels.idcard}</h4>
  //             <Input placeholder="Nhập CMND" />
  //           </div>
  //         </Form.Item>
  //       </div>
  //       <div>
  //         <Form.Item
  //           name="email"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống email`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.email}</h4>
  //             <Input placeholder="Nhập email" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="sdt"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống sdt`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.phone}</h4>
  //             <Input placeholder="Nhập số điện thoại" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="password"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống mật khẩu`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.password}</h4>
  //             <Input.Password placeholder="Nhập mật khẩu" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="address"
  //         >
  //           <div>
  //             <h4>{labels.address}</h4>
  //             <Input placeholder="Nhập địa chỉ" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="status"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống tình trạng`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.status}</h4>
  //             <RadioGroup row value={value} onChange={handleChange}>
  //               <div class="still">
  //                 <FormControlLabel
  //                   value="1"
  //                   control={<Radio size="small" />}
  //                   label="Còn làm"
  //                 />
  //               </div>
  //               <div class="temporary">
  //                 <FormControlLabel
  //                   value="2"
  //                   control={<Radio size="small" />}
  //                   label="Tạm nghỉ"
  //                 />
  //               </div>
  //               <div class="vacation">
  //                 <FormControlLabel
  //                   value="3"
  //                   control={<Radio size="small" />}
  //                   label="Đã nghỉ"
  //                 />
  //               </div>
  //             </RadioGroup>
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="position"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống chức vụ`,
  //             },
  //           ]}>
  //           <div className="PositionAdd">
  //             <h4>{labels.position}</h4>
  //             <Form.Item>
  //               <div className="positionCheckAdd">
  //                 <FormControlLabel
  //                   control={<Checkbox defaultChecked />}
  //                   label="Nhân viên"
  //                 />
  //                 <FormControlLabel
  //                   control={<Checkbox defaultChecked />}
  //                   label="Quản lý"
  //                 />
  //               </div>
  //             </Form.Item>
  //           </div>
  //         </Form.Item>
  //       </div>
  //     </div>
  //     <Form.Item>
  //       <div className="BtnAdd">
  //         <Button size="Large" color="primary" variant="contained" style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '2%', paddingBottom: '2%' }}>Sửa</Button>
  //         <Button size="Large" color="error" variant="contained" style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '2%', paddingBottom: '2%' }}>Xóa</Button>
  //       </div>
  //     </Form.Item>
  //   </Form>
  // </div>
}

{
  /* Sửa thông tin nhân viên */
}

{
  // <div class="ModalCont">
  //   <div class="headerCont">
  //     <h2>{getHeaderTitle()}</h2>                          // thêm giúp tui title với lại xét cho nó hiện bên trong input tui ko biết
  //     <IconButton onClick={handleClose}>
  //       <CloseOutlined />
  //     </IconButton>
  //   </div>
  //   <Form form={form}>
  //     <div class="bodyCont">
  //       <div>
  //         <Form.Item>
  //           <div>
  //             <h4>{labels.picture}</h4>
  //             <Button variant="contained" component="label">
  //               Upload File
  //               <input type="file" hidden />
  //             </Button>
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="full_name"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống họ tên`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.fullname}</h4>
  //             <Input placeholder="Nhập họ tên" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="age"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống ngày sinh`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.birthday}</h4>
  //             {/* <DatePicker
  //             value={value}
  //             onChange={(newValue) => {
  //               setValue(newValue);
  //             }}
  //             renderInput={(params) => <TextField {...params} />}
  //           /> */}
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="id_card"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống CMND/CCCD`,
  //             },
  //           ]}
  //         >
  //           <div>
  //             <h4>{labels.idcard}</h4>
  //             <Input placeholder="Nhập CMND" />
  //           </div>
  //         </Form.Item>
  //       </div>
  //       <div>
  //         <Form.Item
  //           name="email"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống email`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.email}</h4>
  //             <Input placeholder="Nhập email" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="sdt"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống sdt`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.phone}</h4>
  //             <Input placeholder="Nhập số điện thoại" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="password"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống mật khẩu`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.password}</h4>
  //             <Input.Password placeholder="Nhập mật khẩu" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="address"
  //         >
  //           <div>
  //             <h4>{labels.address}</h4>
  //             <Input placeholder="Nhập địa chỉ" />
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="status"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống tình trạng`,
  //             },
  //           ]}>
  //           <div>
  //             <h4>{labels.status}</h4>
  //             <RadioGroup row value={value} onChange={handleChange}>
  //               <div class="still">
  //                 <FormControlLabel
  //                   value="1"
  //                   control={<Radio size="small" />}
  //                   label="Còn làm"
  //                 />
  //               </div>
  //               <div class="temporary">
  //                 <FormControlLabel
  //                   value="2"
  //                   control={<Radio size="small" />}
  //                   label="Tạm nghỉ"
  //                 />
  //               </div>
  //               <div class="vacation">
  //                 <FormControlLabel
  //                   value="3"
  //                   control={<Radio size="small" />}
  //                   label="Đã nghỉ"
  //                 />
  //               </div>
  //             </RadioGroup>
  //           </div>
  //         </Form.Item>
  //         <Form.Item
  //           name="position"
  //           rules={[
  //             {
  //               required: true,
  //               message: `Không được để trống chức vụ`,
  //             },
  //           ]}>
  //           <div className="PositionAdd">
  //             <h4>{labels.position}</h4>
  //             <Form.Item>
  //               <div className="positionCheckAdd">
  //                 <FormControlLabel
  //                   control={<Checkbox defaultChecked />}
  //                   label="Nhân viên"
  //                 />
  //                 <FormControlLabel
  //                   control={<Checkbox defaultChecked />}
  //                   label="Quản lý"
  //                 />
  //               </div>
  //             </Form.Item>
  //           </div>
  //         </Form.Item>
  //       </div>
  //     </div>
  //     <Form.Item>
  //       <div className="BtnAdd">
  //         <Button size="Large" color="primary" variant="contained" style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '2%', paddingBottom: '2%' }}>Lưu</Button>
  //         <Button size="Large" color="error" variant="contained" style={{ paddingLeft: '15%', paddingRight: '15%', paddingTop: '2%', paddingBottom: '2%' }}>Hủy</Button>
  //       </div>
  //     </Form.Item>
  //   </Form>
  // </div>
}
