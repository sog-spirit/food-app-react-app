import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import SlideBar from "../../../components/UI/slider/SlideBar";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";

import { Form } from "react-bootstrap";

//date time picker
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import ModalBox from "../../../components/UI/ModalBox";
import { HOST } from "../../../env/config";

const AddProduct = () => {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState(false);
  const [form, setForm] = useState({})
  const [categories, setCategories] = useState([])
  const [image, setImage] = useState("") 

  useEffect(() => {
    getCategories()
  }, [])

  let getCategories = async () => {
    await fetch(`${HOST}/api/admin/category`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
  };

  const handleChange = async (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const closeModal = (e) => {
    setIsModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    await fetch(`${HOST}/api/admin/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({...form, "image": imageURL, token})
    }).then((response) => {
        if (response.status === 201) {
            navigate('/admin/products')
        } else {
            setIsModal(true)
        }
    })
  }

  return (
    <Helmet title="AdminPage">
      <div className="admin__section d-flex">
        <SlideBar />
        <div className="main__content">
          <h1>Thêm sản phẩm</h1>
          {/* table list product */}
          {/* form add product */}
          <div className="apply-form-component">
            <form action="" className="simple_form new_product">
              <div className="row w-100">
                <div className="col-md-4 description--label">
                  <h3>Mô tả sản phẩm</h3>
                  <p>Những thông tin cơ bản sản phẩm</p>
                </div>
                <div className="col-md-8 description--info">
                  <div className="form-group string required candidate_name">
                    <label
                      className="string required control-label"
                      for="candidate_name"
                    >
                      Tên sản phẩm <abbr title="required">*</abbr>
                    </label>
                    <input
                      className="string required form-control"
                      required
                      type="text"
                      placeholder="Your full name"
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
                      Loại sản phẩm <abbr title="required">*</abbr>
                    </label>
                    <Form.Select
                      aria-label="Default select example"
                      className="mr-3"
                      name="category"
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    >
                      <option>Chọn loại sản phẩm</option>
                      {categories.map((item) => {return <option key={item.id} value={item.id}>{item.name}</option>} )}  
                    </Form.Select>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group string required candidate_name">
                        <label
                          className="string required control-label"
                          for="candidate_name"
                        >
                          Giá sản phẩm <abbr title="required">*</abbr>
                        </label>
                        <input
                          className="string required form-control"
                          required
                          type="number"
                          placeholder="Giá sản phẩm"
                          name="price"
                          onChange={(e) => {
                            handleChange(e)
                          }}
                        />
                      </div>
                    </div>
                  </div>

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
                  </div>
                </div>
              </div>
              <div className="row w-100">
                <div className="col-md-4 description--label">
                  <h3>Thông tin sản phẩm</h3>
                  <p>Mô tả nguyên liệu sản phẩm</p>
                </div>
                <div className="col-md-8 description--info">
                  <div className="form-group string required candidate_name">
                    <label
                      className="string required control-label"
                      for="candidate_name"
                    >
                      Mô tả <abbr title="required">*</abbr>
                    </label>
                    <textarea
                      rows="5"
                      className="text optional form-control"
                      name="description"
                      id="candidate_cover_letter"
                      style={{ height: "10rem" }}
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row w-100">
                <div className="form-group form-submit">
                  <button type="submit" className="btn select__action--add" onClick={e => handleSubmit(e)}>
                    Thêm sản phẩm
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
};

export default AddProduct;
