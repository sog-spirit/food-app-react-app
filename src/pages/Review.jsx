import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { HOST } from '../env/config'

function Review() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ review, setReview ] = useState({
        rating: 5,
        content: ""
    })
    const submitHandler = async (e) => {
        e.preventDefault()
        let token = sessionStorage.getItem('token')
        await fetch(`${HOST}/api/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...review, order: id, token})
        }).then((response) => {
            if (response.status === 201) {
                navigate('/home')
            } else {
                console.log(response.json());
                navigate('/error')
            }
        })
    }
    const handleChange = async (event) => {
        setReview({ ...review, [event.target.name]: event.target.value });
      };
    // const 
  return (
    <Helmet title="Review">
      <CommonSection title="Đánh giá" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form
                className="form"
                onSubmit={(e) => submitHandler(e)}
                style={{width: "70%"}}
               
              >
                <div className="form-group text-left">
                  <label>Đánh giá</label>
                  <input name="rating" type="number" className="form-control" min={1} max={5} required onChange={(e) => {
                    handleChange(e)
                }}/>
                </div>
                <div className="form-group text-left">
                  <label>Nội dung</label>
                  <textarea name="content" rows="4" cols="50" required onChange={(e) => {
                    handleChange(e)
                }}></textarea>
                </div>
                <button type="submit" className="addTOCart__btn">
                  Đánh giá
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Review