import React, { useContext } from "react";
import Helmet from "../../components/Helmet/Helmet";
import SlideBar from "../../components/UI/slider/SlideBar";
import "../../styles/dashboard.scss";
import "../../styles/admin.scss";
import { UserContext } from "../../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HOST } from "../../env/config";

const Admin = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

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
        if (data.is_superuser != true) {
          navigate('/error')
        }
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
  }}

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
