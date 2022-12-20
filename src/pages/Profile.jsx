import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { useContext } from 'react'
import { UserContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { HOST } from '../env/config'

function Profile() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [image, setImage] = useState("") 
  const [profile, setProfile] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    address: user.address,
    date_of_birth: user.date_of_birth,
    image: user.image
  })

  const handleChange = async (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let imageURL = null
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "itcs6zch")
    data.append("cloud_name", "dmlfhpnyo")
    await fetch("https://api.cloudinary.com/v1_1/dmlfhpnyo/image/upload", {
        method: "post",
        body: data
    })
    .then((res) => res.json())
    .then((data) => {
        imageURL = data.url
    }).catch((error) => {
        console.log(error);
    })
    let token = sessionStorage.getItem('token')
    await fetch(`${HOST}/api/user/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...profile, "image": imageURL, token: token }),
    }).catch((error) => {
      console.log(error)
      navigate('/error')
    })
    getUser()
    navigate('/home')
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
          console.log(error)
          navigate('/error')
        })
    }
  }

  return (
    <Helmet title='Profile'>
      <CommonSection title='Thông tin' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <form
                className='checkout__form'
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className='form__group'>
                  <label for='name'>Tên</label>
                  <input
                    type='text'
                    name='name'
                    placeholder='Enter your name'
                    required
                    value={profile.name}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </div>
                <div className='form__group'>
                  <label for='phone'>Số điện thoại</label>
                  <input
                    type='number'
                    name='phone'
                    placeholder='Phone number'
                    required
                    value={profile.phone}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </div>
                <div className='form__group'>
                  <label for='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    required
                    readOnly
                    value={profile.email}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </div>
                <div className='form__group'>
                  <label for='address'>Địa chỉ</label>
                  <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    required
                    value={profile.address}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </div>
                <div className='form__group'>
                  <label
                    className='file_preview optional control-label'
                    for='photo-file'
                  >
                    Hình ảnh
                  </label>
                  <div className='file-preview'>
                    <input
                      type='file'
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div className='hidden-field'></div>
                  <span className='help-block'>
                    We accept PNG, JPG, and JPEG files
                  </span>
                  <div className='image-photo' style={{ margin: '10px 0 0 0' }}>
                    <img src={profile.image} style={{ width: '150px' }} alt='Not upload image' />
                  </div>
                </div>
                <div className='form__group'>
                  <label for='date_of_birth'>Ngày sinh</label>
                  <input
                    type='date'
                    name='date_of_birth'
                    placeholder='Date of Birth'
                    required
                    value={profile.date_of_birth}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </div>
                <button
                  type='submit'
                  className='addTOCart__btn'
                  onClick={(e) => handleSubmit(e)}
                >
                  Lưu
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Profile
