import * as React from "react";

// import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ResponsiveDateTimePickers(props) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        inputFormat="YYYY-MM-DD"
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: props.placeholder,
            }}
            sx={props.margin}
            fullWidth
          />
        )}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        height="33px"
      />
    </LocalizationProvider>
  );
}
