import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import {
  Input,
  Table,
  Form,
  Popconfirm,
  Upload,
  message,
  Tooltip,
  Typography,
} from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";

import { menuText } from "../../../helper/Text";
import AlertDialog from "../../../components/AlertDialog";

import FormModal from "../../../components/FormElements/FormModal";
import * as collections from "../../../api/Collections/schedule";

import * as employeesCollections from "../../../api/Collections/employees";
import { GIRD12 } from "../../../helper/constant";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import SearchTable from "../../../components/Table/SearchTable";
import ModalContent from "./Modal";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { colors } from "../../../helper/Color";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";

import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { CustomDay } from "./CustonDatePicker";

const Schedule = () => {
  const [loading, setLoading] = useState(false);
  const employeeList = useAppSelector((state) => state.schedule.listEmployees);
  const weekDetail = useAppSelector((state) => state.schedule.weekDetail);
  const date = useAppSelector((state) => state.schedule.currentDate);
  const accessRight = useAppSelector((state) => state.auth.accessRight);

  const [select, setSelect] = useState("");

  const dataList = useAppSelector((state) => state.schedule.listAll);
  const [showList, setShowList] = useState(false);

  const [search, setSearch] = useState("");

  const [postList, setPostList] = useState({ page: 1, per_page: 10 });
  const checkOnload = useAppSelector((state) => state.form.loadData);

  const loadData = useAppSelector((state) => state.form.loadData);
  const [data, setData] = useState([]);

  // const emitEmpty = () => {
  //   this.setState({
  //     data: dataList,
  //     search: "",
  //   });
  // };
  const [dialogType, setDialogType] = useState(true);
  const openDialog = (type) => {
    type === "delete" ? setDialogType(true) : setDialogType(false);
    dispatch(actions.formActions.showDelete());
  };
  const deleteSchedule = () => {
    setLoading(true);
    collections.removeSchedule(weekDetail._id);
    dispatch(actions.formActions.changeLoad(!loadData));
    message.success("Xoá thành công");
    dispatch(actions.formActions.hideDelete());

    setLoading(false);
  };
  const start = startOfWeek(date ? Date.parse(date) : new Date(), {
    weekStartsOn: 1,
  });

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
  function logOut(e, f) {
    let test = "62d68b7a83d7ce588288fb14";

    console.log(e);
    console.log(f);
  }
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
        return (
          <div className="userCont">
            {item.map((id) => {
              return (
                <div key={id}>
                  <Button
                    onClick={() => getDetail(id)}
                    size="large"
                    sx={{
                      color: "#111",
                      p: 2,
                      minWidth: "100%",
                    }}
                  >
                    {getName(id)}
                  </Button>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: getDateTitle(3),
      render: (item) => {
        return (
          <div className="userCont">
            {item.tuesday.map((id) => {
              return (
                <div key={id}>
                  <Button
                    onClick={() => getDetail(id)}
                    size="large"
                    sx={{
                      color: "#111",
                      p: 2,
                      minWidth: "100%",
                    }}
                  >
                    {getName(id)}
                  </Button>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: getDateTitle(4),
      dataIndex: "wednesday",
      render: (item) => {
        return (
          <div>
            {item.map((id) => {
              return (
                <div key={id} className="userCont">
                  <Button
                    onClick={() => getDetail(id)}
                    size="large"
                    sx={{
                      color: "#111",
                      p: 2,
                      minWidth: "100%",
                    }}
                  >
                    {getName(id)}
                  </Button>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: getDateTitle(5),
      dataIndex: "thursday",
      render: (item) => {
        return (
          <div>
            {item.map((id) => {
              return (
                <div key={id} className="userCont">
                  <Button
                    onClick={() => getDetail(id)}
                    size="large"
                    sx={{
                      color: "#111",
                      p: 2,
                      minWidth: "100%",
                    }}
                  >
                    {getName(id)}
                  </Button>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: getDateTitle(6),
      dataIndex: "friday",
      render: (item) => {
        return (
          <div>
            {item.map((id) => {
              return (
                <div key={id} className="userCont">
                  <Button
                    onClick={() => getDetail(id)}
                    size="large"
                    sx={{
                      color: "#111",
                      p: 2,
                      minWidth: "100%",
                    }}
                  >
                    {getName(id)}
                  </Button>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: getDateTitle(7),
      dataIndex: "saturday",
      render: (item) => {
        return (
          <div>
            {item.map((id) => {
              return (
                <div key={id} className="userCont">
                  <Button
                    onClick={() => getDetail(id)}
                    size="large"
                    sx={{
                      color: "#111",
                      p: 2,
                      minWidth: "100%",
                    }}
                  >
                    {getName(id)}
                  </Button>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      title: getDateTitle(8),
      dataIndex: "sunday",
      render: (item) => {
        return (
          <div>
            {item.map((id) => {
              return (
                <div key={id} className="userCont">
                  <Button
                    onClick={() => getDetail(id)}
                    size="large"
                    sx={{
                      color: "#111",
                      p: 2,
                      minWidth: "100%",
                    }}
                  >
                    {getName(id)}
                  </Button>
                </div>
              );
            })}
          </div>
        );
      },
    },
  ];
  const fetchData = async (value) => {
    try {
      setLoading(true);
      const response = await collections.getSchedules();
      const employees = await employeesCollections.getEmployees();
      dispatch(actions.scheduleActions.setListEmployees(employees));
      dispatch(actions.scheduleActions.setListAll(response));
      setShowList(true);
      setLoading(false);
    } catch (error) {
      //history.replace("/");
    }
  };

  useEffect(() => {
    // test.current = 2;
    fetchData(postList);
  }, [loadData]);
  const test = new Date();

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
      let temp = new Date(dataList[i].begin_at).toLocaleDateString("vi-VN");
      if (temp == start.toLocaleDateString("vi-VN")) {
        currentIndex = i;
        break;
      } else {
        currentIndex = -1;
      }
    }
    console.log("index" + currentIndex);
    dispatch(actions.scheduleActions.setWeekDetail(dataList[currentIndex]));
    console.log(weekDetail);
  }, [checkOnload, dataList, date]);
  useEffect(() => {
    setData(
      showList && weekDetail
        ? [
            {
              _id: 0,
              shift: "Ca sáng",
              monday: weekDetail.morning.days[0]
                ? weekDetail.morning.days[0]
                : [],
              tuesday: weekDetail.morning.days[1]
                ? weekDetail.morning.days[1]
                : [],

              wednesday: weekDetail.morning.days[2]
                ? weekDetail.morning.days[2]
                : [],

              thursday: weekDetail.morning.days[3]
                ? weekDetail.morning.days[3]
                : [],

              friday: weekDetail.morning.days[4]
                ? weekDetail.morning.days[4]
                : [],

              saturday: weekDetail.morning.days[5]
                ? weekDetail.morning.days[5]
                : [],

              sunday: weekDetail.morning.days[6]
                ? weekDetail.morning.days[6]
                : [],
            },
            {
              _id: 2,
              shift: "Ca chiều",
              monday: weekDetail.afternoon.days[0]
                ? weekDetail.afternoon.days[0]
                : [],
              tuesday: weekDetail.afternoon.days[1]
                ? weekDetail.afternoon.days[1]
                : [],

              wednesday: weekDetail.afternoon.days[2]
                ? weekDetail.afternoon.days[2]
                : [],

              thursday: weekDetail.afternoon.days[3]
                ? weekDetail.afternoon.days[3]
                : [],

              friday: weekDetail.afternoon.days[4]
                ? weekDetail.afternoon.days[4]
                : [],

              saturday: weekDetail.afternoon.days[5]
                ? weekDetail.afternoon.days[5]
                : [],

              sunday: weekDetail.afternoon.days[6]
                ? weekDetail.afternoon.days[6]
                : [],
            },
            {
              _id: 3,
              shift: "Ca tối",
              monday: weekDetail.night.days[0] ? weekDetail.night.days[0] : [],
              tuesday: weekDetail.night.days[1] ? weekDetail.night.days[1] : [],
              wednesday: weekDetail.night.days[2]
                ? weekDetail.night.days[2]
                : [],

              thursday: weekDetail.night.days[3]
                ? weekDetail.night.days[3]
                : [],

              friday: weekDetail.night.days[4] ? weekDetail.night.days[4] : [],

              saturday: weekDetail.night.days[5]
                ? weekDetail.night.days[5]
                : [],

              sunday: weekDetail.night.days[6] ? weekDetail.night.days[6] : [],
            },
          ]
        : []
    );
  }, [showList, weekDetail, loadData]); // checkOnload, dataList, date

  const dispatch = useAppDispatch();
  const getDetail = (id) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(true));
    dispatch(actions.scheduleActions.setDetail(id));
  };

  const handleOpen = () => {
    dispatch(actions.scheduleActions.setDetail(null));
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.formActions.showForm());
  };
  async function handleEdit(item) {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.scheduleActions.setDetail(item.id));
  }
  async function confirmSchedule() {
    setLoading(true);
    await collections.confirmSchedule(weekDetail._id);
    dispatch(actions.formActions.changeLoad(!loadData));
    message.success("Duyệt lịch thành công");
    dispatch(actions.formActions.hideDelete());

    setLoading(false);
  }
  function cancel(e) {
    // message.error('Click on No');
  }

  const onSearch = (value) => console.log(value);

  return (
    <>
      <div className="dishSearchCont">
        <Button
          disabled={!accessRight}
          onClick={handleOpen}
          variant="contained"
          endIcon={<AddIcon />}
          color="success"
          style={{
            marginRight: "1%",
            color: "#fff",
          }}
          size="small"
        >
          XẾP LỊCH NHÂN VIÊN
        </Button>
        <Button
          disabled={!weekDetail || weekDetail.status || !accessRight}
          color="primary"
          variant="contained"
          endIcon={<PendingActionsOutlinedIcon />}
          style={{ marginRight: "1%", color: "#fff" }}
          size="small"
          onClick={() => openDialog("confirm")}
        >
          {weekDetail && weekDetail.status ? "ĐÃ DUYỆT" : "DUYỆT LỊCH"}
        </Button>
        <Button
          disabled={!weekDetail || !accessRight}
          variant="contained"
          color="error"
          endIcon={<DeleteSweepIcon />}
          style={{ marginRight: "1%", color: "#fff" }}
          size="small"
          onClick={() => openDialog("delete")}
        >
          XOÁ LỊCH
        </Button>
        {weekDetail ? (
          dialogType ? (
            <AlertDialog
              children={`Xác nhận xoá lịch tuần ${new Date(
                weekDetail.begin_at
              ).toLocaleDateString("vi-VN")} -
          ${new Date(weekDetail.end_at).toLocaleDateString("vi-VN")} ?`}
              title="Xoá lịch"
              onAccept={deleteSchedule}
            />
          ) : (
            <AlertDialog
              children={`Xác nhận duyệt lịch tuần ${new Date(
                weekDetail.begin_at
              ).toLocaleDateString("vi-VN")} -
        ${new Date(weekDetail.end_at).toLocaleDateString("vi-VN")} ?`}
              title="Duyệt lịch"
              onAccept={confirmSchedule}
            />
          )
        ) : null}

        <FormModal
          children={<ModalContent />}
          style={{ width: "85%", height: "90vh" }}
        />

        <div className="dateCont">
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chọn tuần</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              label="Chọn tuần"
              onChange={(e) => setSelect(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}

          <CustomDay isModal={false} />
        </div>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          bordered
          dataSource={data}
          pagination={false}
        />
      </div>
      <div style={{ height: "5vh", width: "100%" }}></div>
    </>
  );
};
export default Schedule;
