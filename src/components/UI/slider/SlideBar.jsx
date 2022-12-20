import React, { useContext, useState } from "react";
import "../../../styles/slidebar.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context";

const Slidebar = () => {
  const { user, setUser } = useContext(UserContext)
  const [indexActive, setIndexActive] = useState(0);
  function toggleIndexActive(index) {
    setIndexActive(index);
  }
  return (
    <div className="slidebar-container">
      <div className="logo">
        <h3 className="logo-name">FoodyApp</h3>
        <h5 className="admin-name">{user.name}</h5>
        <hr />
      </div>
      <ul className="menu-choice">
        <li
          className={`menu-item  ${
            indexActive == 0 ? "menu-item--active" : ""
          }`}
          onClick={() => toggleIndexActive(0)}
        >
          <Link to="/admin" className="d-flex">
            <div className="menu-item--icon">
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"></path>
              </svg>
            </div>
            <div className="menu-item--text">
              <span>Bảng thống kê</span>
            </div>
          </Link>
        </li>
        <li
          className={`menu-item  ${
            indexActive == 1 ? "menu-item--active" : ""
          }`}
          onClick={() => toggleIndexActive(1)}
        >
          <Link to="/admin/orders" className="d-flex">
            <div className="menu-item--icon">
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
              </svg>
            </div>
            <div className="menu-item--text">
              <span>Báo cáo đơn hàng</span>
            </div>
          </Link>
        </li>
        <li
          className={`menu-item  ${
            indexActive == 2 ? "menu-item--active" : ""
          }`}
          onClick={() => toggleIndexActive(2)}
        >
          <Link to="/admin/products" className="d-flex">
            <div className="menu-item--icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </div>
            <div className="menu-item--text">
              <span>Quản lý sản phẩm</span>
            </div>
          </Link>
        </li>
        <li
          className={`menu-item  ${
            indexActive == 2 ? "menu-item--active" : ""
          }`}
          onClick={() => toggleIndexActive(2)}
        >
          <Link to="/admin/categories" className="d-flex">
            <div className="menu-item--icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </div>
            <div className="menu-item--text">
              <span>Quản lý danh mục</span>
            </div>
          </Link>
        </li>
        <li
          className={`menu-item  ${
            indexActive == 3 ? "menu-item--active" : ""
          }`}
          onClick={() => toggleIndexActive(3)}
        >
          <Link to="/admin/users" className="d-flex">
            <div className="menu-item--icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
              </svg>
            </div>
            <div className="menu-item--text">
              <span>Quản lý tài khoản</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Slidebar;
