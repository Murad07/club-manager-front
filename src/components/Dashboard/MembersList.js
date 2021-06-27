import React from "react";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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

const muiTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      head: {
        paddingTop: "36px",
      },
    },
  },
});

// Data Table Columns Format
const columns = [
  {
    name: "name",
    label: "Name",
  },
  {
    name: "_id",
    label: "Id",
    sortable: false,
  },
];

export default function MembersList() {
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
  const handleEdit = (pId) => {
    // history.push("/admin/edit-product/" + pId);
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
    <MuiThemeProvider theme={muiTheme}>
      {!loading && (
        <ReactMUIDatatable
          title={"Members list"}
          data={members}
          columns={columns}
          selectable={false}
          rowActions={({ row, rowIndex }) => (
            <React.Fragment>
              <IconButton onClick={() => handleEdit(row._id)}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => handleDelete(row._id)}>
                <DeleteOutline />
              </IconButton>
            </React.Fragment>
          )}
        />
      )}
      <ToastContainer autoClose={1000} />
    </MuiThemeProvider>
  );
}
