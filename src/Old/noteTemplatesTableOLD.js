import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { lightBlue } from "@material-ui/core/colors";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SOAPTemplate from "../Documentation/noteTemplateSOAP";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: lightBlue[400],
    color: theme.palette.common.white,
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

// not needed for new file
function createData(template, visibleToTherapist, dateCreated) {
  return { template, visibleToTherapist, dateCreated };
}

const rows = [
  createData("SOAP Note", "Yes", "1/2/17"),
  createData("Narrative", "Yes", "1/2/17"),
  createData("Rating Scale +", "Yes", "1/2/17"),
  createData("Template 4", "No", "1/2/17"),
  createData("Template 5", "No", "1/2/17")
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: "template", label: "Template" },
  { id: "visibleToTherapist", label: "Visible to Therpaist" },
  { id: "dateCreated", label: "Date Created" }
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Select all desserts" }}
          />
        </StyledTableCell>
        {headRows.map(row => (
          <StyledTableCell
            key={row.id}
            align="left"
            //align={row.numeric ? 'right' : 'left'}
            // padding={'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },

  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  //const { numSelected } = props;

  return <div className={classes.spacer} />;
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  // table positioning
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  state: {
    open: false,
    openV: false
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    //width: 400
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 198
  },
  textField3: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "60%"
  },

  root: {
    marginTop: theme.spacing(10)
  },
  letter: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(5)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.template);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, template) {
    const selectedIndex = selected.indexOf(template);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, template);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const isSelected = template => selected.indexOf(template) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"

            //size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.template);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.template}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                          onClick={event => handleClick(event, row.template)}
                        />
                      </StyledTableCell>
                      <TableCell
                        onClick={handleClickOpen}
                        align="left"
                        id={labelId}
                      >
                        {row.template}
                      </TableCell>
                      <TableCell align="left">
                        {row.visibleToTherapist}
                      </TableCell>
                      <TableCell align="left">{row.dateCreated}</TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Note Template Builder
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="row">
          <Typography variant="h5" className={classes.letter}>
            S
          </Typography>
          <TextField
            id="standard-full-width"
            //label="S"
            //style={{ margin: 8 }}
            className={classes.textField3}
            //placeholder="Add notes here"
            //fullWidth
            variant="outlined"
            multiline
            rows="2"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid container direction="row">
          <Typography variant="h5" className={classes.letter}>
            O
          </Typography>
          <TextField
            id="standard-full-width"
            //label="O"
            //style={{ margin: 8 }}
            className={classes.textField3}
            //placeholder="Add notes here"
            //fullWidth
            variant="outlined"
            multiline
            rows="2"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid container direction="row">
          <Typography variant="h5" className={classes.letter}>
            A
          </Typography>
          <TextField
            id="standard-full-width"
            //label="A"
            //style={{ margin: 8 }}
            className={classes.textField3}
            //placeholder="Add notes here"
            //fullWidth
            variant="outlined"
            multiline
            rows="2"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid container direction="row">
          <Typography variant="h5" className={classes.letter}>
            P
          </Typography>
          <TextField
            id="standard-full-width"
            //label="P"
            //style={{ margin: 8 }}
            className={classes.textField3}
            //placeholder="Add notes here"
            //fullWidth
            variant="outlined"
            multiline
            rows="2"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Dialog>
    </div>
  );
}