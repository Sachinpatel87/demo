import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/action";
import { DateTime } from "luxon";
import MultiImageInput from "react-multiple-image-input";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    buttonProgress: {
      color: "#fff",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  },
}));
const AddUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");
  const { firstname, lastname, email, contact, address, gender, dateOfBirth } =
    state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !address || !contact) {
      setError("Please input all input Field");
    } else {
      dispatch(addUser(state));
      history.push("/");
      setError("");
    }
  };
  const crop = {
    unit: "%",
    aspect: 4 / 3,
    width: "100",
  };
  const [images, setImages] = useState({});
  return (
    <div>
      <Button
        style={{ width: "100px", marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => history.push("/")}
      >
        Go Back
      </Button>
      <h1 style={{ textAlign: "center" }}>Create User</h1>
      {error && <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="FirstName"
          value={firstname}
          name="firstname"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="LastName"
          value={lastname}
          name="lastname"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          value={email}
          name="email"
          type="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Contact"
          value={contact}
          name="contact"
          type="number"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Address"
          value={address}
          name="address"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <div className="form-group">
          <label className="control-label col-md-3">Gender</label>
          <div className="col-md-9">
            <div className="radio-list">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
                  checked={gender === "male"}
                />
                Male
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInputChange}
                  checked={gender === "female"}
                />
                Female
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className="form-group">
          <label className="control-label col-md-3">
            Birth Date
            <span className="required" aria-required="true">
              *
            </span>
          </label>
          <div className="col-md-9">
            <input
              type="date"
              name="dateOfBirth"
              className="form-control date-picker"
              placeholder="Date of Birth"
              onChange={handleInputChange}
              value={DateTime.fromISO(dateOfBirth).toFormat("yyyy-MM-dd")}
              required
            />
          </div>
        </div>
        <br />

        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Add User
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
