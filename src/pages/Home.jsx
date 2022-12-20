import React from "react";
import { useNavigate } from "react-router-dom";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col } from "reactstrap";

import bigBanner from "../assets/images/bigBanner.png";
import "../styles/hero-section.css";

import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate()
  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Just wait <br /> food at
                  <span> your door</span>
                </h1>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
                  magni delectus tenetur autem, sint veritatis!
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between" onClick={() => navigate('/foods')}>
                    Đặt hàng <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={bigBanner} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
