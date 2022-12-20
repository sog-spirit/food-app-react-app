import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";

import {Form} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ModalBox from "../../../components/UI/ModalBox";
import Slidebar from "../../../components/UI/slider/SlideBar";
import { HOST } from "../../../env/config";

function CustomerDetail() {
  const navigate = useNavigate();
  const {id} = useParams()
  const [user, setUser] = useState({})
  const [image, setImage] = useState("") 
  const [isModal, setIsModal] = useState(false);
  const handleChange = async (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const is_superuser = sessionStorage.getItem('is_superuser')
    const is_staff = sessionStorage.getItem('is_staff')
    if (is_superuser !== 'true' && is_staff !== 'true') {
      navigate('/error')
    }
    else {
      getUserDetail()
    }
  }, [])

  const getUserDetail = async () => {
    await fetch(`${HOST}/api/admin/users/${id}`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
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
    await fetch(`${HOST}/api/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...user, "image": imageURL, token}),
    }).then((response) => {
        if (response.status === 200) {
            navigate("/admin/users");
        }
        else {
            setIsModal(true)
        }
    })
  }

  const closeModal = (e) => {
    setIsModal(false);
  };

  return (
    <Helmet title="AdminPage">
        <div className="admin__section d-flex">
        <Slidebar />
        <div className="main__content">
            <h1>Tài khoản</h1>
            {/* table list product */}
            {/* form add product */}
            <div className="apply-form-component">
            <form action="" className="simple_form new_product">
                <div className="row w-100">
                <div className="col-md-2 description--label">
                    <h3>Thông tin</h3>
                </div>
                <div className="col-md-6 description--info">
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                    >
                        Tên người dùng <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={(e) => {
                        handleChange(e)
                        }}
                    />
                    </div>
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                    >
                        Username <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="text"
                        name="name"
                        value={user.username}
                        onChange={(e) => {
                        handleChange(e)
                        }}
                        readOnly
                    />
                    </div>
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                    >
                        Username <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={(e) => {
                        handleChange(e)
                        }}
                        readOnly
                    />
                    </div>
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                    >
                        Vai trò <abbr title="required">*</abbr>
                    </label>
                    <Form.Select
                        aria-label="Default select example"
                        className="mr-3"
                        name="role"
                        onChange={(e) => {
                        handleChange(e)
                        }}
                        value={user.role}
                    >
                        <option value="admin">Quản lý</option> 
                        <option value="staff">Nhân viên</option> 
                        <option value="user">Khách hàng</option> 
                    </Form.Select>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group string required candidate_name">
                            <label
                                className="string required control-label"
                                for="candidate_name"
                            >
                                Ngày sinh <abbr title="required">*</abbr>
                            </label>
                            <input
                                className="string required form-control"
                                required
                                type="date"
                                name="date_of_birth"
                                value={user.date_of_birth}
                                onChange={(e) => {
                                handleChange(e)
                                }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group file_preview optional product_photo">
                                <label
                                className="file_preview optional control-label"
                                for="photo-file"
                                >
                                Hình ảnh
                                </label>
                                <div className="file-preview">
                                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                                </div>
                                <div className="hidden-field"></div>
                                <span className="help-block">
                                We accept PNG, JPG, and JPEG files
                                </span>
                                    <div className="image-photo" style={{ margin: '10px 0 0 0'}} >
                                <img src={user.image} style={{ width: '150px'}}  alt="" />
                        </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group string required candidate_name">
                            <label
                                className="string required control-label"
                                for="candidate_name"
                            >
                                Địa chỉ <abbr title="required">*</abbr>
                            </label>
                            <input
                                className="string required form-control"
                                required
                                type="text"
                                name="address"
                                value={user.address}
                                onChange={(e) => {
                                handleChange(e)
                                }}
                            />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group string required candidate_name">
                            <label
                                className="string required control-label"
                                for="candidate_name"
                            >
                                Số điện thoại <abbr title="required">*</abbr>
                            </label>
                            <input
                                className="string required form-control"
                                required
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={(e) => {
                                handleChange(e)
                                }}
                            />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="row w-100">
                    <div className="form-group form-submit">
                        <button type="submit" className="btn select__action--add" onClick={e => handleSubmit(e)}>
                        Lưu
                        </button>
                    </div>
                </div>
                <ModalBox show={isModal} handleClose={(e) => closeModal(e)}>
                Đã xảy ra lỗi
                </ModalBox>
            </form>
            </div>
        </div>
        </div>
    </Helmet>
    );
}

export default CustomerDetail