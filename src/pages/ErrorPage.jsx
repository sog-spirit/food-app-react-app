import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import '../../src/styles/error.css'
function ErrorPage() {
    return (
        <Helmet title="Đã xảy ra lỗi">
        <CommonSection title="Lỗi !!" />
        <section>
          <Container>
            {/* <h1>Đã xảy ra lỗi !!</h1>
            <Link to="/home">Về trang chủ</Link> */}
            <div className="container error">
              <div className="error__image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Error.svg/1200px-Error.svg.png" alt="" />
              </div>
              <div className="error__noti"><h2>Lỗi 404</h2>
                <p>Xin lỗi, không tìm thấy trang</p>
              </div>
              <Link to="/home">Về trang chủ</Link> 
            </div>
          </Container>
        </section>
      </Helmet>
      )
}

export default ErrorPage