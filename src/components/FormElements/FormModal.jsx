import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Switch, Input, Button } from "antd";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const FormModal = (children) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="employeesTitleAdd"
        aria-describedby="employeesContAdd"
      >
        <Box sx={{ style }}>{children}</Box>
      </Modal>
    </>
  );
};

export default FormModal;
