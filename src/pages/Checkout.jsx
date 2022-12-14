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
    if (carts.length === 0 || address === "" || enterCity === "") {
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
          getUser()
        } else {
          console.log(response);
          setIsError(true)
          setTimeout(() => {
              setIsError(false)
          }, 2000);
        }
      })
    }
  };

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

  const submitVoucher = async (e) => {
    e.preventDefault()
    if (code === "") {
      setIsVoucher(false)
    }
    else {
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
  }}

  return (
    <Helmet title="Checkout">
      <CommonSection title="Thanh to??n" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Th??ng tin</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    name="name"
                    placeholder="T??n"
                    required
                    value={user.name}
                    readOnly
                  />
                </div>
                <div className="form__group">
                  <input
                    type="number"
                    placeholder="S??? ??i???n tho???i"
                    required
                    value={user.phone} 
                    readOnly
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={user.email}
                    readOnly
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="?????a ch???"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Th??nh ph???"
                    required
                    onChange={(e) => setEnterCity(e.target.value)}
                    />
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Ghi ch??"
                    required
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="addTOCart__btn"
                  onClick={e => submitHandler(e)}
                >
                  Thanh to??n
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  T??i kho???n c???a b???n: <span>{user.balance} ??</span>
                </h6>
                <div className="checkout__voucher">
                  <input type="text" name="coupon" id="coupon" placeholder="Coupon" value={code} onChange={(e) => setCode(e.target.value)}/>
                  <button className="addTOCart__btn" onClick={e => submitVoucher(e)}>??p d???ng</button>
                </div>
                {isVoucherError && <span style={{color: "red"}}>Coupon kh??ng h???p l??? !!</span>}
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Thanh to??n: 
                    <div className="voucher__calculate">
                    {
                      isVoucher ? <>
                      <span className="line__through" style={{color: 'red'}}>{totalAmount(carts)} ??</span>
                      <span>{totalAmount(carts) * (100 - voucher.discount) / 100} ??</span>
                      </> : <>
                      <span>{totalAmount(carts)} ??</span>
                      </>
                    }
                    
                    </div>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
          {isError && <span style={{color: "red"}}>???? x???y ra l???i !!</span>}
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
