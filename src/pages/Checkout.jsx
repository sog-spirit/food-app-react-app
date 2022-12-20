import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";
import { useContext } from "react";
import { CartContext, UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import { HOST } from "../env/config";

const Checkout = () => {
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [address, setAddress] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [note, setNote] = useState("");
  const [code , setCode] = useState("");
  const [isVoucher, setIsVoucher] = useState(false)
  const [isVoucherError, setIsVoucherError] = useState(false)
  const [voucher, setVoucher] = useState({})

  const { carts, setCarts } = useContext(CartContext)

  const totalAmount = (cart) => {
    return cart.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0)
  }

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
      let token = sessionStorage.getItem('token')
      let data = {
        products: newCart, 
        address: address + ", " + enterCity, 
        note, token
      }
      if (isVoucher === true) {
        data = {...data, coupon: code}
      }
      await fetch(`${HOST}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.status === 200) {
          setCarts([])
          sessionStorage.removeItem('carts');
          navigate('/success')
        } else {
          console.log(response);
          navigate('/error')
        }
      })
    }
  };

  const submitVoucher = async (e) => {
    await fetch(`${HOST}/api/coupon/${code}`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.detail === 'coupon not found') {
        setIsVoucher(false)
        setIsVoucherError(true)
          setTimeout(() => {
            setIsVoucherError(false)
          }, 2000);
        setCode("")
      }
      else {
        setVoucher(data)
        setIsVoucher(true)
      }
    })
    .catch((error) => {
      console.log(error);
    })
    e.preventDefault()
  }

  return (
    <Helmet title="Checkout">
      <CommonSection title="Thanh toán" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Thông tin</h6>
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
                  Thanh toán
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Tài khoản của bạn: <span>{user.balance} đ</span>
                </h6>
                <div className="checkout__voucher">
                  <input type="text" name="coupon" id="coupon" placeholder="Voucher" value={code} onChange={(e) => setCode(e.target.value)}/>
                  <button className="addTOCart__btn" onClick={e => submitVoucher(e)}>Áp dụng</button>
                </div>
                {isVoucherError && <span style={{color: "red"}}>Voucher không hợp lệ !!</span>}
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Thanh toán: 
                    <div className="voucher__calculate">
                    {
                      isVoucher ? <>
                      <span className="line__through" style={{color: 'red'}}>{totalAmount(carts)} đ</span>
                      <span>{totalAmount(carts) * (100 - voucher.discount) / 100} đ</span>
                      </> : <>
                      <span>{totalAmount(carts)} đ</span>
                      </>
                    }
                    
                    </div>
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
