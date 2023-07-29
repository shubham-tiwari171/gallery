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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  usersCollectionRef,
  getUserByUserName,
  getUserByEmail,
  addUser,
  updateUser,
} from "../../../context/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
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
  const nevigate = useNavigate();
  // const usersCollectionRef = collection(db, "users");
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const users = await getAllUser();
  //     setAllUsers(users);
  //   };

  //   fetchUsers();
  // }, []);

  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     try {
  //       const usersCollectionRef = collection(db, "users");
  //       const usersSnapshot = await getDocs(usersCollectionRef);
  //       usersSnapshot.forEach((doc) => {
  //         // Each doc represents a document in the "users" collection
  //         const userData = doc.data(); // Retrieve the data of the document
  //         console.log(userData);
  //       });
  //       console.log(usersSnapshot.data());
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getAllUsers();
  // }, []);

  const { values, errors, touched, handleBlur, handleChange, resetForm } =
    useFormik({
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
    // for preventing the form from reloading
    event.preventDefault();
    // console.log(
    //   "getUserByUserNameAndEmail():-",
    //   await getUserByUserNameAndEmail(values.userName, values.email)
    // );
    // creating user data
    let user = {
      uid: uuidv4(),
      ...values,
      profileImage: "./male_avatar.png",
      boards: [],
    };
    let userName = await getUserByUserName(values.userName);
    let userEmail = await getUserByEmail(values.userName);
    // checking if the user already exists
    // let isUserExist = allUsers.find(
    //   (existedUser) =>
    //     existedUser.userName === user.userName ||
    //     existedUser.email === user.email
    // );
    // console.log(user);
    // const usersCollectionRef = collection(db, "users");

    // const userNameQuery = query(
    //   usersCollectionRef,
    //   where("userName", "==", values.userName)
    // );
    // const userNameQuerySnapshot = await getDocs(userNameQuery);

    // // Check if a user with the same email exists
    // const emailQuery = query(
    //   usersCollectionRef,
    //   where("email", "==", values.email)
    // );
    try {
      // const emailQuerySnapshot = await getDocs(emailQuery);

      if (!userName.empty || !userEmail.empty) {
        setOpenSnackbar((prevState) => ({
          ...prevState,
          open: true,
          severity: "warning",
        }));
        setSnackbarMessage(
          "User with the same username or email already exists."
        );
        return;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle any errors that occurred during fetching
    }

    // giving message that user already exists in the snackbar
    // if (isUserExist) {
    //   setOpenSnackbar((prevState) => ({
    //     ...prevState,
    //     open: true,
    //     severity: "warning",
    //   }));
    //   setSnackbarMessage(
    //     "User with the same username and email already exists."
    //   );
    //   return;
    // }

    // all validation done then creating the user and saving it to the database and displaying a success message

    // if (res.status === 201 && user) {
    //   setOpenSnackbar((prevState) => ({
    //     ...prevState,
    //     open: true,
    //     severity: "success",
    //   }));
    //   setSnackbarMessage("User registered successfully!");
    //   resetForm();
    //   setTimeout(() => {
    //     nevigate("/login");
    //   }, 2000);
    // } else {
    //   setOpenSnackbar((prevState) => ({
    //     ...prevState,
    //     open: true,
    //     severity: "danger",
    //   }));
    //   setSnackbarMessage("An error occurred during user registration.");
    // }

    try {
      const docRef = await addUser(user);

      user = { ...user, documentId: docRef.id };
      // If the document is successfully added, the docRef contains a reference to the newly created document.
      console.log("Document added with ID: ", docRef.id);
      await updateUser(docRef.id, user);

      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "success",
      }));

      setSnackbarMessage("User registered successfully!");

      resetForm();
      setTimeout(() => {
        nevigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error);

      setOpenSnackbar((prevState) => ({
        ...prevState,
        open: true,
        severity: "error",
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

                    <div className="mt-4 d-flex justify-content-around align-items-center">
                      <p>
                        Go back to login? <Link to="/login">Login</Link>
                      </p>
                      <button
                        disabled={createButtonDisabled}
                        className="btn btn-primary btn-lg"
                        type="submit"
                      >
                        Create
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
