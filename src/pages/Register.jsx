import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/register.scss";

//date time picker
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Register = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const [value, setValue] = React.useState(null);

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form" onSubmit={submitHandler}>
                <div className="form-group text-left">
                  <label>FullName</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label>Email</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label>Username</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label>Phone Number</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label>Address</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label>Date of Birth</label>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    style={{ width: "fit-content" }}
                  >
                    <DatePicker
                      label="Basic example"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="form-group text-left">
                  <label>Image</label>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg"
                    multiple
                  />
                  <div id="display-image"></div>
                </div>
                <div className="form-group text-left">
                  <label>Password</label>
                  <input type="password" className="form-control" required />
                </div>
                <div className="form-group text-left">
                  <label>Confirm Password</label>
                  <input type="password" className="form-control" required />
                </div>

                <button type="submit" className="addTOCart__btn">
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
