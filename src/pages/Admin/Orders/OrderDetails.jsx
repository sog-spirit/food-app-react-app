import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Helmet from '../../../components/Helmet/Helmet'
import Slidebar from '../../../components/UI/slider/SlideBar'
import { HOST } from '../../../env/config'

function AdminOrderDetails() {
  const {id} = useParams()  
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getProductFromOrder()
  }, [])

  const getProductFromOrder = async() => {
    await fetch(`${HOST}/api/admin/orders/detail/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        console.log(error);
        navigate('/error')
      })
  }

  return (
    <Helmet title="AdminPage">
      <div className="admin__section d-flex">
        <Slidebar />
        <div className="main__content">
          <h1>Đơn hàng chi tiết</h1>
          <div className="d-list">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá tiền</th>
                  <th scope="col">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
              {products.map((item, index) => (
                <Tr item={item} key={item.id} index={index}/>
              ))}
              </tbody>
            </table>
          </div>
          <Link to="/admin/orders" type="button" className="btn select__action--add">
            Trở về
          </Link>
        </div>;
      </div>
    </Helmet>
  )
}

const Tr = (props) => {
    const {id, name, image, quantity, price, description} = props.item
    
    const slash = (value) => {
      return value ? value : '-'
    }

    return (
      <tr className="d-item">
        <th scope="row">{props.index + 1}</th>
        <td>{name}</td>
        <td>
          <img
            src={image}
            alt={name}
          />
        </td>
        <td className="d-item--category">{quantity}</td>
        <td className="d-item--price">{price}đ</td>
        <td className="d-item--des">{slash(description)}</td>
      </tr>
    )
  }

export default AdminOrderDetails