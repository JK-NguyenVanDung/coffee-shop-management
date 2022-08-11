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
  width: "60%",
  height: "auto",
  // overlay: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  zIndex: 1,
  mt: 3,
  p: 4,
};

const FormModal = (props) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) =>
    !props.type ? state.form.show : state.form.secondForm
  );
  const enabled = useAppSelector((state) => state.form.enabled);

  const handleClose = () =>
    dispatch(
      !props.type
        ? actions.formActions.closeForm()
        : actions.formActions.closeSecondForm()
    );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        bodyStyle={!enabled && { overflowY: "inherit", maxHeight: "90vh" }}
      >
        <Box sx={[style, props.style ? props.style : null]}>
          {props.children}
        </Box>
      </Modal>
    </>
  );
};

export default FormModal;
