import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";
import Slidebar from "../../../components/UI/slider/SlideBar";
import ModalBox from "../../../components/UI/ModalBox";
import { useNavigate } from "react-router-dom";
import { HOST } from "../../../env/config";

function AddCoupon() {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState({})
    const [isModal, setIsModal] = useState(false);
    const [image, setImage] = useState("") 
    const handleChange = async (event) => {
        setCoupon({ ...coupon, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        const is_superuser = sessionStorage.getItem('is_superuser')
        const is_staff = sessionStorage.getItem('is_staff')
        if (is_superuser !== 'true' && is_staff !== 'true') {
            navigate('/error')
        }
    }, [])

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
            await fetch(`${HOST}/api/admin/coupon`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...coupon, "image": imageURL,  token}),
        }).then((response) => {
            if (response.status === 200) {
                navigate("/admin/coupons");
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
            <h1>Coupon</h1>
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
                        T??n coupon <abbr title="required">*</abbr>
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
                        M?? <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="text"
                        name="code"
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
                        Gi???m gi?? <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="number"
                        name="discount"
                        min="1"
                        max="100"
                        onChange={(e) => {
                        handleChange(e)
                        }}
                    />
                    </div>
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
                    <div className="form-group string required candidate_name">
                        <label
                            className="string required control-label"
                            for="candidate_name"
                        >
                            Ng??y h???t h???n <abbr title="required">*</abbr>
                        </label>
                        <input
                            className="string required form-control"
                            required
                            type="date"
                            name="expiry_date"
                            onChange={(e) => {
                            handleChange(e)
                            }}
                        />
                        </div>
                    </div>
                </div>
                <div className="row w-100" style={{marginTop: '20px'}}>
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
    )
}

export default AddCoupon