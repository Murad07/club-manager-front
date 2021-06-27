import React from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import API from "../../../api";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import AddMemberForm from "./AddMemberForm";
import { useHistory } from "react-router-dom";

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

const AddMemberFormic = (props) => {
  const history = useHistory();

  const submit = (data, { resetForm }) => {
    console.log("on Submit: " + JSON.stringify(data));
    let memberInfo = {
      name: data.name,
      //   contact: data.contact,
      //   gender: data.gender,
      age: data.age,
    };

    API.post("members", memberInfo)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          toast.success("Member Added Successfuly");
          resetForm({});
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
    name: "",
    // contact: "",
    // gender: "",
    age: "",
  };

  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.flexContainer}>
        <div className={classes.topLabel}>
          <Typography variant="body1" style={{ color: "gray" }}>
            Submit
          </Typography>{" "}
        </div>
        <div className={classes.rightTopHalfCircle}> </div>
      </div>

      <Formik
        render={(props) => <AddMemberForm {...props} />}
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={submit}
      />

      <ToastContainer autoClose={2000} />
    </Paper>
  );
};

export default withStyles(useStyles)(AddMemberFormic);
