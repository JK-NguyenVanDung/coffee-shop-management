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
import SearchTable from "../../../components/Table/SearchTable";

const { Search } = Input;

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
  const onSearch = (value) => console.log(value);
  const [data, setData] = useState([]);
  const onChangeSearch = async (value) => {
    // await setSearch(value);
    // pagination.name = value;
  };

  const getDetail = (item) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(true));
    dispatch(actions.dishesActions.setDetail(item._id));
  };

  const handleOpen = () => {
    dispatch(actions.dishesActions.setDetail(null));
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));
  };
  async function handleEdit(item) {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.dishesActions.setDetail(item._id));
  }
  async function handleDelete(item) {
    setLoading(true);
    await collections.removeDish(item.id);
    dispatch(actions.formActions.changeLoad(!loadData));
    message.success("Xoá thành công");
    setLoading(false);
  }
  function cancel(e) {
    // message.error('Click on No');
  }
  async function changeDisable(id) {
    dataList.map((item) => {
      if (item._id === id) {
        setLoading(true);
        collections.editDish({
          _id: item._id,
          body: {
            name: item.name,
            amount: item.amount,
            amount_sell: item.amount_sell,
            recipe: item.recipe,
            status: !item.status,
            avatar: item.avatar,
          },
        });
        dispatch(actions.formActions.changeLoad(!loadData));
        message.success("Chỉnh thành công");
        setLoading(false);
        return;
      }
    }, []);
  }

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
      dataIndex: "recipe",
    },
    {
      title: "Đơn giá",
      dataIndex: "amount_sell",
    },
    {
      title: "Ẩn món",
      render: (item) => {
        return (
          <>
            <Switch
              checkedChildren="Hiện"
              unCheckedChildren="Ẩn"
              defaultChecked={item.active}
              onChange={() => changeDisable(item._id)}
            />
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
              onClick={() => handleEdit(item)}
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

  useEffect(() => {
    setData(
      showList
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
        : []
    );
  }, [showList]);

  return (
    <>
      <div className="dishSearchCont">
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          style={{ marginRight: "10px" }}
          size="small"
          onClick={handleOpen}
        >
          THÊM MÓN
        </Button>
        <div className="dishSearch">
          <SearchTable
            placeholder={menuText.searchEmployees}
            allowClear
            size="default"
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
export default FoodAndDrink;
