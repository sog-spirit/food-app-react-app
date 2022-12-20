import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/common-section/CommonSection';
import ModalBox from '../components/UI/ModalBox';
import { UserContext } from '../context';
import { HOST } from '../env/config';

function AddBalance() {
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [balanceForm, setBalanceForm] = useState({
        amount: 0,
        current_password: ""
    })
    const {user, setUser} = useContext(UserContext)
    const handleChange = (event) => {
        setBalanceForm({ ...balanceForm, [event.target.name]: event.target.value });
      };
    const submitHandler = async (e) => {
      e.preventDefault()
      let token = sessionStorage.getItem("token")
      let result = await fetch(`${HOST}/api/user/update/balance`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...balanceForm, 'token': token})
      })
      let data = await result.json();
      if (data.detail == "Balance added successfully") {
        navigate('/home')
        getUser()
      }
      else {
        setIsModal(true);
      }
    }

    var getUser = async () => {
      let id = sessionStorage.getItem('user')
      if (id) {
        await fetch(`${HOST}/api/user/${id}`, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
          setUser(data)
        })
        .catch((error) => {
          console.log(error);
          navigate('/error')
        })
    }}

    const closeModal = (e) => {
      setIsModal(false);
    };
  
  return (
    <Helmet title="Nạp tiền">
        <CommonSection title="Nạp tiền" />
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={(e) => submitHandler(e)}>
                  <div className="form__group">
                    <input
                      type="number"
                      placeholder="Số tiền"
                      name="amount"
                      required
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  </div>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      name="current_password"
                      required
                      onChange={(e) => {
                          handleChange(e)
                      }}
                      />
                  </div>
                  <button
                    onClick={(e) => submitHandler(e)}
                    type="submit"
                    className="addTOCart__btn"
                    >
                    Nạp tiền
                  </button>
                  {/* modal box for error */}
                  <ModalBox show={isModal} handleClose={(e) => closeModal(e)}>
                  Đã xảy ra lỗi khi nạp tiền
                  </ModalBox>
                  {/* end modal box for error */}
                </form>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
  )
}

export default AddBalance