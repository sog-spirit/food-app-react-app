import React, { useState, useEffect } from 'react'
import Helmet from '../../../components/Helmet/Helmet'
import SlideBar from '../../../components/UI/slider/SlideBar'
import '../../../styles/dashboard.scss'
import '../../../styles/admin.scss'

import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HOST } from '../../../env/config'
import { toPrice } from '../../../utils/helper'
import ReactPaginate from "react-paginate";

const AdminOrder = () => {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('default')
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0);
    
  const numbersPerPage = 10;
  const visitedPage = pageNumber * numbersPerPage;
  const displayPage = orders.slice(
    visitedPage,
    visitedPage + numbersPerPage
  );

  const pageCount = Math.ceil(orders.length / numbersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const is_superuser = sessionStorage.getItem('is_superuser')
    const is_staff = sessionStorage.getItem('is_staff')
    if (is_superuser !== 'true' && is_staff !== 'true') {
      navigate('/error')
    }
    else {
      getOrders()
    }
  }, [])

  useEffect(async () => {
    if (filter == 'default') {
      getOrders()
    } else {
      await fetch(`${HOST}/api/admin/orders`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          let items = data.filter((item) => item.order_status == filter)
          setOrders(items)
        })
        .catch((error) => {
          console.log(error)
          navigate('/error')
        })
    }
  }, [filter])

  function descending_date(a, b) {
    if (a._created < b._created) {
      return 1
    }
    if (a._created > b._created) {
      return -1
    }
    return 0
  }

  const getOrders = async () => {
    await fetch(`${HOST}/api/admin/orders`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.sort(descending_date))
      })
      .catch((error) => {
        console.log(error)
        navigate('/error')
      })
  }

  const completeOrder = async (id) => {
    let token = sessionStorage.getItem('token')
    await fetch(`${HOST}/api/admin/orders/detail/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order_status: 'DONE', token }),
    }).catch((error) => {
      console.log(error)
      navigate('/error')
    })
    getOrders()
  }

  return (
    <Helmet title='AdminPage'>
      <div className='admin__section d-flex'>
        <SlideBar />
        <div className='main__content'>
          <h1>Đơn hàng</h1>
          <div className='select__actions'>
            <div className='select__actions-item d-flex'>
              <Form.Group className='mr-1' controlId='formBasicEmail'>
                <Form.Label>Trạng thái: </Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mr-3'
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value='default'>Mặc định</option>
                  <option value='PENDING'>Đang xử lý</option>
                  <option value='DONE'>Đã hoàn thành</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className='d-list'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Tên</th>
                  <th scope='col'>Ngày đặt</th>
                  <th scope='col'>Số tiền</th>
                  <th scope='col'>Trạng thái</th>
                  <th scope='col'>Địa chỉ</th>
                  <th scope='col'>
                    Chi tiết
                  </th>
                  <th scope='col'>
                    Hoàn thành
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayPage.map((item, index) => (
                  <Tr
                    item={item}
                    key={item.id}
                    index={index}
                    completeOrder={completeOrder}
                    visitedPage={visitedPage}
                  />
                ))}
              </tbody>
            </table>
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Trước"}
                nextLabel={"Sau"}
                containerClassName=" paginationBttns "
              />
            </div>
          </div>
        </div>
        ;
      </div>
    </Helmet>
  )
}

const Tr = (props) => {
  const format_date = (date) => {
    return date.substring(0, 10) + ' ' + date.substring(11, 16)
  }

  const mapping_value = (value) => {
    const mapping = {
      PENDING: 'Đang xử lý',
      DONE: 'Đã hoàn thành',
    }
    return mapping[value]
  }
  const slash = (value) => {
    return value ? value : '-'
  }
  const { id, name, _created, price, order_status, address } =
    props.item
  return (
    <tr className='d-item'>
      <th scope='row'>{(props.index + 1) + props.visitedPage}</th>
      <td>{slash(name)}</td>
      <td>{format_date(_created)}</td>
      <td className='d-item--price'>{toPrice(price)} đ</td>
      <td className='d-item--category'>{mapping_value(order_status)}</td>
      <td className='d-item--des'>{slash(address)}</td>
      <td className='d-item--des'>
        <Link to={`/admin/orders/${id}`} className='d-item--icon d-item--edit'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/></svg>
        </Link>
      </td>

      {order_status == 'PENDING' ? (
        <td
          className='d-item--icon'
          onClick={() => props.completeOrder(id)}
        >
          <svg xmlns='http://www.w3.org/2000/svg' fill='green' viewBox='0 0 512 512'>
            <path d='M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
          </svg>
        </td>
      ) : (
        <td
          className='d-item--icon'
          onClick={() => props.completeOrder(id)}
        >
          -
        </td>
      )}
    </tr>
  )
}

export default AdminOrder
