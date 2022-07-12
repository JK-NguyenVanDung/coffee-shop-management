import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material/";

import CancelIcon from "@mui/icons-material/Cancel";

export const RemoveButton = (props = { size: "medium", action: null }) => {
  return (
    <div>
      <IconButton color="info" aria-label="add an alarm" onClick={props.action}>
        <CancelIcon fontSize={props.size} style={{ zIndex: 10 }} />
      </IconButton>
    </div>
  );
};
