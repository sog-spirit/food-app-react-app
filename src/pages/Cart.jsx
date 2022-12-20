import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext, UserContext } from "../context";
import { toPrice } from "../utils/helper";

const Cart = () => {
  const {carts, setCarts} = useContext(CartContext);
  const {user, setUser} = useContext(UserContext);

  const totalAmount = (cart) => {
    return cart.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0)
  }

  return (
    <Helmet title="Cart">
      <CommonSection title="Thanh toán" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {carts.length === 0 ? (
                <h5 className="text-center">Bạn chưa chọn sản phẩm nào</h5>
              ) : (
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((item) => (
                      <Tr item={item} key={item.id}/>
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-4">
                <h6>
                  Tổng cộng: 
                  <span className="cart__subtotal">{toPrice(totalAmount(carts))} đ</span>
                </h6>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/foods">Tiếp tục mua sắm</Link>
                  </button>
                  <button className="addTOCart__btn">
                    <Link to={user.id !== undefined ? "/checkout" : "/login"}>Thực hiện thanh toán</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, name, image, price, quantity } = props.item;
  const {carts, setCarts} = useContext(CartContext);

  const deleteItem = async () => {
    const index = carts.findIndex((item) => {
      return item.id === id;
    });
    
    let newCart = [...carts];
    newCart = newCart.filter((cart) => cart.id !== newCart[index].id);
    setCarts(newCart)
    sessionStorage.setItem("carts", JSON.stringify(newCart))
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image} alt="" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">{toPrice(price)} đ</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" style={{color: 'red'}} onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
