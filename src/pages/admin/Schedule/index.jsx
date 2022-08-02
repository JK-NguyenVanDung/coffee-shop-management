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
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";

import { menuText } from "../../../helper/Text";

import FormModal from "../../../components/FormElements/FormModal";
import * as collections from "../../../api/Collections/employees";
import { GIRD12 } from "../../../helper/constant";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import SearchTable from "../../../components/Table/SearchTable";
import ModalContent from "./Modal";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";

const Schedule = () => {
  const [loading, setLoading] = useState(false);
  const dataList = useAppSelector((state) => state.employees.listAll);
  const [showList, setShowList] = useState(false);

  const [search, setSearch] = useState("");

  const [postList, setPostList] = useState({ page: 1, per_page: 10 });
  const checkOnload = useAppSelector((state) => state.form.loadData);

  const loadData = useAppSelector((state) => state.form.loadData);
  const [data, setData] = useState([]);
  const onChangeSearch = async (value) => {
    const reg = new RegExp(value, "gi");
    const filteredData = map(dataList, (record) => {
      const nameMatch = get(record, "full_name").match(reg);
      const addressMatch = get(record, "address").match(reg);
      if (!nameMatch && !addressMatch) {
        return null;
      }
      return record;
    }).filter((record) => !!record);

    setSearch(value);
    setData(value ? filteredData : dataList);
  };
  // const emitEmpty = () => {
  //   this.setState({
  //     data: dataList,
  //     search: "",
  //   });
  // };
  const columns = [
    {
      title: "Ca làm",
      dataIndex: "shift",
      width: GIRD12.COL2,
    },
    {
      title: "Thứ 2",
      dataIndex: "monday",
      width: GIRD12.COL2,
    },
    {
      title: "Thứ 3",
      dataIndex: "tuesday",
      width: GIRD12.COL2,
    },
    {
      title: "Thứ 4",
      dataIndex: "wednesday",
    },
    {
      title: "Thứ 5",
      dataIndex: "thursday",
    },
    {
      title: "Thứ 6",
      dataIndex: "friday",
    },
    {
      title: "Thứ 7",
      dataIndex: "satuday",
    },
    {
      title: "Chủ nhật",
      dataIndex: "sunday",
    },
  ];
  const fetchData = async (value) => {
    try {
      setLoading(true);
      const response = await collections.getEmployees();
      dispatch(actions.employeesActions.setListAll(response));
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
  }, [checkOnload, postList]);

  useEffect(() => {
    fetchData(postList);
  }, []);

  useEffect(() => {
    setData(
      showList
        ? dataList.map((item, index) => {
            return {
              monday: item.monday,

              tuesday: item.tuesday,

              wednesday: item.wednesday,

              thursday: item.thursday,

              friday: item.friday,

              saturday: item.saturday,

              sunday: item.sunday,

              begin_at: item.begin_at,

              end_at: item.end_at,
            };
          })
        : []
    );
  }, [showList, checkOnload, dataList]);

  const dispatch = useAppDispatch();
  const getDetail = (item) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(true));
    dispatch(actions.employeesActions.setDetail(item.id));
  };

  const handleOpen = () => {
    dispatch(actions.employeesActions.setDetail(null));
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));
  };
  async function handleEdit(item) {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.employeesActions.setDetail(item.id));
  }
  async function handleDelete(item) {
    setLoading(true);
    await collections.removeEmployee(item.id);
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
          variant="contained"
          endIcon={<PendingActionsOutlinedIcon />}
          style={{ marginRight: "1%", backgroundColor: "#111", color: "#fff" }}
          size="small"
        >
          CHẤM CÔNG
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
            value={search}
            onChange={(e) => onChangeSearch(e.target.value)}
            // onSearch={onSearch}
            enterButton
          />
        </div>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => getDetail(record),
            };
          }}
        />
      </div>
    </>
  );
};
export default Schedule;
