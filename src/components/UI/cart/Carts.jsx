import React, { useState, useEffect } from 'react'

import { ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import CartItem from './CartItem'

import { useDispatch, useSelector } from 'react-redux'
import { cartUiActions } from '../../../store/shopping-cart/cartUiSlice'

import '../../../styles/shopping-cart.css'
import { useContext } from 'react'
import { CartContext } from '../../../context'

const Carts = () => {
  const {carts, setCarts} = useContext(CartContext)

  const dispatch = useDispatch()

  //const cartProducts = useSelector((state) => state.cart.cartItems);

  const totalAmount = (cart) => {
    return cart.reduce((sum, item) => {
      return sum + item.quantity * item.price
    }, 0)
  }

  const toggleCart = () => {
    dispatch(cartUiActions.toggle())
  }
  return (
    <div className='cart__container'>
      <ListGroup className='cart'>
        <div className='cart__close'>
          <span onClick={toggleCart}>
            <i className='ri-close-fill'></i>
          </span>
        </div>

        <div className='cart__item-list'>
          {carts.length === 0 ? (
            <h6 className='text-center mt-5'>No item added to the cart</h6>
          ) : (
            carts.map((item, index) => <CartItem item={item} key={index} />)
          )}
        </div>

        <div className='cart__bottom d-flex align-items-center justify-content-between'>
          <h6>
            Subtotal : <span>${totalAmount(carts)}</span>
          </h6>
          <button>
            <Link to='/checkout' onClick={toggleCart}>
              Checkout
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
  )
}

export default Carts
