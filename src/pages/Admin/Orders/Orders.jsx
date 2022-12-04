import React, { useRef, useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import SlideBar from "../../../components/UI/slider/SlideBar";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";

import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

//date time picker
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { HOST } from "../../../env/config";

const AdminOrder = () => {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState("default")
  const navigate = useNavigate()

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(async () => {
    if (filter == "default") {
      getOrders()
    }
    else {
      await fetch(`${HOST}/api/admin/orders`, {
        headers: {
          'Authorization': `jwt=${Cookies.get('jwt')}`
        },
        method: 'GET',
        credentials: 'include'
      })
        .then((res) => res.json())
        .then((data) => {
          let items = data.filter((item) => item.order_status == filter);
          setOrders(items)
        })
        .catch((error) => {
          console.log(error);
          navigate('/error')
        })
    }
  }, [filter])

  function descending_date( a, b ) {
    if ( a._created < b._created ){
      return 1;
    }
    if ( a._created > b._created ){
      return -1;
    }
    return 0;
  }

  const getOrders = async () => {
    await fetch(`${HOST}/api/admin/orders`, {
      headers: {
        'Authorization': `jwt=${Cookies.get('jwt')}`
      },
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.sort(descending_date))
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
  }

  const completeOrder = async (id) => {
    await fetch(`${HOST}/api/admin/orders/detail/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `jwt=${Cookies.get('jwt')}`
      },
      body: JSON.stringify({order_status: "DONE"}),
      credentials: 'include',
    })
    .catch((error) => {
      console.log(error);
      navigate('/error')
    })
    getOrders()
  }

  return (
    <Helmet title="AdminPage">
      <div className="admin__section d-flex">
        <SlideBar />
        <div className="main__content">
          <h1>Đơn hàng</h1>
          <div className="select__actions">
            <div className="select__actions-item d-flex">
              <Form.Group className="mr-1" controlId="formBasicEmail">
                <Form.Label>Trạng thái: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mr-3"
                  onChange={e => setFilter(e.target.value)}
                >
                  <option value="default">Mặc định</option> 
                  <option value="PENDING">Đang xử lý</option> 
                  <option value="DONE">Đã hoàn thành</option> 
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className="d-list">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Ngày đặt</th>
                  <th scope="col">Số tiền</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Ghi chú</th>
                  <th scope="col" style={{ color: "green" }}>
                    Chi tiết
                  </th>
                  <th scope="col" style={{ color: "red" }}>
                    Hoàn thành
                  </th>
                </tr>
              </thead>
              <tbody>
              {orders.map((item, index) => (
                <Tr item={item} key={item.id} index={index} completeOrder={completeOrder}/>
              ))}
              </tbody>
            </table>
          </div>
        </div>;
      </div>
    </Helmet>
  );
};

const Tr = (props) => {
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
  const slash = (value) => {
    return value ? value : '-'
  }
  const {id, name, _created, price, order_status, address, description} = props.item
  return (
    <tr className="d-item">
      <th scope="row">{props.index + 1}</th>
      <td>{slash(name)}</td>
      <td>{format_date(_created)}</td>
      <td className="d-item--price">{price}đ</td>
      <td className="d-item--category">{mapping_value(order_status)}</td>
      <td className="d-item--des">{slash(address)}</td>
      <td className="d-item--des">{slash(description)}</td>
      <Link to={`/admin/orders/${id}`} className="d-item--icon d-item--edit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
        </svg>
      </Link>
      {order_status == "PENDING" && <td className="d-item--icon d-item--delete" onClick={() => props.completeOrder(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </td>}
    </tr>
  )
}

export default AdminOrder;
