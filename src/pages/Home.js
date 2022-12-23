import React, { useEffect } from "react";
// import { styled } from "@mui/material/styles";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, loadUsers } from "../redux/action";
import { Button, ButtonGroup } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const useStyle = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 800,
  },
});

const Home = () => {
  const classes = useStyle();
  const buttonStyles = useButtonStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { users } = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are You sure wanted to delete the user ?")) {
      dispatch(deleteUsers(id));
    }
  };
  return (
    <div>
      <div className={buttonStyles.root}>
        <Link to="/addUser">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Create User
          </Button>
        </Link>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          Add User
        </Button> */}
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>FirstName</StyledTableCell>
              <StyledTableCell>LastName</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">DOB</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    {user.firstname}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.lastname}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.contact}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.dateOfBirth}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {user.gender}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className={buttonStyles.root}>
                      <ButtonGroup
                        variant="contained"
                        aria-label="contained primary button group"
                      >
                        <Button
                          style={{ marginRight: "5px" }}
                          color="secondary"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => history.push(`/editUser/${user.id}`)}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
