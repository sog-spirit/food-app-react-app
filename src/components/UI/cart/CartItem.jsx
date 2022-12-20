import React from 'react'
import { ListGroupItem } from 'reactstrap'

import '../../../styles/cart-item.css'

import { useContext } from 'react'
import { CartContext } from '../../../context'
import { toPrice } from '../../../utils/helper'

const CartItem = ({ item }) => {
  let { id, name, price, image, quantity } = item
  const { carts, setCarts } = useContext(CartContext)

  const incrementItem = async () => {
    const index = carts.findIndex((item) => {
      return item.id === id
    })
    let newCart = [...carts]
    newCart[index] = {...newCart[index], quantity: newCart[index].quantity + 1}
    setCarts(newCart)
    sessionStorage.setItem("carts", JSON.stringify(newCart))
  }
  
  const decreaseItem = async () => {
    const index = carts.findIndex((item) => {
      return item.id === id;
    });

    let newCart = [...carts];
    
    if (newCart[index].quantity === 1) {
      newCart = newCart.filter((cart) => cart.id !== newCart[index].id);
    } else {
      newCart[index] = { ...newCart[index], quantity: newCart[index].quantity - 1 };
    }
    setCarts(newCart)
    sessionStorage.setItem("carts", JSON.stringify(newCart))
  }
  
  const deleteItem = async () => {
    const index = carts.findIndex((item) => {
      return item.id === id;
    });
    
    let newCart = [...carts];
    newCart = newCart.filter((cart) => cart.id !== newCart[index].id);
    setCarts(newCart)
    sessionStorage.setItem("carts", JSON.stringify(newCart))
  }
  if (quantity === 0) {
    return <></>
  } else
    return (
      <ListGroupItem className='border-0 cart__item'>
        <div className='cart__item-info d-flex gap-2'>
          <img src={image} alt='product-img' />

          <div className='cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between'>
            <div>
              <h6 className='cart__product-title'>{name}</h6>
              <p className=' d-flex align-items-center gap-5 cart__product-price'>
                <span>{toPrice(price * quantity)} đ</span>
              </p>
              <div className=' d-flex align-items-center justify-content-between increase__decrease-btn'>
                <span className='increase__btn' onClick={() => incrementItem()}>
                  <i className='ri-add-line'></i>
                </span>
                <span className='quantity'>{quantity}</span>
                <span className='decrease__btn' onClick={() => decreaseItem()}>
                  <i className='ri-subtract-line'></i>
                </span>
              </div>
            </div>

            <span className='delete__btn' onClick={() => deleteItem()}>
              <i className='ri-close-line'></i>
            </span>
          </div>
        </div>
      </ListGroupItem>
    )
}

export default CartItem
