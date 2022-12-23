import axios from "axios";
import * as types from "./actionType";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USER,
});

const userAdded = () => ({
  type: types.ADD_USER,
});

const getUser = (user) => ({
  type: types.GET_SINGLE_USER,
  payload: user,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:5000/user")
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getUsers(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUsers = (id) => {
  return function (dispatch) {
    axios
      .delete(`http://localhost:5000/user/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/user`, user)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(userAdded());
      })
      .catch((error) => console.log(error));
  };
};

export const getSingleUsers = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getUser(resp));
      })
      .catch((error) => console.log(error));
  };
};
