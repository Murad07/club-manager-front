import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiOutlinedInput-input": {
      padding: "10px",
    },
  },
  marginAll: {
    marginBottom: theme.spacing(2),
  },
  textFieldInput: {
    width: "300px",
    textAlign: "left",
    paddingLeft: "10px",
  },
  textFieldSmall: {
    width: "221px",
    textAlign: "left",
    paddingLeft: "10px",
  },
  uploadField: {
    position: "relative",
    display: "inline-flex",
    background: "#ffffff",
  },
  btnUpload: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 5,
    textTransform: "none",
    padding: "9px 35px",
    backgroundColor: "#F74836",
  },
  addBtn: {
    borderRadius: 5,
    textTransform: "none",
    padding: "9px 25px",
    backgroundColor: "#F74836",
    marginTop: "15px",
  },
  hoverBtn: {
    "&:hover": {
      backgroundColor: "#DC0C02",
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "10px 0",
  },
}));

const AddMemberForm = (props) => {
  const classes = useStyles();
  const {
    values: { name, age, contact, gender },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched,
    setFieldValue,
    isSubmitting,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <div>
        <TextField
          InputProps={{
            classes: {
              root: classes.textFieldInput,
            },
          }}
          variant="outlined"
          id="name"
          name="name"
          helperText={touched.name ? errors.name : ""}
          error={errors.name && Boolean(errors.name)}
          label="Name"
          size="small"
          value={name || ""}
          onChange={change.bind(null, "name")}
          className={classes.marginAll}
        />
        <TextField
          InputProps={{
            classes: {
              root: classes.textFieldInput,
            },
          }}
          variant="outlined"
          id="age"
          name="age"
          type="number"
          label="Age"
          size="small"
          value={age || ""}
          onChange={change.bind(null, "age")}
          className={classes.marginAll}
        />
      </div>

      <Button
        type="submit"
        size="small"
        variant="contained"
        color="primary"
        className={`${classes.marginAll} ${classes.addBtn} ${classes.hoverBtn}`}
        // disabled={!isValid || isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddMemberForm;
