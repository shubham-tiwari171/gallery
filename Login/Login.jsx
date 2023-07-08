import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import { useFormik } from "formik";
import { signUpSignInSchema } from "../../../schemas";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getAllUser } from "../../../api/apiEndpoint";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, login } from "../../../redux/reducers/reducers";
import { useDispatch } from "react-redux";
const Login = () => {
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    severity: "warning",
  });
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signUpSignInSchema,
  });

  const containerStyle = {
    backgroundImage: `url("./loading.gif")`,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const users = await getAllUser();
      setAllUsers(users);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
    setSnackbarMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isUserExist = allUsers.find(
      (existedUser) =>
        existedUser.email === values.email &&
        existedUser.password === values.password
    );

    if (isUserExist) {
      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "success",
      }));
      setSnackbarMessage("Login successful!");
      setIsLoading(true);
      setTimeout(() => {
        dispatch(login());
        dispatch(setUser(isUserExist));
        navigate("/");
      }, 5000);
    } else {
      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
      }));
      setSnackbarMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={3000}
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
      <div className={`container ${isLoading ? "loading" : ""}`}>
        {isLoading ? (
          <div className="loading-gif-container">
            <img src="./loading.gif" alt="Loading" className="loading-gif" />
          </div>
        ) : (
          <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="card shadow-2-strong card-registration">
                    <div className="card-body" style={{ width: "450px" }}>
                      <h2 className="mb-4">Login</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col">
                            <div className="form-outline">
                              <TextField
                                error={
                                  errors.email && touched.email ? true : false
                                }
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
                                  errors.email && touched.email
                                    ? errors.email
                                    : ""
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col d-flex align-items-center">
                            <div className="form-outline datepicker w-100">
                              <TextField
                                error={
                                  errors.password && touched.password
                                    ? true
                                    : false
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
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 d-flex justify-content-around align-items-center">
                          <p>
                            Don't have an account?{" "}
                            <Link to="/register">Sign up</Link>
                          </p>
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                            style={{ marginTop: "-13px" }}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Login;
