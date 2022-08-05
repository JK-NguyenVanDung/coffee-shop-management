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
import * as collections from "../../../api/Collections/schedule";
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
  const newWeekSchedule = useAppSelector(
    (state) => state.schedule.newWeekSchedule
  );

  const [disablePass, setDisablePass] = useState(true);
  const openDialog = useAppSelector((state) => state.form.delete);

  const employeeList = useAppSelector((state) => state.schedule.listEmployees);

  const date = useAppSelector((state) => state.schedule.modalCurrentDate);

  const begin_at = useAppSelector((state) => state.schedule.modalFirtWeekday);
  const end_at = useAppSelector((state) => state.schedule.modalLastWeekday);

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

  let defaultValue = {
    _id: "",
    status: false,
    shifts: [
      {
        _id: 0,
        shift: "Ca sáng",
        days: [[], [], [], [], [], [], []],
      },
      {
        _id: 1,
        shift: "Ca chiều",
        days: [[], [], [], [], [], [], []],
      },
      {
        _id: 2,
        shift: "Ca tối",
        days: [[], [], [], [], [], [], []],
      },
    ],
    begin_at: "",
    end_at: "",
  };
  const editItem = () => dispatch(actions.formActions.setDetail(false));

  const handleOk = async () => {
    setLoading(true);
    const obj = {
      morning: newWeekSchedule.shifts[0],
      afternoon: newWeekSchedule.shifts[1],
      night: newWeekSchedule.shifts[2],
      begin_at: begin_at,
      end_at: end_at,
      status: false,
    };

    // console.log(obj);
    let duplicated = false;

    if (newWeekSchedule._id === "") {
      const response = await collections.addSchedule(obj);
      if (response) {
        await collections.editSchedule({ _id: response._id, body: obj });
      }
    } else {
      await collections.editSchedule({ _id: newWeekSchedule._id, body: obj });
    }
    handleClose();
    dispatch(actions.formActions.changeLoad(!loadData));
    message.success("Thêm thành công");

    setLoading(false);
  };

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
    // await collections.removeEmployee(dataItem._id);
    message.success("Xoá thành công");
    setLoading(false);
    dispatch(actions.formActions.hideDelete());
    dispatch(actions.formActions.closeForm());
    dispatch(actions.formActions.changeLoad(!loadData));
  };

  const checkedDate = (item, day) => {
    if (select) {
      if (newWeekSchedule.shifts.length === 3) {
        let clone = JSON.parse(JSON.stringify(newWeekSchedule));

        let cur = clone.shifts[item.id].days[day];
        if (cur.length > 0) {
          for (let i = 0; i < cur.length; i++) {
            if (cur[i] === select) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const handleCheckbox = (e, item, day) => {
    let clone = JSON.parse(JSON.stringify(newWeekSchedule));

    if (e.target.checked === true) {
      clone.shifts[item.id].days[day].push(select);
    } else {
      let index = clone.shifts[item.id].days[day].indexOf(select);
      if (index > -1) {
        clone.shifts[item.id].days[day].splice(index, 1);
      }
    }
    dispatch(actions.scheduleActions.setNewWeekSchedule(clone));
  };
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
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={(e) => handleCheckbox(e, item, 0)}
              checked={checkedDate(item, 0)}
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
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={(e) => handleCheckbox(e, item, 1)}
              checked={checkedDate(item, 1)}
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
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={(e) => handleCheckbox(e, item, 2)}
              checked={checkedDate(item, 2)}
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
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={(e) => handleCheckbox(e, item, 3)}
              checked={checkedDate(item, 3)}
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
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={(e) => handleCheckbox(e, item, 4)}
              checked={checkedDate(item, 4)}
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
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={(e) => handleCheckbox(e, item, 5)}
              checked={checkedDate(item, 5)}
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
      render: (item) => {
        return item ? (
          <div className="userCont">
            <Checkbox
              disabled={isDetail}
              onChange={(e) => handleCheckbox(e, item, 6)}
              checked={checkedDate(item, 6)}
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
  const fetchData = async () => {
    try {
      setLoading(true);
      // const response = await collections.getSchedules();
      setLoading(true);
      // const response = await collections.getSchedules();
      // const employees = await employeesCollections.getEmployees();
      // dispatch(actions.scheduleActions.setListEmployees(employees));
      // dispatch(actions.scheduleActions.setListAll(response));
      dispatch(actions.scheduleActions.setNewWeekSchedule(defaultValue));
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
    dispatch(actions.formActions.changeLoad(!loadData));

    setSelect(e.target.value);
  }

  useEffect(() => {
    fetchData();
    dispatch(actions.scheduleActions.setModalCurrent(test.toUTCString()));
  }, []);
  // useEffect(() => {
  //   fetchData();
  // }, [loadData]);

  useEffect(() => {
    let currentIndex = 0;

    const tempDate = date ? date : new Date();

    const start = startOfWeek(Date.parse(tempDate), {
      weekStartsOn: 1,
    });

    for (let i = 0; i < dataList.length; i++) {
      let temp = new Date(dataList[i].begin_at).toLocaleDateString();
      if (temp == start.toLocaleDateString()) {
        currentIndex = i;
        break;
      } else {
        currentIndex = -1;
      }
    }
    let existedSchedule = dataList[currentIndex];
    if (currentIndex !== -1) {
      let temp = {
        _id: existedSchedule._id,
        status: existedSchedule.status,
        shifts: [
          {
            _id: 0,
            shift: "Ca sáng",
            days: existedSchedule.morning.days
              ? existedSchedule.morning.days
              : [[], [], [], [], [], [], []],
          },
          {
            _id: 1,
            shift: "Ca chiều",
            days: existedSchedule.afternoon.days
              ? existedSchedule.afternoon.days
              : [[], [], [], [], [], [], []],
          },
          {
            _id: 2,
            shift: "Ca tối",
            days: existedSchedule.night.days
              ? existedSchedule.night.days
              : [[], [], [], [], [], [], []],
          },
        ],
        begin_at: existedSchedule.begin_at,
        end_at: existedSchedule.end_at,
      };
      dispatch(actions.scheduleActions.setNewWeekSchedule(temp));
    } else {
      dispatch(actions.scheduleActions.setNewWeekSchedule(defaultValue));
    }
  }, [checkOnload, dataList, date]);
  useEffect(() => {
    setData(
      showList && newWeekSchedule
        ? newWeekSchedule.shifts.map((item, index) => {
            return {
              id: item._id,
              shift: item.shift,
              monday: item.days[0],

              tuesday: item.days[1],

              wednesday: item.days[2],

              thursday: item.days[3],

              friday: item.days[4],

              saturday: item.days[5],

              sunday: item.days[6],
            };
          })
        : []
    );
  }, [showList, newWeekSchedule]);

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
            <div style={{ width: "30%" }} className="dateCont">
              <CustomDay isModal={true} />
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
