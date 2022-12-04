import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import SlideBar from "../../../components/UI/slider/SlideBar";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";

import {
  Form
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { HOST } from "../../../env/config";

const AdminCustomer = () => {
  //date time picker
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("default")
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(async () => {
    if (filter == "default") {
      getUsers()
    }
    else {
      await fetch(`${HOST}/api/admin/users`, {
        method: 'GET',
      })
      .then((res) => res.json())
      .then((data) => {
        let items = data.filter((item) => item.role == filter);
        setUsers(items)
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
    }
  }, [filter])

  const getUsers = async () => {
    await fetch(`${HOST}/api/admin/users`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
  }

  return (
    <Helmet title="AdminPage">
      <div className="admin__section d-flex">
        <SlideBar />
        <div className="main__content">
          <h1>Tài Khoản</h1>
          <div className="select__actions">
            <Link to="/admin/addUser" className="d-flex">
              <button type="button" className="btn select__action--add">
                Tạo tài khoản
              </button>
            </Link>
            <div className="select__actions-item d-flex">
              <Form.Group className="mr-1" controlId="formBasicEmail">
                <Form.Label>Vai trò: </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="mr-3"
                  onChange={e => setFilter(e.target.value)}
                >
                  <option value="default">Mặc định</option> 
                  <option value="admin">Quản lý</option> 
                  <option value="staff">Nhân viên</option> 
                  <option value="user">Khách hàng</option> 
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
                  <th scope="col">Ngày khởi tạo</th>
                  <th scope="col">Vai trò</th>
                  <th scope="col" style={{ color: "green" }}>
                    Chi tiết
                  </th>
                </tr>
              </thead>
              <tbody>
              {users.map((item, index) => (
                <Tr item={item} key={item.id} index={index}/>
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
      "admin": "Quản lý",
      "staff": "Nhân viên",
      "user": "Khách hàng",
    }
    return mapping[value]
  }
  const slash = (value) => {
    return value ? value : '-'
  }
  const {id, name, date_joined, role} = props.item
  return (
    <tr className="d-item">
      <th scope="row">{props.index + 1}</th>
      <td>{slash(name)}</td>
      <td>{format_date(date_joined)}</td>
      <td className="">{mapping_value(role)}</td>
      <Link to={`/admin/users/${id}`} className="d-item--icon d-item--edit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
        </svg>
      </Link>
    </tr>
  )
}

export default AdminCustomer;
