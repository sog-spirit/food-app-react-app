import React, { useContext } from "react";
import Helmet from "../../components/Helmet/Helmet";
import SlideBar from "../../components/UI/slider/SlideBar";
import "../../styles/dashboard.scss";
import "../../styles/admin.scss";
import { UserContext } from "../../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { HOST } from "../../env/config";

const Admin = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  // useEffect(() => {
  //   getUser()
  // }, [])

  // var getUser = async () => {
  //   var cookie = Cookies.get('jwt')
  //   if (cookie) {
  //     console.log("SEE THE COOKIE");
  //     await fetch(`${HOST}/api/user/view`, {
  //       headers: {
  //         'Authorization': `jwt=${cookie}`
  //       },
  //       method: 'GET',
  //       credentials: 'include'
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data)
  //       if (data.is_superuser != true) {
  //         navigate('/error')
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       navigate('/error')
  //     })
  //   }
  // else {
  //   navigate('/error')
  // }}

  return (
    <Helmet title="AdminPage">
      <div className="admin__section d-flex">
        <SlideBar />
        <div className="main__content">
          <h1>This is dashboard</h1>
        </div>
      </div>
    </Helmet>
  );
};

export default Admin;
