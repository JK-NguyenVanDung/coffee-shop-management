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
            <Button
              onClick={() => logOut(item, item.tuesday)}
              size="large"
              sx={{
                color: "#111",
                p: 2,
                minWidth: "100%",
              }}
            >
              Thêm nhân viên
            </Button>
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
      // const response = await collections.getSchedules();
      const employees = await employeesCollections.getEmployees();
      dispatch(actions.scheduleActions.setListEmployees(employees));

      const response = [
        {
          _id: "sadsadsadsad",

          shifts: [
            {
              _id: "0",
              shift: "Ca sáng",
              days: [
                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                  "62d68b7a83d7ce588288fb16",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],
              ],
            },
            {
              _id: "1",
              shift: "Ca chiều",

              days: [
                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                  "62d68b7a83d7ce588288fb16",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],
              ],
            },
            {
              _id: "2",

              shift: "Ca tối",
              days: [
                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                  "62d68b7a83d7ce588288fb16",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],

                [
                  "62d4272c4ff9d853e14b2f85",
                  "62d439a84ff9d853e14b2faf",
                  "62d68b7a83d7ce588288fb14",
                ],
              ],
            },
          ],
          startDay: "8/03/2022",
          endDay: "8/07/2022",
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

  useEffect(() => {
    // test.current = 2;
    fetchData(postList);
  }, [checkOnload]);
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
      if (dataList[i].startDay === start.toLocaleDateString()) {
        currentIndex = i;
        break;
      } else {
        currentIndex = 0;
      }
    }
    dispatch(actions.scheduleActions.setWeekDetail(dataList[currentIndex]));

    setData(
      showList && weekDetail
        ? weekDetail.shifts.map((item, index) => {
            return {
              shift: item.shift,
              monday: item.days[0],

              tuesday: item.days[1],

              wednesday: item.days[2],

              thursday: item.days[3],

              friday: item.days[4],

              saturday: item.days[5],

              sunday: item.days[6],
              id: item._id,
            };
          })
        : []
    );
  }, [showList, checkOnload, dataList, date]);

  const dispatch = useAppDispatch();
  const getDetail = (id) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(true));
    dispatch(actions.scheduleActions.setDetail(id));
  };

  const handleOpen = () => {
    dispatch(actions.scheduleActions.setDetail(null));
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));
  };
  async function handleEdit(item) {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.scheduleActions.setDetail(item.id));
  }
  async function handleDelete(item) {
    setLoading(true);
    await collections.removeSchedule(item.id);
    dispatch(actions.formActions.changeLoad(!loadData));
    message.success("Xoá thành công");
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
          THÊM LỊCH NV
        </Button>
        <Button
          color="primary"
          variant="contained"
          endIcon={<PendingActionsOutlinedIcon />}
          style={{ marginRight: "1%", color: "#fff" }}
          size="small"
        >
          DUYỆT LỊCH
        </Button>
        <Button
          variant="contained"
          color="error"
          endIcon={<DeleteSweepIcon />}
          style={{ marginRight: "1%", color: "#fff" }}
          size="small"
        >
          XOÁ LỊCH
        </Button>

        <FormModal
          children={<ModalContent />}
          style={{ width: "85%", height: "90vh" }}
        />

        <div className="dishSearch">
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

          <CustomDay />
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
