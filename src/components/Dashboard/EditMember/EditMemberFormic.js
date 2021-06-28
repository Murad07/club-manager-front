import React from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import API from "../../../api";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import EditMemberForm from "./EditMemberForm";
import { useHistory, useParams } from "react-router-dom";

const useStyles = (theme) => ({
  paper: {
    margin: "auto",
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    maxWidth: 960,
    maxHeight: 2200,
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  topLabel: {
    width: "100%",
    height: "40px",
    background: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const EditMemberFormic = (props) => {
  const history = useHistory();
  const { mId } = useParams();
  const [member, setMember] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    API.get(`members/${mId}`).then((res) => {
      console.log("one m: " + JSON.stringify(res));
      setMember(res.data);
      setIsLoading(true);
    });
  }, []);

  const submit = (data) => {
    console.log("on Submit: " + JSON.stringify(data));
    let memberInfo = {
      name: data.name,
      contact: data.contact,
      address: data.address,
      age: data.age,
      profilePic: data.profilePic,
    };

    API.patch("members/" + mId, memberInfo)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Member Updated Successfuly");
          setTimeout(() => {
            history.push("/");
          }, 2100);
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .catch(function (error) {
        console.log("e :" + error);
      });
  }; // end submit function

  const validationSchema = Yup.object({
    name: Yup.string("Enter Member Name").required("Member name is required"),
  });

  const values = {
    name: member.name,
    contact: member.contact,
    address: member.address,
    age: member.age,
    profilePic: member.profilePic,
  };

  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.flexContainer}>
        <div className={classes.topLabel}>
          <Typography variant="body1" style={{ color: "gray" }}>
            Edit Member Info
          </Typography>{" "}
        </div>
        <div className={classes.rightTopHalfCircle}> </div>
      </div>

      {isLoading ? (
        <Formik
          enableReinitialize
          render={(props) => <EditMemberForm {...props} />}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={submit}
        />
      ) : (
        "Loading.."
      )}

      <ToastContainer autoClose={2000} />
    </Paper>
  );
};

export default withStyles(useStyles)(EditMemberFormic);
