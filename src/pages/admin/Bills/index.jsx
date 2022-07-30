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
import Button from "@mui/material/Button";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";

import { menuText } from "../../../helper/Text";

import FormModal from "../../../components/FormElements/FormModal";
import * as collections from "../../../api/Collections/bill";
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
const Bills = () => {
  const [loading, setLoading] = useState(false);
  const dataList = useAppSelector((state) => state.bills.listAll);
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
      const response = await collections.getbills();
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

    dispatch(actions.billsActions.setDetail(item.id));
  };

  const handleOpen = () => {
    dispatch(actions.billsActions.setDetail(null));
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));
  };
  async function handleEdit(item) {
    dispatch(actions.formActions.showForm());
    dispatch(actions.formActions.setDetail(false));

    dispatch(actions.billsActions.setDetail(item.id));
  }
  async function handleDelete(item) {
    setLoading(true);
    await collections.removeBill(item.id);
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
  }, [loadData]);

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
            placeholder={menuText.searchbills}
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
import { CloseOutlined } from "@ant-design/icons";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

// const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//         console.log(
//             `selectedRowKeys: ${selectedRowKeys}`,
//             "selectedRows: ",
//             selectedRows
//         );
//     },
// };
// const Bills = () => {
//     const [loading, setLoading] = useState(false);
//     const dataList = useAppSelector((state) => state.employees.listAll);
//     const [showList, setShowList] = useState(false);

//     const [selectionType, setSelectionType] = useState("checkbox");
//     const [search, setSearch] = useState("");

//     const [postList, setPostList] = useState({ page: 1, per_page: 10 });
//     const checkOnload = useAppSelector((state) => state.form.loadData);

//     const loadData = useAppSelector((state) => state.form.loadData);
//     const [data, setData] = useState([]);
//     const onChangeSearch = async (value) => {
//         const reg = new RegExp(value, "gi");
//         const filteredData = map(dataList, (record) => {
//             const nameMatch = get(record, "full_name").match(reg);
//             const addressMatch = get(record, "address").match(reg);
//             if (!nameMatch && !addressMatch) {
//                 return null;
//             }
//             return record;
//         }).filter((record) => !!record);

//         setSearch(value);
//         setData(value ? filteredData : dataList);
//     };
//     // const emitEmpty = () => {
//     //   this.setState({
//     //     data: dataList,
//     //     search: "",
//     //   });
//     // };
//     const columns = [
//         {
//             title: "ID đơn hàng",
//             dataIndex: "id_bills",
//             // render: (text) => <a>{text}</a>,
//             width: GIRD12.COL1,
//             key: 'id_bills',
//         },
//         {
//             title: "Đơn hàng",
//             dataIndex: "order",
//             width: GIRD12.COL3,
//             key: 'order',
//         },
//         {
//             title: "Ngày tạo",
//             dataIndex: "date_created",
//             width: GIRD12.COL2,
//             key: 'date_created',
//         },
//         {
//             title: "Trạng thái",
//             dataIndex: "status",
//             render: (item) => {
//                 let status = " ";
//                 switch (item) {
//                     case 1:
//                         status = "Đã thanh toán";
//                         break;
//                     case 2:
//                         status = "Chưa thanh toán";
//                         break;
//                     default:
//                         status = "Đã thanh toán";
//                         break;
//                 }

//                 return (
//                     <>
//                         <p>{status}</p>
//                     </>
//                 );
//             },
//             width: GIRD12.COL2,
//         },
//         {
//             title: "Phương thức thanh toán",
//             dataIndex: "payment_methods",
//             render: (item) => {
//                 let role = " ";
//                 switch (item) {
//                     case 0:
//                         role = "Tiền mặt";
//                         break;
//                     case 1:
//                         role = "Momo";
//                         break;
//                     case 2:
//                         role = "Ngân hàng";
//                         break;
//                     default:
//                         role = "Tiền mặt";
//                         break;
//                 }

//                 return (
//                     <>
//                         <p>{role}</p>
//                     </>
//                 );
//             },
//             width: GIRD12.COL2,
//         },
//         {
//             title: "Tổng tiền",
//             dataIndex: "total_money",
//             width: GIRD12.COL2,
//             key: 'total_money',
//         },
//     ];

//     // fake data
//     const dataSource = [
//         {
//             key: '1',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '2',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '3',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '4',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '5',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '6',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '7',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '8',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '9',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },
//         {
//             key: '10',
//             id_bills: 'CFM01',
//             order: 'Cafe đá, 25.000 VND, 1',
//             date_created: '29/07/2022',
//             total_money: '100.000 VND',
//         },


//     ];
//     const fetchData = async (value) => {
//         try {
//             setLoading(true);
//             const response = await collections.getEmployees();
//             dispatch(actions.employeesActions.setListAll(response));
//             setShowList(true);
//             setLoading(false);
//             // setPagination({
//             //   totalDocs: response.metadata.count,
//             // });
//         } catch (error) {
//             //history.replace("/");
//         }
//     };

//     useEffect(() => {
//         // test.current = 2;
//         console.log("1");
//         fetchData(postList);
//     }, [checkOnload, postList]);

//     useEffect(() => {
//         fetchData(postList);
//     }, []);

//     useEffect(() => {
//         setData(
//             showList
//                 ? dataList.map((item, index) => {
//                     return {
//                         id: item._id,
//                         email: item.email,
//                         phone_number: item.phone_number,
//                         password: item.password,
//                         address: item.address,
//                         account_status: item.account_status,
//                         role: item.role,
//                         full_name: item.full_name,
//                         id_card: item.id_card,
//                         date_of_birth: item.date_of_birth,
//                         avatar: item.avatar,
//                         createdAt: item.createdAt,
//                         updatedAt: item.updatedAt,
//                     };
//                 })
//                 : []
//         );
//     }, [showList, checkOnload, dataList]);

//     const dispatch = useAppDispatch();
//     const getDetail = (item) => {
//         dispatch(actions.formActions.showForm());
//         dispatch(actions.formActions.setDetail(true));
//         dispatch(actions.employeesActions.setDetail(item.id));
//     };

//     const handleOpen = () => {
//         dispatch(actions.employeesActions.setDetail(null));
//         dispatch(actions.formActions.showForm());
//         dispatch(actions.formActions.setDetail(false));
//     };
//     async function handleEdit(item) {
//         dispatch(actions.formActions.showForm());
//         dispatch(actions.formActions.setDetail(false));

//         dispatch(actions.employeesActions.setDetail(item.id));
//     }
//     async function handleDelete(item) {
//         setLoading(true);
//         await collections.removeEmployee(item.id);
//         dispatch(actions.formActions.changeLoad(!loadData));
//         message.success("Xoá thành công");
//         setLoading(false);
//     }
//     function cancel(e) {
//         // message.error('Click on No');
//     }
//     useEffect(() => {
//         // test.current = 2;
//         fetchData(postList);
//     }, [loadData, checkOnload]);

//     const onSearch = (value) => console.log(value);

//     return (
//         <>
//             <div className="dishSearchCont">
//                 <Button
//                     variant="contained"
//                     endIcon={<CloseOutlined />}
//                     style={{ marginRight: "1%", backgroundColor: "#B2431E", color: "#fff" }}
//                     size="small"
//                 >
//                     HỦY ĐƠN
//                 </Button>

//                 <Button
//                     onClick={handleOpen}
//                     variant="contained"
//                     endIcon={<LocalPrintshopOutlinedIcon />}
//                     style={{
//                         marginRight: "1%",
//                         backgroundColor: "#4CACBA",
//                         color: "#fff",
//                     }}
//                     size="small"
//                 >
//                     IN ĐƠN
//                 </Button>
//                 <FormModal children={<ModalContent />} />

//                 <div className="dishSearch">
//                     <SearchTable
//                         placeholder={menuText.searchBills}
//                         allowClear
//                         size="default"
//                         value={search}
//                         onChange={(e) => onChangeSearch(e.target.value)}
//                         // onSearch={onSearch}
//                         enterButton
//                     />
//                 </div>
//             </div>
//             <div>
//                 <Table
//                     rowSelection={{
//                         type: selectionType,
//                         ...rowSelection,
//                     }}
//                     loading={loading}
//                     columns={columns}
//                     dataSource={dataSource}
//                     onRow={(record, rowIndex) => {
//                         return {
//                             onDoubleClick: (event) => getDetail(record),
//                         };
//                     }}
//                 />
//             </div>
//         </>
//     );
// };
export default Bills;
