import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Switch, Input, Button } from "antd";
import { Modal, Box } from "@mui/material/";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "auto",
  overlay: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  mt: 3,
  p: 4,
};

const FormModal = ({ children }) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.form.show);

  const handleClose = () => dispatch(actions.formActions.closeForm());

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  );
};

export default FormModal;
