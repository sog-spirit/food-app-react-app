import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { HOST } from "../env/config";

function Detail() {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState([])
    const navigate = useNavigate()
    const getDetailOrder = async () => {
      await fetch(`${HOST}/api/order/${id}`, {
        headers: {
            'Authorization': `jwt=${Cookies.get('jwt')}`
        },
        method: 'GET',
        credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
          setOrderDetail(data)
        })
        .catch((error) => {
          console.log(error);
          navigate('/error')
        })
      }
    useEffect(() => {
      getDetailOrder()
    }, [])
  return (
    <Helmet title="Order">
      <CommonSection title="Your Order" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Hình ảnh</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.map((item, index) => (
                        <Tr item={item} key={item.id} index={index}></Tr>
                    ))}
                  </tbody>
                </table>
            </Col>
            <Link to='/order'>
              Quay lại
            </Link>
            <Link to='/home'>
              Về trang chủ
            </Link>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = (props) => {
    const { image, name, price, quantity} = props.item
    return (
      <tr>
        <td className="text-center">{props.index + 1}</td>
        <td className="text-center cart__img-box">
            <img src={HOST + image} alt="" />
        </td>
        <td className="text-center">{name}</td>
        <td className="text-center">{price}</td>
        <td className="text-center">{quantity}</td>
        <td className="text-center">{price * quantity}</td>
      </tr>
    );
  };

export default Detail