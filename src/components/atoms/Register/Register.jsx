import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./Register.css";
import { useFormik } from "formik";
import { signUpSignInSchema } from "../../../schemas";
import { createUser, getAllUser } from "../../../api/apiEndpoint";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
const Register = () => {
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    severity: "warning",
  });
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [createButtonDisabled, setCreateButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUser();
      setAllUsers(users);
    };

    fetchUsers();
  }, []);

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      gender: "",
    },
    validationSchema: signUpSignInSchema,
    // onSubmit: (values, action) => {
    //   console.log(
    //     "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
    //     values
    //   );
    // },
  });
  useEffect(() => {
    setCreateButtonDisabled(Object.keys(errors).length > 0);
  }, [errors]);

  const handleSnackbarClose = () => {
    setOpenSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
    setSnackbarMessage("");
  };

  const handleSubmit = async (event) => {
    // for preventing the for to reload
    event.preventDefault();

    // creating user data
    let user = {
      id: uuidv4(),
      ...values,
      board: [],
    };

    // checking the user already exists or not
    let isUserExist = allUsers.some(
      (existedUser) =>
        existedUser.userName === user.userName &&
        existedUser.email === user.email
    );

    // giving message that user allready exit in snack bar
    if (isUserExist) {
      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "warning",
      }));
      setSnackbarMessage(
        "User with the same username and email already exists."
      );
      return;
    }

    // all validation done then creating user and saving it ito data base and displaying message
    let res = await createUser(user);

    setOpenSnackbar((prevState) => ({
      ...prevState,
      open: true,
      severity: "success",
    }));

    if (res.status === 201 && user) {
      setSnackbarMessage("User registered successfully!");
    } else {
      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "danger",
      }));
      setSnackbarMessage("An error occurred during user registration.");
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: openSnackbar.vertical,
          horizontal: openSnackbar.horizontal,
        }}
        key={openSnackbar.vertical + openSnackbar.horizontal}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={openSnackbar.severity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body">
                  <h2 className="mb-4">Create your account</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <TextField
                            error={
                              errors.userName && touched.userName ? true : false
                            }
                            label="UserName"
                            name="userName"
                            margin="normal"
                            type=""
                            required
                            fullWidth
                            value={values.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.userName && touched.userName
                                ? errors.userName
                                : ""
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <TextField
                            error={errors.email && touched.email ? true : false}
                            label="Email"
                            name="email"
                            margin="normal"
                            type=""
                            required
                            fullWidth
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.email && touched.email ? errors.email : ""
                            }
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            error={
                              errors.password && touched.password ? true : false
                            }
                            label="Password"
                            name="password"
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.password && touched.password
                                ? errors.password
                                : ""
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            error={
                              errors.confirmPassword && touched.confirmPassword
                                ? true
                                : false
                            }
                            label="Confirm password"
                            name="confirmPassword"
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.confirmPassword && touched.confirmPassword
                                ? errors.confirmPassword
                                : ""
                            }
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            error={
                              errors.mobile && touched.mobile ? true : false
                            }
                            label="Mobile no"
                            name="mobile"
                            margin="normal"
                            type=""
                            required
                            fullWidth
                            value={values.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              errors.mobile && touched.mobile
                                ? errors.mobile
                                : ""
                            }
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mt-3">
                        <FormControl>
                          <FormLabel
                            id="demo-row-radio-buttons-group-label"
                            className="d-flex justify-content-start"
                          >
                            Gender
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <FormControlLabel
                              control={<Radio />}
                              label="Female"
                              value="female"
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="Male"
                              value="male"
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="Other"
                              value="others"
                            />
                          </RadioGroup>
                        </FormControl>{" "}
                      </div>
                    </div>
                    <div className="mt-4 pt-2">
                      <button
                        disabled={createButtonDisabled}
                        className="btn btn-primary btn-lg"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
