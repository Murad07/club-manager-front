import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 5,
      },
    },
  },
})(TextField);

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
    backgroundColor: "#138D75",
    marginTop: "7px",
  },
  addBtn: {
    borderRadius: 5,
    textTransform: "none",
    padding: "9px 25px",
    backgroundColor: "#138D75",
    marginTop: "15px",
  },
  hoverBtn: {
    "&:hover": {
      backgroundColor: "#0E6655",
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: "10px 0",
  },
}));

const EditMemberForm = (props) => {
  const classes = useStyles();
  const {
    values: { name, age, contact, gender, profilePic, address },
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

  const [fileInfo, setFileInfo] = React.useState(profilePic);

  // Handle Image Upload
  const hiddenProfilePicFileInput = React.useRef(null);

  const handleUploadProfilePic = (event) => {
    hiddenProfilePicFileInput.current.click();
  };

  const uploadImage = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setFileInfo(reader.result);
      setFieldValue("profilePic", reader.result);
    };
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

      <div>
        <TextField
          InputProps={{
            classes: {
              root: classes.textFieldInput,
            },
          }}
          variant="outlined"
          id="address"
          name="address"
          label="Address"
          size="small"
          value={address || ""}
          onChange={change.bind(null, "address")}
          className={classes.marginAll}
        />
        <TextField
          InputProps={{
            classes: {
              root: classes.textFieldInput,
            },
          }}
          variant="outlined"
          id="contact"
          name="contact"
          // type="number"
          label="Phone"
          size="small"
          value={contact || ""}
          onChange={change.bind(null, "contact")}
          className={classes.marginAll}
        />
      </div>

      <div className={classes.uploadField}>
        <CustomTextField
          InputProps={{
            classes: {
              root: classes.textFieldInput,
            },
          }}
          disabled
          variant="outlined"
          name="UploadProfilePic"
          size="small"
          value="Select Picture"
        />
        <input
          type="file"
          ref={hiddenProfilePicFileInput}
          onChange={uploadImage}
          style={{ display: "none" }}
        />
        <Button
          onClick={handleUploadProfilePic}
          size="small"
          variant="contained"
          color="primary"
          className={`${classes.btnUpload} ${classes.hoverBtn}`}
        >
          Choose
        </Button>
      </div>

      <div className="text-center">
        {fileInfo && (
          <Avatar
            style={{
              border: "1px solid lightgray",
              width: "100px",
              height: "100px",
            }}
            alt={name}
            src={fileInfo}
          />
        )}
      </div>

      <Button
        type="submit"
        size="small"
        variant="contained"
        color="primary"
        className={`${classes.marginAll} ${classes.addBtn} ${classes.hoverBtn}`}
        // disabled={!isValid || isSubmitting}
      >
        Update
      </Button>
    </form>
  );
};

export default EditMemberForm;
