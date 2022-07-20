import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Table, Form, Popconfirm, Upload, message, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./index.scss";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { menuText } from "../../../helper/Text";
import * as collections from "../../../api/Collections/dish";

const { Search } = Input;
const columns = [
  {
    title: "ID món ăn",
    dataIndex: "_id",
  },
  {
    title: "Ảnh",
    dataIndex: "avatar",
  },
  {
    title: "Tên món",
    dataIndex: "name",
  },
  {
    title: "Công thức",
    // dataIndex: "recipe",
  },
  {
    title: "Đơn giá",
    dataIndex: "amount_sell",
  },
  {
    title: "Ẩn món",
    dataIndex: "status",
    render: (item) => {
      return (
        <>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked checked={item.status} />}
              label="Hiện"
              size="small"
            />
          </FormGroup>
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
            style={{ marginRight: "20px" }}
            size="small"
          >
            Sửa
          </Button>
          <Popconfirm
            // title={`Bạn có muốn xoá ${item.full_name}`}
            // onConfirm={() => handleDelete(item)}
            // onCancel={cancel}
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

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//     },
// };
const FoodAndDrink = () => {
  // const [selectionType, setSelectionType] = useState('checkbox');
  const [postList, setPostList] = useState({ page: 1, per_page: 10 });
  const checkOnload = useAppSelector((state) => state.form.loadData);

  const loadData = useAppSelector((state) => state.form.loadData);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState({});
  const [showList, setShowList] = useState(false);
  const dispatch = useAppDispatch();

  const fetchData = async (value) => {
    try {
      setLoading(true);
      const response = await collections.getDishes();
      dispatch(actions.dishesActions.setListAll(response));
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
          _id: item._id,
          name: item.name,
          amount: item.amount,
          amount_sell: item.amount_sell,
          recipe: item.recipe,
          status: item.status,
          avatar: item.avatar,
        };
      })
    : [];
  return (
    <>
      <div className="dishSearchCont">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          style={{ marginRight: "10px" }}
          size="small"
        >
          THÊM MÓN
        </Button>
        <div className="dishSearch">
          <Search placeholder={menuText.searchMenu} allowClear size="default" />
        </div>
      </div>
      <div>
        <Table
          // rowSelection={{
          //     type: selectionType,
          //     rowSelection,
          // }}
          loading={loading}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};
export default FoodAndDrink;
