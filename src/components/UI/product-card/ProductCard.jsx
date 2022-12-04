import React, { useContext } from 'react'

import '../../../styles/product-card.css'

import { Link, useNavigate } from 'react-router-dom'
import { CartContext, UserContext } from '../../../context'  
import { HOST } from '../../../env/config'

const ProductCard = (props) => {
  const { id, name, image, price } = props.item
  const { carts, setCarts } = useContext(CartContext)
  const navigate = useNavigate()

  const addToCart = async () => {
    const index = carts.findIndex((item) => {
      return item.id === id;
    });

    if (index !== -1) {
      let newCart = [...carts];

      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + 1,
      };

      setCarts(newCart)
      sessionStorage.setItem("carts", JSON.stringify(newCart))
    } else {
      let newCart = [...carts, {"id": id, "name": name, "image": image, "price": price, "quantity": 1}]
      setCarts(newCart)
      sessionStorage.setItem("carts", JSON.stringify(newCart))
    }
}
    return (
      <div className='product__item'>
      <div className='product__img'>
        <Link to={`/foods/${id}`}>
          <img
          src={image}
          alt='product-img'
          className='w-50'/>
        </Link>
        
      </div>

      <div className='product__content'>
        <h5>
          <Link to={`/foods/${id}`}>{name}</Link>
        </h5>
        <div className=' d-flex align-items-center justify-content-between '>
          <span className='product__price'>${price}</span>
          <button className='addTOCart__btn' onClick={() => addToCart()}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
