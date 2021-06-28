import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import API from "../../api";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { setMembers } from "../../redux/actions/memberActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function MembersList() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const members = useSelector((state) => state.allMembers.members);
  const dispatch = useDispatch();
  console.log("m : " + JSON.stringify(members));

  // Load members data by calling API at the startin of app and on delete
  React.useEffect(() => {
    isDelete && setIsDelete(false);
    setLoading(true);
    API.get(`members`).then((response) => {
      console.log("p at d :" + JSON.stringify(response));
      dispatch(setMembers(response.data));
      setLoading(false);
    });
  }, [isDelete]);

  // Update member info and send to backend API
  const handleEdit = (mId) => {
    history.push("/edit-member/" + mId);
  };

  // Delete a member from database
  const handleDelete = (myId) => {
    console.log("is del : " + myId);
    API.delete("members/" + myId)
      .then((res) => {
        toast.success("Deleted Successfully");
        setIsDelete(true);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {members.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="Left">
                <Avatar
                  style={{
                    border: "1px solid lightgray",
                    width: "40px",
                    height: "40px",
                  }}
                  // alt={members.name}
                  src={row.profilePic}
                />
              </TableCell>
              <TableCell align="Left">{row.name}</TableCell>
              <TableCell align="Left">{row.age}</TableCell>
              <TableCell align="Left">{row.contact}</TableCell>
              <TableCell align="Left">{row.address}</TableCell>
              <TableCell align="Left">
                <IconButton onClick={() => handleEdit(row._id)}>
                  <EditOutlined />
                </IconButton>
                <IconButton onClick={() => handleDelete(row._id)}>
                  <DeleteOutline />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ToastContainer autoClose={2000} />
    </TableContainer>
  );
}
