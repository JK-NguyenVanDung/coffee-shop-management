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
import { CloseOutlined } from "@ant-design/icons";

import { IconButton, Typography } from "@mui/material";
import * as collections from "../../../api/Collections/category";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";

import { errorText } from "../../../helper/Text";
import ImgCrop from "antd-img-crop";

import NumberInput from "../../../components/FormElements/NumberInput";
import moment from "moment";

import AlertModal from "../../../components/FormElements/AlertModal";
import AlertDialog from "../../../components/AlertDialog";

const radioBtnstyles = (theme) => ({
  radio: {
    "&$checked": {
      color: "#4B8DF8",
    },
  },
  checked: {},
});

const ModalContent = () => {
  const [loading, setLoading] = useState(false);
  const dataItem = useAppSelector((state) => state.categories.detail);
  const [date, setDate] = React.useState(new Date("2001-08-18"));
  const [status, setStatus] = React.useState("1");
  let [role, setRole] = useState(true);
  const loadData = useAppSelector((state) => state.form.loadData);
  const modalError = useAppSelector((state) => state.form.modalError);
  const isDetail = useAppSelector((state) => state.form.detail);
  const [disablePass, setDisablePass] = useState(true);
  const openDialog = useAppSelector((state) => state.form.delete);

  const handleChange = (newValue) => {
    setDate(newValue);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleOpen = () => dispatch(actions.formActions.showForm());
  const handleClose = () => dispatch(actions.formActions.closeForm());

  const deleteItem = () => {
    dispatch(actions.formActions.showDelete());
  };
  const editItem = () => dispatch(actions.formActions.setDetail(false));
  useEffect(() => {
    form.resetFields();

    const setForm = () => {
      form.setFieldsValue({
        name: dataItem.name,
        createdAt: moment(new Date(dataItem.createdAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
        updatedAt: moment(new Date(dataItem.updatedAt)).format(
          "h:mma - DD/MM/YYYY"
        ),
      });
    };

    if (dataItem) {
      setForm();
    }
  }, [dataItem]);
  const { Category, manager } = role;
  const error = [Category, manager].filter((v) => v).length !== 1;

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        const temp = [];
        if (dataItem) {
          await collections.editCategory({
            _id: dataItem._id,
            body: {
              name: values.name,
            },
          });
          handleClose();
          dispatch(actions.formActions.changeLoad(!loadData));
          message.success("Thay ?????i th??nh c??ng");

          setLoading(false);
        } else {
          await collections.addCategory({
            name: values.name,
          });
          handleClose();
          dispatch(actions.formActions.changeLoad(!loadData));
          message.success("Th??m th??nh c??ng");

          setLoading(false);
        }
      })

      .catch((info) => {
        dispatch(actions.formActions.showError());

        setLoading(false);
      });
  };

  function getHeaderTitle() {
    if (dataItem && isDetail) {
      return "Th??ng tin nh??m m??n";
    }
    if (dataItem) {
      return "S???a nh??m m??n";
    }
    return "Th??m nh??m m??n";
  }
  const handleDelete = async () => {
    setLoading(true);
    await collections.removeCategory(dataItem._id);
    message.success("Xo?? th??nh c??ng");
    setLoading(false);
    dispatch(actions.formActions.hideDelete());
    dispatch(actions.formActions.closeForm());
    dispatch(actions.formActions.changeLoad(!loadData));
  };
  const labels = {
    name: "T??n nh??m m??n",
    create: "Ng??y t???o",
    update: "Ng??y c???p nh???t",
  };
  return (
    <div className="ModalCont">
      {modalError && <AlertModal chilren={errorText.formValidation} />}
      <div className="headerCont">
        <h2>{getHeaderTitle()}</h2>
        <IconButton onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <Form form={form} className="form" initialValues={{ modifier: "public" }}>
        <div className="bodyCont">
          <div style={{ width: "40%" }}>
            <h4>{labels.name}</h4>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: `Kh??ng ???????c ????? tr???ng t??n nh??m m??n`,
                },
                {
                  pattern: new RegExp(/^\w/),
                  message: errorText.space,
                },
              ]}
            >
              <Input disabled={isDetail} placeholder="Nh???p t??n nh??m m??n" />
            </Form.Item>
            {dataItem ? (
              <>
                <h4>{labels.create}</h4>
                <Form.Item
                  name="createdAt"
                  rules={[
                    {
                      required: true,
                      message: `Kh??ng ???????c ????? tr???ng`,
                    },
                  ]}
                >
                  <Input disabled={true} placeholder="Nh???p" />
                </Form.Item>
                <h4>{labels.update}</h4>
                <Form.Item
                  name="updatedAt"
                  rules={[
                    {
                      required: true,
                      message: `Kh??ng ???????c ????? tr???ng`,
                    },
                  ]}
                >
                  <Input disabled={true} placeholder="Nh???p" />
                </Form.Item>
              </>
            ) : null}
          </div>
        </div>
        <div className="BtnAdd">
          <Button
            size="Large"
            color={dataItem ? "primary" : "success"}
            variant="contained"
            style={{
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingTop: "2%",
              paddingBottom: "2%",
              color: "#fff",
            }}
            disabled={loading}
            onClick={dataItem && isDetail === true ? editItem : handleOk}
          >
            {dataItem ? "S???a" : "L??u"}
          </Button>
          <Button
            disabled={loading}
            size="Large"
            color="error"
            variant="contained"
            style={{
              paddingLeft: "15%",
              paddingRight: "15%",
              paddingTop: "2%",
              paddingBottom: "2%",
              color: "#fff",
            }}
            onClick={dataItem && isDetail === true ? deleteItem : handleClose}
          >
            {dataItem && isDetail === true ? "Xo?? " : "H???y"}
          </Button>
        </div>
      </Form>
      <AlertDialog
        children={`X??c nh???n xo?? ${dataItem ? dataItem.name : null} ?`}
        title="Xo?? nh??m m??n"
        onAccept={handleDelete}
      />
    </div>
  );
};
export default ModalContent;
