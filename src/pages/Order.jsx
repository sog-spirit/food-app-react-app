import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { HOST } from "../env/config";

function Order() {
    const [order, setOrder] = useState([])
    const navigate = useNavigate()
    useEffect(async () => {
      let user_id = sessionStorage.getItem('user')
      await fetch(`${HOST}/api/user/${user_id}/order`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data)
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
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
                      <th>Ngày đặt</th>
                      <th>Tổng giá</th>
                      <th>Trạng thái</th>
                      <th>Địa chỉ</th>
                      <th>Ghi chú</th>
                      <th>Chi tiết</th>
                      <th>Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((item, index) => (
                        <Tr item={item} key={item.id} index={index}></Tr>
                    ))}
                  </tbody>
                </table>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = (props) => {
    const { id, _created, price, order_status, address, note} = props.item

    const format_date = (date) => {
      return date.substring(0, 10) + " " + date.substring(11, 16)
    }

    const mapping_value = (value) => {
      const mapping = {
        "PENDING": "Đang xử lý",
        "DONE": "Đã hoàn thành",
      }
      return mapping[value]
    }

    return (
      <tr>
        <td className="text-center">{props.index + 1}</td>
        <td className="text-center">{format_date(_created)}</td>
        <td className="text-center">${price}</td>
        <td className="text-center">{mapping_value(order_status)}</td>
        <td className="text-center">{address}</td>
        <td className="text-center">{note}</td>
        <td className="text-center cart__item-del">
          <Link to={`/detail/${id}`}>Detail</Link>
        </td>
        <td className="text-center cart__item-del">
          <Link to={`/review/${id}`}>Review</Link>
        </td>
      </tr>
    );
  };

export default Order