import React from 'react'

import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import '../styles/cart-page.css'
import { Container, Row, Col } from 'reactstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { HOST } from '../env/config'
import { toPrice } from '../utils/helper'
import ReactPaginate from 'react-paginate'

function Detail() {
  const { id } = useParams()
  const [orderDetail, setOrderDetail] = useState([])
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0)

  const numbersPerPage = 10
  const visitedPage = pageNumber * numbersPerPage
  const displayPage = orderDetail.slice(
    visitedPage,
    visitedPage + numbersPerPage
  )

  const pageCount = Math.ceil(orderDetail.length / numbersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const getDetailOrder = async () => {
    let user_id = sessionStorage.getItem('user')
    await fetch(`${HOST}/api/user/${user_id}/order/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderDetail(data)
      })
      .catch((error) => {
        console.log(error)
        navigate('/error')
      })
  }
  useEffect(() => {
    getDetailOrder()
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
                    <th>Hình ảnh</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
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
            <Link to='/order'>Quay lại</Link>
            <Link to='/home'>Về trang chủ</Link>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = (props) => {
  const { image, name, price, quantity } = props.item
  return (
    <tr>
      <td className='text-center'>{(props.index + 1) + props.visitedPage}</td>
      <td className='text-center cart__img-box'>
        <img src={image} alt='' />
      </td>
      <td className='text-center'>{name}</td>
      <td className='text-center'>{toPrice(price)} đ</td>
      <td className='text-center'>{quantity}</td>
      <td className='text-center'>{toPrice(price * quantity)} đ</td>
    </tr>
  )
}

export default Detail
