import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'

function ErrorPage() {
    return (
        <Helmet title="Đã xảy ra lỗi">
        <CommonSection title="Đã xảy ra lỗi" />
        <section>
          <Container>
            <h1>Đã xảy ra lỗi !!</h1>
            <Link to="/home">Về trang chủ</Link>
          </Container>
        </section>
      </Helmet>
      )
}

export default ErrorPage