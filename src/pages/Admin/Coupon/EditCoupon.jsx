import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";
import Slidebar from "../../../components/UI/slider/SlideBar";
import ModalBox from "../../../components/UI/ModalBox";
import { useNavigate, useParams } from "react-router-dom";
import { HOST } from "../../../env/config";

function EditCoupon() {
    const navigate = useNavigate();
    const {id} = useParams()
    const [coupon, setCoupon] = useState({})
    const [isModal, setIsModal] = useState(false);
    const handleChange = async (event) => {
        setCoupon({ ...coupon, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        const is_superuser = sessionStorage.getItem('is_superuser')
        const is_staff = sessionStorage.getItem('is_staff')
        if (is_superuser !== 'true' && is_staff !== 'true') {
            navigate('/error')
        }
        else {
            getCoupon()
        }
    }, [])

    const getCoupon = async () => {
        await fetch(`${HOST}/api/admin/coupon/${id}`, {
            method: 'GET',
        })
        .then((res) => res.json())
        .then((data) => {
            setCoupon(data)
        })
        .catch((error) => {
            navigate('/error')
        })
    }

    const closeModal = (e) => {
        setIsModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = sessionStorage.getItem('token')
        await fetch(`${HOST}/api/admin/coupon/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...coupon, token})
        }).then((response) => {
            console.log(response.detail);
            if (response.status === 200) {
                navigate('/admin/coupons')
            } else {
                setIsModal(true)
            }
        })
      }
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
                    <h3>Thông tin</h3>
                </div>
                <div className="col-md-6 description--info">
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                    >
                        Tên coupon <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="text"
                        name="name"
                        onChange={(e) => {
                        handleChange(e)
                        }}
                        value={coupon.name}
                    />
                    </div>
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                    >
                        Mã <abbr title="required">*</abbr>
                    </label>
                    <input
                        className="string required form-control"
                        required
                        type="text"
                        name="code"
                        onChange={(e) => {
                            handleChange(e)
                        }}
                        value={coupon.code}
                        />
                    </div>
                    <div className="form-group string required candidate_name">
                    <label
                        className="string required control-label"
                        for="candidate_name"
                        >
                        Giảm giá <abbr title="required">*</abbr>
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
                        value={coupon.discount}
                    />
                    </div>
                    <div className="form-group string required candidate_name">
                        <label
                            className="string required control-label"
                            for="candidate_name"
                        >
                            Ngày hết hạn <abbr title="required">*</abbr>
                        </label>
                        <input
                            className="string required form-control"
                            required
                            type="date"
                            name="expiry_date"
                            onChange={(e) => {
                            handleChange(e)
                            }}
                            value={coupon.expiry_date}
                        />
                        </div>
                    </div>
                </div>
                <div className="row w-100" style={{marginTop: '20px'}}>
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
  )
}

export default EditCoupon