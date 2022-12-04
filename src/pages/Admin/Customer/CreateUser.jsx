import React, { useState } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";
import Slidebar from "../../../components/UI/slider/SlideBar";
import {
    Form
  } from "react-bootstrap";
import ModalBox from "../../../components/UI/ModalBox";
import { useNavigate } from "react-router-dom";
import { HOST } from "../../../env/config";

function CreateUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [isModal, setIsModal] = useState(false);
    const handleChange = async (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setIsModal(true)
        }
        else {
            let token = sessionStorage.getItem('token')
            await fetch(`${HOST}/api/admin/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...user, token}),
        }).then((response) => {
            if (response.status === 200) {
                navigate("/admin/users");
            }
            else {
                setIsModal(true)
            }
        })
    }}
    
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
                        name="username"
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
                        Mật khẩu <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="password"
                        name="password"
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
                        Nhập lại mật khẩu <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="password"
                        name="confirmPassword"
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
                        Email <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="email"
                        name="email"
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
                        Vai trò <abbr title="required">*</abbr>
                    </label>
                    <Form.Select
                        aria-label="Default select example"
                        className="mr-3"
                        name="role"
                        onChange={(e) => {
                            handleChange(e)
                            }}
                    >
                        <option value="default">Vai trò</option> 
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
                                onChange={(e) => {
                                handleChange(e)
                                }}
                            />
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
                    <h2>Đã xảy ra lỗi</h2>
                </ModalBox>
            </form>
            </div>
        </div>
        </div>
    </Helmet>
    );
}

export default CreateUser