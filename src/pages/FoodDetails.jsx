import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'

import '../styles/product-details.css'

import ProductCard from '../components/UI/product-card/ProductCard'
import { useContext } from 'react'
import { CartContext } from '../context'
import { HOST } from '../env/config'
import '../../src/styles/review.css'

const FoodDetails = () => {
  const [tab, setTab] = useState('rev')
  const { id } = useParams()
  const [previewImg, setPreviewImg] = useState('')
  const [number, setNumber] = useState(1)

  const { carts, setCarts } = useContext(CartContext)

  const [product, setProduct] = useState({})
  const [review, setReview] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProductDetail()
    getReview()
    getProducts()
  }, [])
  
  useEffect(() => {    
    getReview()
    getProductDetail()
  }, [id])

  const addNumber = () => {
    setNumber(number + 1)
  }
  const descNumber = () => {
    if (number === 1) {
      return
    } else {
      setNumber(number - 1)
    }
  }

  let getProducts = async () => {
    let response = await fetch(`${HOST}/api/product`)
    let data = await response.json()
    setProducts(data)
  }

  const addToCart = () => {
    const index = carts.findIndex((item) => {
      return item.id === id
    })

    if (index !== -1) {
      let newCart = [...carts]

      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + number,
      }

      setCarts(newCart)
      sessionStorage.setItem('carts', JSON.stringify(newCart))
    } else {
      let newCart = [
        ...carts,
        {
          id: id,
          name: product.name,
          image: product.image,
          price: product.price * number,
          quantity: number,
        },
      ]
      setCarts(newCart)
      sessionStorage.setItem('carts', JSON.stringify(newCart))
    }
  }

  const relatedProduct = products.filter(
    (item) => product.category === item.category && product.id !== item.id
  )

  const getProductDetail = async () => {
    await fetch(`${HOST}/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setPreviewImg(data.image)
      })
  }

  const getReview = async () => {
    await fetch(`${HOST}/api/product/${id}/review`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  return (
    <Helmet title='Product-details'>
      <CommonSection title={product.name} />

      <section>
        <Container>
          <Row>
            <Col lg='2' md='2'>
              <div className='product__images '>
                <div className='img__item'>
                  <img src={previewImg} alt='' className='w-50' />
                </div>
              </div>
            </Col>
            <Col lg='4' md='4'>
              <div className='product__main-img'>
                <img src={previewImg} alt='' className='w-100' />
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='single__product-content'>
                <h2 className='product__title mb-3'>{product.name}</h2>
                <p className='product__price'>
                  {' '}
                  Giá: <span>{product.price} đ</span>
                </p>
                <p className='category mb-5'>
                  <span>{product.category_name}</span>
                </p>
                <div className='product__number'>
                  <button className='number__btn' onClick={() => descNumber()}>
                    -
                  </button>
                  <input type='text' name='number' readOnly value={number} />
                  <button className='number__btn' onClick={() => addNumber()}>
                    +
                  </button>
                </div>
                <button onClick={() => addToCart()} className='addTOCart__btn'>
                  Thêm
                </button>
              </div>
            </Col>

            <Col lg='12'>
              <div className='tabs d-flex align-items-center gap-5 py-3'>
                <h6
                  className={` ${tab === 'rev' ? 'tab__active' : ''}`}
                  onClick={() => setTab('rev')}
                >
                  Đánh giá
                </h6>
              </div>

              {tab === 'desc' ? (
                <div className='tab__content'>
                  <p>{product.description}</p>
                </div>
              ) : (
                <div className='tab__form mb-3 pd-5'>
                  {review.length == 0 ? (
                    <p className='no__review'>
                      Sản phẩm này chưa có đánh giá nào
                    </p>
                  ) : (
                    review.map((item) => <Tr item={item} key={item.id} />)
                  )}
                </div>
              )}
            </Col>

            <Col lg='12' className='mb-5 mt-4'>
              <h2 className='related__Product-title'>Bạn cũng có thể thích</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg='3' md='4' sm='6' xs='6' className='mb-4' key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = (props) => {
  const { image, rating, name, email, content } = props.item
  return (
    <div className='review'>
      <div className='user-info'>
        <img src={image} alt='' />
        {/* <p className="user__name mb-0">{name}</p> */}
        <p className='user__name mb-0'>{email}</p>
      </div>

      {/* <p className="user__email">{email}</p>
      <p className="feedback__text">{rating}</p>
      <p className="feedback__text">{content}</p> */}
      <div className='user-review'>
        <div className='score'>
          <p>
            Điểm : <span>{rating}</span>
          </p>
        </div>
        <div className='comment'>
          <p>
            Nhận xét : <span>{content}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FoodDetails
