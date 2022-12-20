import React, { useState, useEffect } from "react";
import Helmet from "../../../components/Helmet/Helmet";
import SlideBar from "../../../components/UI/slider/SlideBar";
import "../../../styles/dashboard.scss";
import "../../../styles/admin.scss";
import { useNavigate, useParams } from "react-router-dom";
import ModalBox from "../../../components/UI/ModalBox";
import { HOST } from "../../../env/config";

const EditCategory = () => {
  const [isModal, setIsModal] = useState(false);
  const {id} = useParams()
  const [image, setImage] = useState("")
  const navigate = useNavigate()
  const [category, setCategory] = useState({})
  const closeModal = (e) => {
    setIsModal(false);
  };
  useEffect(() => {
    const is_superuser = sessionStorage.getItem('is_superuser')
    const is_staff = sessionStorage.getItem('is_staff')
    if (is_superuser !== 'true' && is_staff !== 'true') {
      navigate('/error')
    }
    else {
      getCategory()
    }
  }, [])
  const handleChange = async (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
  };
  const getCategory = async () => {
    await fetch(`${HOST}/api/admin/category/${id}`, {
        method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      setCategory(data)
    })
    .catch((error) => {
        console.log(error);
        navigate('/error')
      })
  }
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
    await fetch(`${HOST}/api/admin/category/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({...category, "image": imageURL, token})
    }).then((response) => {
        if (response.status === 202) {
            navigate('/admin/categories')
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
          <h1>Sửa danh mục</h1>
          {/* table list product */}
          {/* form add product */}
          <div className="apply-form-component">
            <form action="" className="simple_form new_product">
              <div className="row w-100">
                <div className="col-md-4 description--label">
                  <h3>Mô tả danh mục</h3>
                  <p>Những thông tin cơ bản danh mục</p>
                </div>
                <div className="col-md-8 description--info">
                  <div className="form-group string required candidate_name">
                    <label
                      className="string required control-label"
                      for="candidate_name"
                    >
                      Tên danh mục <abbr title="required">*</abbr>
                    </label>
                    <input
                      className="string required form-control"
                      required
                      type="text"
                      placeholder="Tên sản phẩm"
                      name="name"
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      value={category.name}
                    />
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
                    <div className="image-photo" style={{ margin: '10px 0 0 0'}} >
                        <img src={category.image} style={{ width: '150px'}}  alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row w-100">
                <div className="col-md-4 description--label">
                  <h3>Thông tin danh mục</h3>
                  <p>Mô tả nguyên liệu danh mục</p>
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
                      value={category.description}
                    ></textarea>
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
};

export default EditCategory;
