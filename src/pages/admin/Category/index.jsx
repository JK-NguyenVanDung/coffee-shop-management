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
import moment from "moment";

import { menuText } from "../../../helper/Text";

import FormModal from "../../../components/FormElements/FormModal";
import * as collections from "../../../api/Collections/category";
import { GIRD12 } from "../../../helper/constant";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import SearchTable from "../../../components/Table/SearchTable";
import ModalContent from "./Modal";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const dataList = useAppSelector((state) => state.categories.listAll);
  const [showList, setShowList] = useState(false);

  const [search, setSearch] = useState("");

  const [postList, setPostList] = useState({ page: 1, per_page: 10 });
  const checkOnload = useAppSelector((state) => state.form.loadData);

  const loadData = useAppSelector((state) => state.form.loadData);
  const [data, setData] = useState([]);
  const onChangeSearch = async (value) => {
    const reg = new RegExp(value, "gi");
    const filteredData = map(dataList, (record) => {
      const nameMatch = get(record, "name").match(reg);
      if (!nameMatch) {
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
      title: "Tên nhóm món",
      dataIndex: "name",
      width: GIRD12.COL3,
    },
    {
      title: "Tên nhóm menu",
      dataIndex: "category_type_id",
      width: GIRD12.COL1,
    },

    {
      title: "Tạo vào",
      dataIndex: "createdAt",
      // render: (text) => <a>{text}</a>,
      width: GIRD12.COL1,
    },

    {
      title: "Cập nhật vào",
      dataIndex: "updatedAt",
      // render: (text) => <a>{text}</a>,
      width: GIRD12.COL1,
    },
    {
      width: GIRD12.COL2,

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
      const response = await collections.getCategories();
      dispatch(actions.categoriesActions.setListAll(response));
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
  }, [loadData, postList]);

  useEffect(() => {
    fetchData(postList);
  }, []);

  useEffect(() => {
    setData(
      showList
        ? dataList.map((item, index) => {
            return {
              id: item._id,
              name: item.name,
              category_type_id:
                item.category_type_id === "true" ? "Đồ uống" : "Đồ ăn",
              createdAt: moment(new Date(item.createdAt)).format(
                "h:mma - DD/MM/YYYY"
              ),
              updatedAt: moment(new Date(item.updatedAt)).format(
                "h:mma - DD/MM/YYYY"
              ),
            };
          })
        : []
    );
  }, [showList, dataList]);

  const dispatch = useAppDispatch();
  const getDetail = (item) => {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(true));

    dispatch(actions.categoriesActions.setDetail(item.id));
  };

  const handleOpen = () => {
    dispatch(actions.categoriesActions.setDetail(null));
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));
  };
  async function handleEdit(item) {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.categoriesActions.setDetail(item.id));
  }
  async function handleDelete(item) {
    setLoading(true);
    await collections.removeCategory(item.id);
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
          style={{
            marginRight: "1%",
            backgroundColor: "#4BB984",
            color: "#fff",
          }}
          size="small"
        >
          THÊM NHÓM MÓN
        </Button>
        <FormModal children={<ModalContent />} />

        <div className="dishSearch">
          <SearchTable
            placeholder={menuText.searchCategories}
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
export default Category;
