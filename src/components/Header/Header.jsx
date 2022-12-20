import React, { useRef, useEffect } from "react";

import { Container } from "reactstrap";
import bannerImg from "../../assets/images/bannerImg.png";

import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";
import { CartContext, UserContext } from "../../context";
import { useContext } from "react";

const nav__links = [
  {
    display: "Trang chủ",
    path: "/home",
  },
  {
    display: "Ăn uống",
    path: "/foods",
  },
  {
    display: "Giỏ hàng",
    path: "/cart",
  }
];

const Header = () => {
  const { carts, setCarts } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext)
  const getAmountItems = (cart) => {
    return cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };

  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  const logOut = () => {
    setCarts([])
    sessionStorage.removeItem('carts');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('is_superuser');
    sessionStorage.removeItem('is_staff');
    setUser({})
  }

  return (
    <header className="header header__shrink" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
          <Link to='/home'>  <img src={bannerImg} alt="logo" /></Link>
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" style={{marginTop: 'auto'}} onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{getAmountItems(carts)}</span>
            </span>

            {user.id !== undefined ? (<span className="user" style={{ display: 'flex' }} >

              <div className="dropdown" style={{marginTop: 'auto'}}>

                <button
                  className="btn btn-success dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: 'none' }}
                >
                  {user.username}
                </button>
                <ul className="dropdown-menu" style={{ marginTop: 'auto'}} >
                  {(user.is_superuser || user.is_staff) &&
                    <li>
                      <Link to="/admin" className="dropdown-item">
                        Trang quản lý
                      </Link>
                    </li>}
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="dropdown-item">
                      Giỏ hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="/update-password" className="dropdown-item">
                      Đổi mật khẩu
                    </Link>
                  </li>
                  <li>
                    <Link to="/order" className="dropdown-item">
                      Lịch sử
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-balance" className="dropdown-item">
                      Nạp tiền
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="dropdown-item" onClick={() => logOut()}>
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </div>
              {/* image user */}
              <div className="user__image" style={{ marginLeft: '10px' }} >
                <img src={user.image} style={{ width: '50px', height: '50px', objectFit: 'conver' }} alt="" />
              </div>
            </span>) : (<span className="user">
              <Link to="/login">
                <i className="ri-user-line"></i>
              </Link>
            </span>)}

            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
