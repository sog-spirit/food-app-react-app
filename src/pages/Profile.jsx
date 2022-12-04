import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { useContext } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { HOST } from "../env/config";

function Profile() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)
    const [profile, setProfile] = useState({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      date_of_birth: user.date_of_birth,
    })

    const handleChange = async (event) => {
      setProfile({ ...profile, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      let token = sessionStorage.getItem('token')
      await fetch(`${HOST}/api/user/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...profile, 'token': token})
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
      getUser()
      navigate('/home')
    }

    var getUser = async () => {
      let id = sessionStorage.getItem('user')
      if (id) {
        await fetch(`${HOST}/api/user/${id}`, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
          setUser(data)
        })
        .catch((error) => {
          console.log(error);
          navigate('/error')
        })
    }}

    return (
        <Helmet title="Profile">
          <CommonSection title="Profile" />
          <section>
            <Container>
              <Row>
                <Col lg="6" md="6">
                  <h6 className="mb-4">Profile</h6>
                  <form className="checkout__form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form__group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                        value={profile.name}
                        onChange={(e) => {
                          handleChange(e)
                      }}
                      />
                    </div>
                    <div className="form__group">
                      <label for="phone">Phone</label>
                      <input
                        type="number"
                        name="phone"
                        placeholder="Phone number"
                        required
                        value={profile.phone}
                        onChange={(e) => {
                          handleChange(e)
                      }}
                        />
                    </div>
                    <div className="form__group">
                      <label for="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        readOnly
                        value={profile.email}
                        onChange={(e) => {
                          handleChange(e)
                      }}
                      />
                    </div>
                    <div className="form__group">
                      <label for="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        required
                        value={profile.address}
                        onChange={(e) => {
                          handleChange(e)
                      }}
                      />
                    </div>
                    <div className="form__group">
                      <label for="date_of_birth">Date of Birth</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        placeholder="Date of Birth"
                        required
                        value={profile.date_of_birth}
                        onChange={(e) => {
                          handleChange(e)
                      }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="addTOCart__btn"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Save changes
                    </button>
                  </form>
                </Col>
              </Row>
            </Container>
          </section>
        </Helmet>
      );
}

export default Profile