import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../hook/useRedux";
import { actions } from "../redux";

const AlertDialog = (props) => {
  const dispatch = useAppDispatch();
  const openDialog = useAppSelector((state) => state.form.delete);

  const handleClose = () => {
    dispatch(actions.formActions.hideDelete());
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onAccept} color="primary" autoFocus>
            Xác nhận
          </Button>
          <Button onClick={handleClose} color="error">
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AlertDialog;
