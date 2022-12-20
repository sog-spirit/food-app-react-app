import React from 'react'

import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import '../styles/cart-page.css'
import { Container, Row, Col } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { HOST } from '../env/config'
import { toPrice } from '../utils/helper'
import ReactPaginate from 'react-paginate'

function Order() {
  const [order, setOrder] = useState([])
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0)

  const numbersPerPage = 10
  const visitedPage = pageNumber * numbersPerPage
  const displayPage = order.slice(visitedPage, visitedPage + numbersPerPage)

  const pageCount = Math.ceil(order.length / numbersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
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
        console.log(error)
        navigate('/error')
      })
  }, [])

  return (
    <Helmet title='Order'>
      <CommonSection title='Đơn hàng của bạn' />
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <table className='table table-bordered text-center'>
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
                  {displayPage.map((item, index) => (
                    <Tr
                      item={item}
                      key={item.id}
                      index={index}
                      visitedPage={visitedPage}
                    ></Tr>
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
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = (props) => {
  const { id, _created, price, order_status, address, note } = props.item

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

  return (
    <tr>
      <td className='text-center'>{(props.index + 1) + props.visitedPage}</td>
      <td className='text-center'>{format_date(_created)}</td>
      <td className='text-center'>{toPrice(price)} đ</td>
      <td className='text-center'>{mapping_value(order_status)}</td>
      <td className='text-center'>{slash(address)}</td>
      <td className='text-center'>{slash(note)}</td>
      <td className='text-center cart__item-del'>
        <Link to={`/detail/${id}`}>
          <svg
            width='25'
            height='25'
            fill='green'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path d='M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z' />
          </svg>
        </Link>
      </td>
      <td className='text-center cart__item-del'>
        <Link to={`/review/${id}`}>
          <svg
            width='25'
            height='25'
            fill='yellow'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 576 512'
          >
            <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z' />
          </svg>
        </Link>
      </td>
    </tr>
  )
}

export default Order
