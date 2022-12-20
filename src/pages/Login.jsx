import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context";
import { HOST } from "../env/config";

const Login = () => {
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login(e) {
    e.preventDefault();
    let item = { username: username, password: password };
    let result = await fetch(`${HOST}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(item),
    });
    let data = await result.json();
    if (data.detail == "Login successfully") {
      sessionStorage.setItem('token', data.jwt)
      sessionStorage.setItem('user', data.user_id)
      sessionStorage.setItem('is_superuser', data.is_superuser)
      sessionStorage.setItem('is_staff', data.is_staff)
      await fetch(`${HOST}/api/user/${data.user_id}`, {
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
      navigate('/foods')
    }
    else {
      navigate('/error')
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Đăng nhập" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button
                  onClick={login}
                  type="submit"
                  className="addTOCart__btn"
                >
                  Đăng nhập
                </button>
              </form>
              <Link to="/register">
                Bạn chưa có tài khoản ? Tạo tài khoản
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
