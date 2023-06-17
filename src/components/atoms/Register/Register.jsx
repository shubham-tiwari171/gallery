import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import IconButton from "@mui/material/IconButton";
import "./Register.css";
const Register = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    handleClose();
  };

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
                  <form>
                    <div className="row">
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <TextField
                            label="UserName"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            type=""
                            required
                            fullWidth
                          />
                        </div>
                      </div>
                      <div className="col-md-6 ">
                        <div className="form-outline">
                          <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            type=""
                            required
                            fullWidth
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                          />{" "}
                        </div>
                      </div>
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            label="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                          />{" "}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6  d-flex align-items-center">
                        <div className="form-outline datepicker w-100">
                          <TextField
                            label="Mobile no"
                            value={mobile}
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                            type=""
                            required
                            fullWidth
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
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              value="other"
                              control={<Radio />}
                              label="Other"
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
