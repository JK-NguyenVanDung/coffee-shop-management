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

import { menuText } from "../../../helper/Text";

import FormModal from "../../../components/FormElements/FormModal";
import * as collections from "../../../api/Collections/employees";
import { GIRD12 } from "../../../helper/constant";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import SearchTable from "../../../components/Table/SearchTable";
import ModalContent from "./Modal";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
const Employees = () => {
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState({});
  const [showList, setShowList] = useState(false);

  const [selectionType, setSelectionType] = useState("checkbox");
  const [value, setValue] = React.useState("still break" & null);

  const [postList, setPostList] = useState({ page: 1, per_page: 10 });
  const checkOnload = useAppSelector((state) => state.form.loadData);

  const loadData = useAppSelector((state) => state.form.loadData);

  const columns = [
    {
      title: "ID nhân viên",
      dataIndex: "id",
      // render: (text) => <a>{text}</a>,
      width: GIRD12.COL1,
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
      width: GIRD12.COL2,
    },
    {
      title: "Thông tin liên lạc",
      dataIndex: "address",
      // dataIndex: 'sdt',
      // dataIndex: 'avatar',
      // dataIndex: 'age',
      width: GIRD12.COL3,
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
              style={{ marginRight: "7%", color: "#fff" }}
              size="small"
              color="primary"
              onClick={() => handleEdit(item)}
            >
              Sửa
            </Button>
            <Popconfirm
              title={`Bạn có muốn xoá ${item.full_name}`}
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
                color="error"
              >
                Xóa
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
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
  }, [checkOnload, postList]);

  useEffect(() => {
    fetchData(postList);
  }, []);

  const data = showList
    ? dataList.map((item, index) => {
        return {
          id: item._id,
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
  const getDetail = (item) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setEdit(false));

    dispatch(actions.employeesActions.setDetail(item.id));
  };

  const handleOpen = () => {
    dispatch(actions.employeesActions.setDetail(null));
    dispatch(actions.formActions.showForm());
  };
  async function handleEdit(item) {
    dispatch(actions.formActions.showForm());

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
  useEffect(() => {
    // test.current = 2;
    fetchData(postList);
  }, [checkOnload, loadData]);

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
export default Employees;
