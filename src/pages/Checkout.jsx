import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";
import { useContext } from "react";
import { CartContext, UserContext } from "../context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { HOST } from "../env/config";

const Checkout = () => {
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [address, setAddress] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [note, setNote] = useState("");

  const { carts, setCarts } = useContext(CartContext)

  const totalAmount = (cart) => {
    return cart.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0)
  }
  const shippingCost = 30000;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (carts.length === 0) {
      setIsError(true)
        setTimeout(() => {
            setIsError(false)
        }, 2000);
    }
    else {
      let newCart = carts.map((cart) => {
        return {...cart, "product": cart.id}
      })
      await fetch(`${HOST}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `jwt=${Cookies.get('jwt')}`
        },
        credentials: 'include',
        body: JSON.stringify({
          products: newCart, 
          address: address + ", " + enterCity, 
          note 
        })
      }).then((response) => {
        if (response.status === 200) {
          setCarts([])
          sessionStorage.removeItem('carts');
          navigate('/success')
        } else {
          navigate('/error')
        }
      })
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={user.name}
                    readOnly
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="Phone number"
                    required
                    value={user.phone} 
                    readOnly
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={user.email}
                    readOnly
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                    />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Note"
                    required
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="addTOCart__btn"
                  onClick={e => submitHandler(e)}
                >
                  Payment
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Your balance: <span>${user.balance}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${totalAmount(carts)}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount(carts) + shippingCost}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
          {isError && <span style={{color: "red"}}>Xin hãy chọn sản phẩm !!</span>}
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
