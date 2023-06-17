import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./Register.css";
import { useFormik } from "formik";
const Register = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      },
      onSubmit: (values, action) => {
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
      },
    });

  return (
    <>
      {/* <Button variant="contained" color="primary" onClick={handleOpen}>
        Register
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="UserName"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              type="email"
              required
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              type="email"
              required
              fullWidth
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              type="password"
              required
              fullWidth
            />

            <TextField
              label="Confirm password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              type="password"
              required
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog> */}

      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body">
                  <h2 className="mb-4">Create account</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <TextField
                            label="UserName"
                            name="userName"
                            margin="normal"
                            type=""
                            required
                            fullWidth
                            value={values.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <TextField
                            label="Email"
                            name="email"
                            margin="normal"
                            type=""
                            required
                            fullWidth
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            label="Password"
                            name="password"
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            label="Confirm password"
                            name="confirmPassword"
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            label="Mobile no"
                            name={mobile}
                            margin="normal"
                            type=""
                            required
                            fullWidth
                            value={values.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />{" "}
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
                      <input
                        className="btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                      />
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
