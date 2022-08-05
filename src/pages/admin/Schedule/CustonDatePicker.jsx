import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import {
  Input,
  Table,
  Form,
  Popconfirm,
  Upload,
  message,
  Tooltip,
  Typography,
} from "antd";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

import { menuText } from "../../../helper/Text";

import FormModal from "../../../components/FormElements/FormModal";
import * as collections from "../../../api/Collections/schedule";

import * as employeesCollections from "../../../api/Collections/employees";
import { GIRD12 } from "../../../helper/constant";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import SearchTable from "../../../components/Table/SearchTable";
import ModalContent from "./Modal";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { colors } from "../../../helper/Color";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";

import format from "date-fns/format";
import addDays from "date-fns/addDays";
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

export const CustomDay = ({ isModal }) => {
  const [value, setValue] = React.useState(new Date());
  const [date, setDate] = useState("");
  const start = startOfWeek(value, {
    weekStartsOn: 1,
  });
  const end = endOfWeek(value, {
    weekStartsOn: 1,
  });
  const dispatch = useAppDispatch();

  function setDateFromPicker() {
    let date = `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`;
    setDate(date);
  }

  useEffect(() => {
    if (value) {
      if (isModal) {
        dispatch(actions.scheduleActions.setModalCurrent(value.toDateString()));
        dispatch(actions.scheduleActions.setModalStart(start.toDateString()));
        dispatch(actions.scheduleActions.setModalLast(end.toDateString()));
      } else {
        dispatch(actions.scheduleActions.setCurrent(value.toDateString()));
        dispatch(actions.scheduleActions.setStart(start.toDateString()));
        dispatch(actions.scheduleActions.setLast(end.toDateString()));
      }
    }
  }, [value]);
  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value, {
      weekStartsOn: 1,
    });
    const end = endOfWeek(value, {
      weekStartsOn: 1,
    });

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        displayStaticWrapperAs="desktop"
        label="Chọn tuần"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setDateFromPicker();
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ width: "100%" }}
            size="small"
            disabled
          />
        )}
        inputFormat="'Tuần của' dd/MM/yyyy"
      />
    </LocalizationProvider>
  );
};
