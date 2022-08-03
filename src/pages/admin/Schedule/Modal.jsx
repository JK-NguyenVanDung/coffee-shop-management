import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, Form, Popconfirm, Upload, message, Tooltip } from "antd";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { GIRD12 } from "../../../helper/constant";

import { TextField, FormControl } from "@mui/material/";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { IconButton, Typography } from "@mui/material";
import * as collections from "../../../api/Collections/employees";
import * as employeesCollections from "../../../api/Collections/employees";
import Checkbox from "@mui/material/Checkbox";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { colors } from "../../../helper/Color";
import { errorText } from "../../../helper/Text";
import ImgCrop from "antd-img-crop";

import NumberInput from "../../../components/FormElements/NumberInput";
import moment from "moment";

import AlertModal from "../../../components/FormElements/AlertModal";
import AlertDialog from "../../../components/AlertDialog";

import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";

import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { CustomDay } from "./CustonDatePicker";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const ModalContent = () => {
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.schedule.detail);
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);
  const currentEmployee = useAppSelector(
    (state) => state.schedule.currentEmployee
  );
  const [disablePass, setDisablePass] = useState(true);
  const openDialog = useAppSelector((state) => state.form.delete);

  const employeeList = useAppSelector((state) => state.employees.listAll);

  const date = useAppSelector((state) => state.schedule.currentDate);

  const [select, setSelect] = useState("");

  const dataList = useAppSelector((state) => state.schedule.listAll);
  const [showList, setShowList] = useState(false);

  const [search, setSearch] = useState("");

  const [postList, setPostList] = useState({ page: 1, per_page: 10 });
  const checkOnload = useAppSelector((state) => state.form.loadData);

  const [data, setData] = useState([]);

  const test = new Date();

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOpen = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeForm());

  const deleteItem = () => {
    dispatch(actions.formActions.showDelete());
  };
  const editItem = () => dispatch(actions.formActions.setDetail(false));

  const handleOk = async () => {};

  const start = startOfWeek(date ? Date.parse(date) : new Date(), {
    weekStartsOn: 1,
  });

  const getDetail = (item) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(true));
    dispatch(actions.scheduleActions.setDetail(item.id));
  };

  const getName = (id) => {
    for (let i = 0; i < employeeList.length; i++) {
      if (employeeList[i]._id === id) {
        return employeeList[i].full_name;
      }
    }
  };
  const getBackground = (item) => {
    if (item === "Ca sáng") {
      return colors.success;
    } else if (item === "Ca chiều") {
      return colors.warning;
    }
    return colors.error;
  };
  const getDateTitle = (date) => {
    return (
      <div>
        <p>{date !== 8 ? `Thứ ${date}` : "Chủ nhật"},</p>
        <p>{format(addDays(start, date - 2), "dd/MM/yyyy")}</p>
      </div>
    );
  };
  function getHeaderTitle() {
    if (dataItem && isDetail) {
      return "Thông tin nhân viên";
    }
    if (dataItem) {
      return "Sửa nhân viên";
    }
    return "Thêm nhân viên";
  }
  const handleDelete = async () => {
    setLoading(true);
    await collections.removeEmployee(dataItem._id);
    message.success("Xoá thành công");
    setLoading(false);
    dispatch(actions.formActions.hideDelete());
    dispatch(actions.formActions.closeForm());
    dispatch(actions.formActions.changeLoad(!loadData));
  };

  const checkedDate = (items) => {
    let checked = false;
    for (let i = 0; i < items.length; i++) {}
  };
  const handleCheckbox = (item) => {};
  const handleEmptyCheckbox = () => {};

  const columns = [
    {
      title: "Ca làm",
      dataIndex: "shift",
      width: GIRD12.COL1,
      render: (item) => {
        return {
          props: {
            style: {
              background: getBackground(item),
            },
          },
          children: <div className="shiftCont"> {item} </div>,
        };
      },
    },
    {
      title: getDateTitle(2),
      dataIndex: "monday",
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={handleCheckbox(item)}
              checked={checkedDate(item)}
            />
          </div>
        ) : (
          <div>
            <Checkbox disabled={isDetail} onChange={handleEmptyCheckbox()} />
          </div>
        );
      },
    },
    {
      title: getDateTitle(3),
      dataIndex: "tuesday",
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={handleCheckbox(item)}
              checked={checkedDate(item)}
            />
          </div>
        ) : (
          <div>
            <Checkbox disabled={isDetail} onChange={handleEmptyCheckbox()} />
          </div>
        );
      },
    },
    {
      title: getDateTitle(4),
      dataIndex: "wednesday",
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={handleCheckbox(item)}
              checked={checkedDate(item)}
            />
          </div>
        ) : (
          <div>
            <Checkbox disabled={isDetail} onChange={handleEmptyCheckbox()} />
          </div>
        );
      },
    },
    {
      title: getDateTitle(5),
      dataIndex: "thursday",
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={handleCheckbox(item)}
              checked={checkedDate(item)}
            />
          </div>
        ) : (
          <div>
            <Checkbox disabled={isDetail} onChange={handleEmptyCheckbox()} />
          </div>
        );
      },
    },
    {
      title: getDateTitle(6),
      dataIndex: "friday",
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={handleCheckbox(item)}
              checked={checkedDate(item)}
            />
          </div>
        ) : (
          <div>
            <Checkbox disabled={isDetail} onChange={handleEmptyCheckbox()} />
          </div>
        );
      },
    },
    {
      title: getDateTitle(7),
      dataIndex: "saturday",
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={handleCheckbox(item)}
              checked={checkedDate(item)}
            />
          </div>
        ) : (
          <div>
            <Checkbox disabled={isDetail} onChange={handleEmptyCheckbox()} />
          </div>
        );
      },
    },
    {
      title: getDateTitle(8),
      dataIndex: "sunday",
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={handleCheckbox(item)}
              checked={checkedDate(item)}
            />
          </div>
        ) : (
          <div>
            <Checkbox disabled={isDetail} onChange={handleEmptyCheckbox()} />
          </div>
        );
      },
    },
  ];
  const fetchData = async (value) => {
    try {
      setLoading(true);
      // const response = await collections.getSchedules();
      const employees = await employeesCollections.getEmployees();
      dispatch(actions.employeesActions.setListAll(employees));

      const response = [
        {
          _id: "sadsadsadsad",

          shifts: [
            {
              _id: "1",
              shift: "Ca sáng",
              monday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
                "62d68b7a83d7ce588288fb16",
              ],

              tuesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              wednesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              thursday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              friday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              saturday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              sunday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],
            },
            {
              _id: "2",
              shift: "Ca chiều",
              monday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              tuesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              wednesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              thursday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              friday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              saturday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              sunday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],
            },
            {
              _id: "3",

              shift: "Ca tối",
              monday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              tuesday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              wednesday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              thursday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              friday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              saturday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              sunday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],
            },
          ],
          startDay: "8/15/2022",
          endDay: "8/21/2022",
          createdAt: "2022-07-22T03:17:22.831Z",
          updatedAt: "2022-07-22T03:17:22.831Z",
        },
        {
          _id: "2222",

          shifts: [
            {
              _id: "1",
              shift: "Ca sáng",
              monday: ["62d4272c4ff9d853e14b2f85"],

              tuesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              wednesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              thursday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              friday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              saturday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              sunday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],
            },
            {
              _id: "2",
              shift: "Ca chiều",
              monday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              tuesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              wednesday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              thursday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              friday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              saturday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],

              sunday: [
                "62d4272c4ff9d853e14b2f85",
                "62d439a84ff9d853e14b2faf",
                "62d68b7a83d7ce588288fb14",
              ],
            },
            {
              _id: "3",

              shift: "Ca tối",
              monday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              tuesday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              wednesday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              thursday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              friday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              saturday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],

              sunday: [
                "62d4272c4ff9d853e14b2f85",
                "2",
                "62d68b7a83d7ce588288fb14",
              ],
            },
          ],
          startDay: "8/1/2022",
          endDay: "8/7/2022",
          createdAt: "2022-07-22T03:17:22.831Z",
          updatedAt: "2022-07-22T03:17:22.831Z",
        },
      ];
      dispatch(actions.scheduleActions.setListAll(response));
      setShowList(true);
      setLoading(false);
      // setPagination({
      //   totalDocs: response.metadata.count,
      // });
    } catch (error) {
      //history.replace("/");
    }
  };

  function setSelectedEmployee(e) {
    setSelect(e.target.value);
  }

  useEffect(() => {
    fetchData(postList);
    dispatch(actions.scheduleActions.setCurrent(test.toUTCString()));
    console.log(date);
  }, []);

  useEffect(() => {
    let currentIndex = 0;

    const tempDate = date ? date : new Date();

    const start = startOfWeek(Date.parse(tempDate), {
      weekStartsOn: 1,
    });
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].startDay === start.toLocaleDateString()) {
        currentIndex = i;
        console.log(i);

        break;
      } else {
        console.log(start);
      }
    }
    setData(
      showList
        ? dataList[currentIndex].shifts.map((item, index) => {
            return {
              shift: item.shift,
              monday: item.monday,

              tuesday: item.tuesday,

              wednesday: item.wednesday,

              thursday: item.thursday,

              friday: item.friday,

              saturday: item.saturday,

              sunday: item.sunday,
            };
          })
        : []
    );
  }, [showList, checkOnload, dataList, date]);

  return (
    <div className="ModalEmployeeCont">
      {modalError && <AlertModal chilren={errorText.formValidation} />}
      <div className="headerCont">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose} style={{ marginBottom: 10 }}>
          <CloseOutlined />
        </IconButton>
      </div>{" "}
      <div className="toolBarCont">
        {isDetail ? (
          <>
            <h3 className="title">
              Xếp lịch cho nhân viên: {dataItem.full_name}
            </h3>
          </>
        ) : (
          <>
            <h3 className="title"> Xếp lịch cho nhân viên:</h3>
            <div style={{ width: "30%", marginRight: "5%" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Chọn nhân viên
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={select}
                  label="Chọn nhân viên"
                  onChange={(e) => setSelectedEmployee(e)}
                >
                  {employeeList.map((e) => {
                    return (
                      <MenuItem key={e._id} value={e._id}>
                        {e.full_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ width: "30%" }}>
              <CustomDay />
            </div>
          </>
        )}
      </div>
      <Table
        loading={loading}
        columns={columns}
        bordered
        dataSource={data}
        pagination={false}
      />
      <div className="BtnAdd">
        <Button
          size="small"
          color={dataItem ? "primary" : "success"}
          variant="contained"
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            paddingTop: "1%",
            paddingBottom: "1%",
            color: "#fff",
          }}
          disabled={loading}
          onClick={isDetail === true ? editItem : handleOk}
        >
          Lưu
        </Button>
        <Button
          disabled={loading}
          size="small"
          color="error"
          variant="contained"
          style={{
            paddingLeft: "10%",
            paddingRight: "10%",
            paddingTop: "1%",
            paddingBottom: "1%",
            color: "#fff",
          }}
          onClick={dataItem && isDetail === true ? deleteItem : handleClose}
        >
          {dataItem && isDetail === true ? "Xoá " : "Hủy"}
        </Button>
      </div>
      <AlertDialog
        children={`Xác nhận xoá ${dataItem ? dataItem.full_name : null} ?`}
        title="Xoá nhân viên"
        onAccept={handleDelete}
      />
    </div>
  );
};
export default ModalContent;
