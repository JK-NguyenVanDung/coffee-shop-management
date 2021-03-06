import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";
import {
  Input,
  Table,
  Form,
  Popconfirm,
  Upload,
  message,
  Tooltip,
  Switch,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./index.scss";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
import { dishText } from "../../../helper/Text";
import * as collections from "../../../api/Collections/dish";
import SearchTable from "../../../components/Table/SearchTable";
import ModalContent from "./Modal";
import FormModal from "../../../components/FormElements/FormModal";
import { numbToCurrency } from "../../../helper/currency";

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
  const dataList = useAppSelector((state) => state.dishes.listAll);
  const [showList, setShowList] = useState(false);
  const dispatch = useAppDispatch();
  const onSearch = (value) => console.log(value);
  const [switchStatus, setSwitchStatus] = useState(true);
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
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
    await collections.removeDish(item._id);
    dispatch(actions.formActions.changeLoad(!loadData));
    message.success("Xo?? th??nh c??ng");
    setLoading(false);
  }
  function cancel(e) {
    // message.error('Click on No');
  }
  async function changeDisable(id) {
    setSwitchStatus(!switchStatus);
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
        message.success("Ch???nh th??nh c??ng");
        setLoading(false);

        return;
      }
    }, []);
  }

  const columns = [
    {
      title: "???nh",
      dataIndex: "avatar",
    },
    {
      title: "T??n m??n",
      dataIndex: "name",
    },
    {
      title: "C??ng th???c",
      dataIndex: "recipe",
    },
    {
      title: "????n gi??",
      dataIndex: "price",
    },
    {
      title: "???n/Hi???n m??n",
      render: (item) => {
        return (
          <div className="dishSwitchCont">
            {/* <Switch
              defaultChecked={item.status}
              onChange={() => changeDisable(item._id)}
            /> */}
            <Switch
              checkedChildren={"???n"}
              unCheckedChildren={"Hi???n"}
              defaultChecked={item.status}
              onChange={() => changeDisable(item._id)}
              // style={{ minHeight: "2rem", width: "7rem" }}
            />
            {/* {item.status === false ? "Hi???n" : "???n"} */}
          </div>
        );
      },
    },
    {
      title: "Ho???t ?????ng",
      render: (item) => {
        return (
          <>
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              style={{ marginRight: "20px", color: "#fff" }}
              size="small"
              onClick={() => handleEdit(item)}
            >
              S???a
            </Button>
            <Popconfirm
              title={`B???n c?? mu???n xo?? ${item.name}`}
              onConfirm={() => handleDelete(item)}
              onCancel={cancel}
              okText="C??"
              cancelText="Kh??ng"
              placement="left"
            >
              <Button
                variant="contained"
                endIcon={<DeleteSweepIcon />}
                size="small"
                color="error"
              >
                X??a
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
              price: numbToCurrency(item.price),
              recipe: item.recipe,
              status: item.status,
              avatar: item.avatar,
            };
          })
        : []
    );
  }, [showList, dataList, loadData]);

  return (
    <>
      <div className="dishSearchCont">
        <Button
          onClick={handleOpen}
          variant="contained"
          endIcon={<AddIcon />}
          style={{
            marginRight: "10px",
            backgroundColor: "#4BB984",
            color: "#fff",
          }}
          size="small"
        >
          TH??M M??N
        </Button>
        <FormModal children={<ModalContent />} />

        <div className="dishSearch">
          <SearchTable
            placeholder={dishText.search}
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
