import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import '../../src/styles/success.css'

function SuccessPage() {
  return (
    <Helmet title="Chúc mừng">
    <CommonSection title="Chúc mừng" />
    <section>
      <Container>
        {/* <h1>Bạn đã đặt hàng thành công</h1>
        <Link to="/order">Đơn hàng của bạn</Link>
        <Link to="/home">Trang chủ</Link> */}
        <div className="container success">
          <div className="success__image">
            <img src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png" alt="" />
          </div>
          <div className="success__noti">
            <h2>Thành công !</h2>
            <p>Cảm ơn bạn đã đặt hàng</p>
          </div>
          <div className="success__btn">
          <Link to="/order">Đơn hàng của bạn</Link>
          <Link to="/home">Trang chủ</Link> 
          </div>
        </div>
      </Container>
    </section>
  </Helmet>
  )
}

export default SuccessPage