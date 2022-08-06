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
import AddIcon from "@mui/icons-material/Add";
import ConstructionIcon from "@mui/icons-material/Construction";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";
import moment from "moment";
import Button from "@mui/material/Button";
import { numbToCurrency } from "../../../helper/currency";

import { menuText } from "../../../helper/Text";

import FormModal from "../../../components/FormElements/FormModal";
import * as collections from "../../../api/Collections/bill";
import { GIRD12 } from "../../../helper/constant";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import SearchTable from "../../../components/Table/SearchTable";
import ModalContent from "./Modal";
import { CloseOutlined } from "@ant-design/icons";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

const Bills = () => {
  const [loading, setLoading] = useState(false);
  const dataList = useAppSelector((state) => state.bills.listAll);
  const [showList, setShowList] = useState(false);
  const [selectionType, setSelectionType] = useState("checkbox");

  const [search, setSearch] = useState("");

  const [postList, setPostList] = useState({ page: 1, per_page: 10 });

  const loadData = useAppSelector((state) => state.form.loadData);
  const [data, setData] = useState([]);
  const onChangeSearch = async (value) => {
    const reg = new RegExp(value, "gi");
    const temp = data;
    const filteredData = map(temp, (record) => {
      const nameMatch = get(record, "createdAt").match(reg);
      if (!nameMatch) {
        return null;
      }
      return record;
    }).filter((record) => !!record);

    setSearch(value);
    value
      ? setData(filteredData)
      : dispatch(actions.formActions.changeLoad(!loadData));
  };
  // const emitEmpty = () => {
  //   this.setState({
  //     data: dataList,
  //     search: "",
  //   });
  // };
  const columns = [
    {
      title: "Đơn hàng",
      dataIndex: "details",
      width: GIRD12.COL6,
      key: "details",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: GIRD12.COL2,
      key: "createdAt",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   render: (item) => {
    //     let status = " ";
    //     switch (item) {
    //       case 1:
    //         status = "Đã thanh toán";
    //         break;
    //       case 2:
    //         status = "Chưa thanh toán";
    //         break;
    //       default:
    //         status = "Đã thanh toán";
    //         break;
    //     }

    //     return (
    //       <>
    //         <p>{status}</p>
    //       </>
    //     );
    //   },
    //   width: GIRD12.COL2,
    // },
    {
      title: "Nhân viên thanh toán",
      dataIndex: "account_id",
      width: GIRD12.COL2,
      key: "account_id",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_methods",
      render: (item) => {
        let role = " ";
        switch (item) {
          case 0:
            role = "Tiền mặt";
            break;
          case 1:
            role = "Momo";
            break;
          case 2:
            role = "Ngân hàng";
            break;
          default:
            role = "Tiền mặt";
            break;
        }

        return (
          <>
            <p>{role}</p>
          </>
        );
      },
      width: GIRD12.COL2,
    },
    {
      title: "Tổng tiền",
      dataIndex: "price_total",
      width: GIRD12.COL2,
      key: "price_total",
    },
    {
      width: GIRD12.COL3,

      title: "Hoạt động",
      render: (item) => {
        return (
          <>
            <div className="btnBills">
              <Button
                variant="contained"
                endIcon={<LocalPrintshopOutlinedIcon />}
                style={{ marginRight: "7%", color: "#fff" }}
                size="small"
                color="primary"
                onClick={() => handlePrint(item)}
              >
                In
              </Button>
              <Popconfirm
                title={`Bạn có muốn xoá đơn ${item.createdAt} không ?`}
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
            </div>
          </>
        );
      },
    },
  ];
  const fetchData = async (value) => {
    try {
      setLoading(true);
      const response = await collections.getBills();
      dispatch(actions.billsActions.setListAll(response));
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
  }, [loadData]);

  useEffect(() => {
    setData(
      showList
        ? dataList.map((item, index) => {
            return {
              key: item._id,
              _id: item._id,
              account_id: item.account_id,
              price_total: numbToCurrency(item.price_total),
              details: item.details.map((item) => {
                return `${
                  item.name +
                  ", " +
                  numbToCurrency(item.price) +
                  ", x" +
                  item.amount +
                  "\n"
                }`;
              }),

              payment_type: item.payment_type,
              createdAt: moment(new Date(item.createdAt)).format(
                "h:mma - DD/MM/YYYY"
              ),
            };
          })
        : []
    );
  }, [showList, dataList]);

  const dispatch = useAppDispatch();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );

      dispatch(actions.billsActions.setDetail(selectedRowKeys));
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const getDetail = (item) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.billsActions.setDetail(item._id));
  };

  const handleOpen = () => {
    dispatch(actions.billsActions.setDetail(null));
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));
  };
  async function handlePrint(item) {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(true));

    dispatch(actions.billsActions.setDetail(item._id));
  }
  async function handleDelete(item) {
    setLoading(true);
    await collections.removeBill(item._id);
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
          endIcon={<CloseOutlined />}
          style={{
            marginRight: "1%",
            backgroundColor: "#B2431E",
            color: "#fff",
            paddingTop: "1%",
          }}
          size="medium"
        >
          XÓA 3 THÁNG ĐƠN
        </Button>
        <FormModal children={<ModalContent />} />

        <div className="dishSearch">
          <SearchTable
            placeholder={menuText.searchBills}
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

export default Bills;
