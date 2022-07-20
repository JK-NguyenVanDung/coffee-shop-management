import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Switch, Input, Button } from "antd";
import { Modal, Box, Alert } from "@mui/material/";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "auto",
  overlay: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  zIndex: 1,
  mt: 3,
  p: 4,
};

const AlertModal = ({ chilren }) => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.form.modalError);
  function handleClose() {
    dispatch(actions.formActions.hideError());
  }
  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        bodyStyle={!show && { overflowY: "inherit", maxHeight: "90vh" }}
      >
        <Alert severity="error" onClose={handleClose} sx={style}>
          {chilren}
        </Alert>
      </Modal>
    </>
  );
};

export default AlertModal;
