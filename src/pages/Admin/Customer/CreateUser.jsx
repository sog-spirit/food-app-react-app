import React, { useState, useEffect } from "react";
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
    const [image, setImage] = useState("") 
    const handleChange = async (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        const is_superuser = sessionStorage.getItem('is_superuser')
        const is_staff = sessionStorage.getItem('is_staff')
        if (is_superuser !== 'true' && is_staff !== 'true') {
        navigate('/error')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        var phoneno = /^\d{10}$/
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
        await fetch(`${HOST}/api/admin/users`, {
        method: "POST",
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
            <h1>T??i kho???n</h1>
            {/* table list product */}
            {/* form add product */}
            <div className="apply-form-component">
            <form action="" className="simple_form new_product">
                <div className="row w-100">
                <div className="col-md-2 description--label">
                    <h3>Th??ng tin</h3>
                </div>
                <div className="col-md-6 description--info">
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                    >
                        T??n ng?????i d??ng <abbr title="required">*</abbr>
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
                        M???t kh???u <abbr title="required">*</abbr>
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
                        Nh???p l???i m???t kh???u <abbr title="required">*</abbr>
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
                        Vai tr?? <abbr title="required">*</abbr>
                    </label>
                    <Form.Select
                        aria-label="Default select example"
                        className="mr-3"
                        name="role"
                        onChange={(e) => {
                            handleChange(e)
                            }}
                    >
                        <option value="default">Vai tr??</option> 
                        <option value="admin">Qu???n l??</option> 
                        <option value="user">Kh??ch h??ng</option> 
                    </Form.Select>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group string required candidate_name">
                            <label
                                className="string required control-label"
                                for="candidate_name"
                            >
                                Ng??y sinh <abbr title="required">*</abbr>
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
                            <div className="form-group file_preview optional product_photo">
                                <label
                                className="file_preview optional control-label"
                                for="photo-file"
                                >
                                H??nh ???nh
                                </label>
                                <div className="file-preview">
                                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                                </div>
                                <div className="hidden-field"></div>
                                <span className="help-block">
                                We accept PNG, JPG, and JPEG files
                                </span>
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
                                ?????a ch??? <abbr title="required">*</abbr>
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
                                S??? ??i???n tho???i <abbr title="required">*</abbr>
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
                        L??u
                        </button>
                    </div>
                </div>
                <ModalBox show={isModal} handleClose={(e) => closeModal(e)}>
                   ???? x???y ra l???i
                </ModalBox>
            </form>
            </div>
        </div>
        </div>
    </Helmet>
    );
}

export default CreateUser