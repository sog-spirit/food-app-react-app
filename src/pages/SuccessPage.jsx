import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'

function SuccessPage() {
  return (
    <Helmet title="Chúc mừng">
    <CommonSection title="Chúc mừng" />
    <section>
      <Container>
        <h1>Bạn đã đặt hàng thành công</h1>
        <Link to="/order">Đơn hàng của bạn</Link>
        <Link to="/home">Trang chủ</Link>
      </Container>
    </section>
  </Helmet>
  )
}

export default SuccessPage