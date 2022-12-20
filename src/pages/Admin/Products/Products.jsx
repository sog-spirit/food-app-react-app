import React, { useState, useEffect } from 'react'
import Helmet from '../../../components/Helmet/Helmet'
import SlideBar from '../../../components/UI/slider/SlideBar'
import '../../../styles/dashboard.scss'
import '../../../styles/admin.scss'
import { Link, useNavigate } from 'react-router-dom'
import { toPrice } from '../../../utils/helper'

import { Form } from 'react-bootstrap'
import { HOST } from '../../../env/config'
import ReactPaginate from "react-paginate";

const AdminProduct = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('default')
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0);
    
  const numbersPerPage = 10;
  const visitedPage = pageNumber * numbersPerPage;
  const displayPage = products.slice(
    visitedPage,
    visitedPage + numbersPerPage
  );

  const pageCount = Math.ceil(products.length / numbersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const is_superuser = sessionStorage.getItem('is_superuser')
    const is_staff = sessionStorage.getItem('is_staff')
    if (is_superuser !== 'true' && is_staff !== 'true') {
      navigate('/error')
    }
    else {
      getProducts()
      getCategories()
    }
  }, [])

  useEffect(async () => {
    if (filter == 'default') {
      getProducts()
    } else {
      await fetch(`${HOST}/api/admin/product`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          let items = data.filter((item) => item.category == filter)
          setProducts(items)
        })
        .catch((error) => {
          console.log(error)
          navigate('/error')
        })
    }
  }, [filter])

  let getProducts = async () => {
    await fetch(`${HOST}/api/admin/product`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        console.log(error)
        navigate('/error')
      })
  }

  let getCategories = async () => {
    await fetch(`${HOST}/api/admin/category`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.log(error)
        navigate('/error')
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchTerm)
    if (searchTerm) {
      let items = [...products].filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setProducts(items)
    } else {
      getProducts()
    }
  }

  const handleDelete = async (id) => {
    let token = sessionStorage.getItem('token')
    await fetch(`${HOST}/api/admin/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    }).catch((error) => {
      console.log(error)
      navigate('/error')
    })
    getProducts()
  }

  return (
    <Helmet title='AdminPage'>
      <div className='admin__section d-flex'>
        <SlideBar />
        <div className='main__content'>
          <h1>Sản phẩm</h1>
          <div className='select__actions'>
            <Link to='/admin/addProduct' className='d-flex'>
              <button type='button' className='btn select__action--add'>
                Thêm sản phẩm
              </button>
            </Link>
            <div className='select__actions-item d-flex'>
              <Form.Group className='mr-1' controlId='formBasicEmail'>
                <Form.Label>Danh mục: </Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mr-3'
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value='default'>Mặc định</option>
                  {categories.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className='mr-1' controlId=''>
                <Form.Label>Tìm kiếm</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Tìm kiếm sản phẩm'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
              <button
                type='button'
                className='btn select__action--add'
                onClick={(e) => handleSearch(e)}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* table list product */}
          <div className='d-list'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Tên</th>
                  <th scope='col'>Hình ảnh</th>
                  <th scope='col'>Danh mục</th>
                  <th scope='col'>Giá tiền</th>
                  <th scope='col'>Đánh giá</th>
                  <th scope='col'>
                    Sửa
                  </th>
                  <th scope='col'>
                    Xóa
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayPage.map((item, index) => (
                  <Tr
                    item={item}
                    key={item.id}
                    index={index}
                    handleDelete={handleDelete}
                    visitedPage={visitedPage}
                  />
                ))}
              </tbody>
            </table>
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Trước"}
                nextLabel={"Sau"}
                containerClassName=" paginationBttns "
              />
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

const Tr = (props) => {
  const { id, name, image, category_name, price, description } = props.item
  const slash = (value) => {
    return value ? value : '-'
  }
  return (
    <tr className='d-item'>
      <th scope='row'>{(props.index + 1) + props.visitedPage}</th>
      <td>{name}</td>
      <td>
        <img src={image} alt={name} />
      </td>
      <td className='d-item--category'>{category_name}</td>
      <td className='d-item--price'>{toPrice(price)} đ</td>
      <td>
        <Link
          to={`/admin/product/${id}/reviews`}
          className='d-item--icon'
        >
          <svg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 576 512'>
            <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z' />
          </svg>
        </Link>
      </td>
      <td>
        <Link to={`/admin/product/${id}`} className='d-item--icon d-item--edit'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' />
          </svg>
        </Link>
      </td>
      <td
        className='d-item--icon d-item--delete'
        onClick={() => props.handleDelete(id)}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
          <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
        </svg>
      </td>
    </tr>
  )
}

export default AdminProduct
