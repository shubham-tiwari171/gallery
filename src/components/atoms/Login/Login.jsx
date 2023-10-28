import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Login.css";
import { useFormik } from "formik";
import { signUpSignInSchema } from "../../../schemas";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { setUser, login } from "../../../redux/reducers/reducers";
import { useDispatch } from "react-redux";
import GoogleButton from "react-google-button";
import { v4 as uuidv4 } from "uuid";
import {
  signInWithGoogle,
  signInSchema,
  getUserLoggedIn,
  getUserByUserName,
  getUserByEmail,
  addUser,
  updateUser,
} from "../../../context/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Loading from "../Loading/Loading";

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
      userName: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
    },
    validationSchema: signUpSignInSchema,
  });

  const handleSnackbarClose = () => {
    setOpenSnackbar((prevState) => ({
      ...prevState,
      open: false,
    }));
    setSnackbarMessage("");
  };

  const handleVarifiedUser = (token, user) => {
    try {
      if (
        token.accessToken !== null &&
        token.accessToken !== undefined &&
        token.accessToken !== ""
      ) {
        setIsLoading(false);
        setOpenSnackbar((prevState) => ({
          ...prevState,
          open: true,
          severity: "success",
        }));
        setSnackbarMessage("Login successfull!");
        // setIsLoading(true);
        // setTimeout(() => {
        dispatch(setUser(user));
        navigate("/");
        // }, 3000);
      }
    } catch (err) {
      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
      }));
      setSnackbarMessage("Invalid email or password. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let token = await signInSchema(values.email, values.password);
    let user = await getUserLoggedIn(token.email);
    handleVarifiedUser(token, user);
  };

  const googleSignIn = async () => {
    try {
      const googleSignInData = await signInWithGoogle();

      if (googleSignInData) {
        const providerData = googleSignInData.providerData[0];

        // Check if the user already exists by email or username
        const userNameExists = await getUserByUserName(
          providerData.displayName
        );
        const userEmailExists = await getUserByEmail(providerData.email);

        if (userNameExists.empty && userEmailExists.empty) {
          var user = {
            uid: uuidv4(),
            userName: providerData.displayName,
            email: providerData.email,
            mobile: providerData.phoneNumber,
            profileImage: providerData.photoURL,
            authenticatedUserUid: googleSignInData.uid,
            boards: [],
          };
          const docRef = await addUser(user);
          user.documentId = docRef.id;
          handleVarifiedUser(googleSignInData, user);
          await updateUser(user.documentId, user);
        } else {
          handleVarifiedUser(googleSignInData, user);
        }
      } else {
        console.error("Google sign-in data is undefined.");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
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
          // <div className="loading-gif-container">
          //   <img src="./loading.gif" alt="Loading" className="loading-gif" />
          // </div>
          <Loading />
        ) : (
          <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
              <div className="row justify-content-center align-items-center h-100">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="card" style={{ width: "675px" }}>
                    <div className="card-body">
                      <h4 className="mb-4">Sign in to your account</h4>
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

                        <div className="bottom-sign-in-area">
                          <p>
                            Don't have an account?{" "}
                            <Link to="/register">Sign up</Link>
                          </p>
                          <div className="bottom-sign-in-area-button">
                            <GoogleButton
                              className="google-button"
                              onClick={googleSignIn}
                            />
                            <button
                              className="btn btn-primary btn-lg login-button"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
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
