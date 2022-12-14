import React, { createContext, useEffect, useState, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {HOST} from "./env/config"

export const CartContext = createContext()
export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  useEffect(() => {
    getUser()
  }, [])

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
  return (
    <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>
  )
}

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([])
  const providerValue = useMemo(() => ({ carts, setCarts }), [carts, setCarts])

  useEffect(() => {
    getCarts()
  }, [])

  var getCarts = () => {
    let carts = JSON.parse(sessionStorage.getItem("carts"))
    if (carts === null) {
      setCarts([])
    }
    else {
      setCarts(carts)
    }
  }

  return (
    <CartContext.Provider value={providerValue}>{children}</CartContext.Provider>
  )
}
