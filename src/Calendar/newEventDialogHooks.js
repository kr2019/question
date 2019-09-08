import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";

import axios from "axios";

const billTypes = [
  {
    value: "Billable",
    label: "Billable"
  },

  {
    value: "Non-billable",
    label: "Non-billable"
  }
];

const clientTypes = [
  {
    value: "Individual",
    label: "Individual"
  },

  {
    value: "Facility",
    label: "Facility"
  }
];

const clients = [
  {
    value: "John Smith",
    label: "John Smith"
  },

  {
    value: "Jill Smith",
    label: "Jill Smith"
  },
  {
    value: "Ashley Flowers",
    label: "Ashley Flowers"
  }
];

const therapists = [
  {
    value: "Therapist 1",
    label: "Therapist 1"
  },

  {
    value: "Harry Potter",
    label: "Harry Potter"
  },
  {
    value: "Therapist 3",
    label: "Therapist 3"
  }
];

const categories = [
  {
    value: "None",
    label: "None"
  }
];

const repeatOptions = [
  {
    value: "Daily",
    label: "Daily"
  },

  {
    value: "Weekly",
    label: "Weekly"
  },
  {
    value: "Monthly",
    label: "Monthly"
  },
  {
    value: "Custom",
    label: "Custom"
  }
];

const repeatEndOptions = [
  {
    value: "Never",
    label: "Never"
  },

  {
    value: "After",
    label: "After"
  },
  {
    value: "On Date",
    label: "On Date"
  }
];

const customFreqOptions = [
  {
    value: "Daily",
    label: "Daily"
  },

  {
    value: "Weekly",
    label: "Weekly"
  },
  {
    value: "Monthly",
    label: "Monthly"
  }
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 192
  },
  rootCustWeekDay: {
    display: "flex"
  },
  formControlCustWeekDay: {
    margin: theme.spacing()
  }
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    newBillType: "",
    newClientType: "",
    newClient: "",
    newTherapist: "",
    newDateStart: "",
    newTimeStart: "",
    newDateEnd: "",
    newTimeEnd: "",
    newLocation: "",
    newCategory: "",
    newRepeat: "",
    endNewRepeat: "",
    newNumOccurrences: "",
    newCustomFreq: "",
    newEveryNumDays: "",
    newEveryNumWeeks: "",
    newEveryNumMonths: ""
  });

  const [state, setState] = React.useState({
    checkedRepeat: true,
    sun: false,
    mon: false,
    tues: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false
  });

  // The first commit of Material-UI
  const [selectedDateStart, setSelectedDateStart] = React.useState(
    new Date("2019-04-01T21:11:54")
  );

  const [selectedDateEnd, setSelectedDateEnd] = React.useState(
    new Date("2019-04-01T21:11:54")
  );

  const [selectedTimeStart, setSelectedTimeStart] = React.useState(
    new Date("2019-04-01T15:11:54")
  );
  const [selectedTimeEnd, setSelectedTimeEnd] = React.useState(
    new Date("2019-05-01T21:11:54")
  );

  const [
    selectedDateOccurenceEnd,
    setSelectedDateOccurenceEnd
  ] = React.useState(new Date("2019-05-01T21:11:54"));

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeRepeat = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCustomFreq = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeEndRepeat = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeCheckBox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  function handleDateChangeStart(date) {
    setSelectedDateStart(date);
  }

  function handleDateChangeEnd(date) {
    setSelectedDateEnd(date);
  }

  function handleTimeChangeStart(date) {
    setSelectedTimeStart(date);
  }

  function handleTimeChangeEnd(date) {
    setSelectedTimeEnd(date);
  }

  function handleDateOccurenceChange(date) {
    setSelectedDateOccurenceEnd(date);
  }

  const handleChangeCustWeekDay = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { mon, tues, wed, thu, fri, sat, sun } = state;

  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      <TextField
        required
        id="standard-select-client"
        select
        label="Bill Type"
        variant="outlined"
        margin="normal"
        className={classes.textField}
        value={values.newBillType}
        onChange={handleChange("newBillType")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
      >
        {billTypes.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        id="standard-select-client"
        select
        label="Client Type"
        variant="outlined"
        margin="normal"
        className={classes.textField}
        value={values.newClientType}
        onChange={handleChange("newClientType")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
      >
        {clientTypes.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        id="standard-select-client"
        select
        label="Client"
        variant="outlined"
        margin="normal"
        className={classes.textField}
        value={values.newClient}
        onChange={handleChange("newClient")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
      >
        {clients.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        required
        id="standard-select-client"
        select
        label="Therapist"
        variant="outlined"
        margin="normal"
        className={classes.textField}
        value={values.newTherapist}
        onChange={handleChange("newTherapist")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
      >
        {therapists.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Grid direction="row">
        <TextField
          id="standard-newLocation"
          label="Location"
          variant="outlined"
          className={classes.textField2}
          value={values.newLocation}
          onChange={handleChange("newLocation")}
          margin="normal"
        />
        <TextField
          id="standard-select-client"
          select
          label="Category"
          variant="outlined"
          margin="normal"
          className={classes.textField2}
          value={values.newCategory}
          onChange={handleChange("newCategory")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid direction="row">
          <DatePicker
            inputVariant="outlined"
            className={classes.textField2}
            margin="normal"
            id="mui-pickers-date"
            label="Start Date"
            value={selectedDateStart}
            onChange={handleDateChangeStart}
          />
          <TimePicker
            inputVariant="outlined"
            className={classes.textField2}
            margin="normal"
            id="mui-pickers-time"
            label="Start Time"
            value={selectedTimeStart}
            onChange={handleTimeChangeStart}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid direction="row">
          <DatePicker
            inputVariant="outlined"
            margin="normal"
            className={classes.textField2}
            id="mui-pickers-date"
            label="End Date"
            value={selectedDateEnd}
            onChange={handleDateChangeEnd}
          />
          <TimePicker
            inputVariant="outlined"
            className={classes.textField2}
            margin="normal"
            id="mui-pickers-time"
            label="End Time"
            value={selectedTimeEnd}
            onChange={handleTimeChangeEnd}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedRepeat}
              onChange={handleChangeCheckBox("checkedRepeat")}
              value="checkedRepeat"
              color="primary"
            />
          }
          label="Repeat"
        />
      </FormGroup>
      <Grid direction="row">
        <TextField
          id="standard-select-client"
          select
          label="Repeats"
          variant="outlined"
          margin="normal"
          className={classes.textField}
          value={values.newRepeat}
          onChange={handleChangeRepeat("newRepeat")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
        >
          {repeatOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid direction="row">
        <TextField
          id="standard-select-client"
          select
          label="End Repeat"
          variant="outlined"
          margin="normal"
          className={classes.textField2}
          value={values.newEndRepeat}
          onChange={handleChangeEndRepeat("newEndRepeat")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
        >
          {repeatEndOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-newNumOccurences"
          label="Occurences"
          variant="outlined"
          className={classes.textField2}
          value={values.newNumOccurences}
          onChange={handleChange("newNumOccurrences")}
          margin="normal"
        />
      </Grid>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid direction="row">
          <DatePicker
            inputVariant="outlined"
            className={classes.textField2}
            margin="normal"
            id="mui-pickers-date"
            label="End On"
            value={selectedDateOccurenceEnd}
            onChange={handleDateOccurenceChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <TextField
        id="standard-select-client"
        select
        label="Custom Frequency"
        variant="outlined"
        margin="normal"
        className={classes.textField}
        value={values.newCustomFreq}
        onChange={handleChangeCustomFreq("newCustomFreq")}
        SelectProps={{
          MenuProps: {
            className: classes.menu
          }
        }}
      >
        {customFreqOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="standard-newNumOccurences"
        label="Every Number of Days"
        variant="outlined"
        className={classes.textField2}
        value={values.newEveryNumDays}
        onChange={handleChange("newEveryNumDays")}
        margin="normal"
      />
      <TextField
        id="standard-newNumOccurences"
        label="Every Number of Weeks"
        variant="outlined"
        className={classes.textField2}
        value={values.newEveryNumWeeks}
        onChange={handleChange("newEveryNumWeeks")}
        margin="normal"
      />
      <FormControl
        component="fieldset"
        className={classes.formControlCustWeekDay}
      >
        <FormLabel component="legend">Every</FormLabel>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={sun}
                onChange={handleChangeCustWeekDay("sun")}
                value="sun"
              />
            }
            label="Su"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mon}
                onChange={handleChangeCustWeekDay("mon")}
                value="mon"
              />
            }
            label="M"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={tues}
                onChange={handleChangeCustWeekDay("tues")}
                value="tues"
              />
            }
            label="T"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={wed}
                onChange={handleChangeCustWeekDay("wed")}
                value="wed"
              />
            }
            label="W"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={thu}
                onChange={handleChangeCustWeekDay("thu")}
                value="thu"
              />
            }
            label="Th"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={fri}
                onChange={handleChangeCustWeekDay("fri")}
                value="fri"
              />
            }
            label="F"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sat}
                onChange={handleChangeCustWeekDay("sat")}
                value="sat"
              />
            }
            label="Sa"
          />
        </FormGroup>
      </FormControl>
      <TextField
        id="standard-newNumOccurences"
        label="Every Number of Months"
        variant="outlined"
        className={classes.textField2}
        value={values.newEveryNumMonths}
        onChange={handleChange("newEveryNumMonths")}
        margin="normal"
      />
    </Grid>
  );
}
