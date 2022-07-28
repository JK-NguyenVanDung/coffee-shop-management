import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  p: 4,
};
export default function Loading(props) {
  return (
    <Modal
      open={props.loading}
      //   onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CircularProgress />
      </Box>
    </Modal>
  );
}
