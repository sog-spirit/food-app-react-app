import React, { useState, useEffect } from 'react'
import Helmet from '../../../components/Helmet/Helmet'
import SlideBar from '../../../components/UI/slider/SlideBar'
import '../../../styles/dashboard.scss'
import '../../../styles/admin.scss'
import ReactPaginate from 'react-paginate'

import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HOST } from '../../../env/config'

const AdminCustomer = () => {
  //date time picker
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('default')
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0)

  const numbersPerPage = 10
  const visitedPage = pageNumber * numbersPerPage
  const displayPage = users.slice(visitedPage, visitedPage + numbersPerPage)

  const pageCount = Math.ceil(users.length / numbersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    const is_superuser = sessionStorage.getItem('is_superuser')
    const is_staff = sessionStorage.getItem('is_staff')
    if (is_superuser !== 'true' && is_staff !== 'true') {
      navigate('/error')
    }
    else {
      getUsers()
    }
  }, [])

  useEffect(async () => {
    if (filter == 'default') {
      getUsers()
    } else {
      await fetch(`${HOST}/api/admin/users`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          let items = data.filter((item) => item.role == filter)
          setUsers(items)
        })
        .catch((error) => {
          console.log(error)
          navigate('/error')
        })
    }
  }, [filter])

  const getUsers = async () => {
    await fetch(`${HOST}/api/admin/users`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.log(error)
        navigate('/error')
      })
  }

  return (
    <Helmet title='AdminPage'>
      <div className='admin__section d-flex'>
        <SlideBar />
        <div className='main__content'>
          <h1>Tài Khoản</h1>
          <div className='select__actions'>
            <Link to='/admin/addUser' className='d-flex'>
              <button type='button' className='btn select__action--add'>
                Tạo tài khoản
              </button>
            </Link>
            <div className='select__actions-item d-flex'>
              <Form.Group className='mr-1' controlId='formBasicEmail'>
                <Form.Label>Vai trò: </Form.Label>
                <Form.Select
                  aria-label='Default select example'
                  className='mr-3'
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value='default'>Mặc định</option>
                  <option value='admin'>Quản lý</option>
                  <option value='staff'>Nhân viên</option>
                  <option value='user'>Khách hàng</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <div className='d-list'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Tên</th>
                  <th scope='col'>Ngày khởi tạo</th>
                  <th scope='col'>Vai trò</th>
                  <th scope='col'>Chi tiết</th>
                  <th scope='col'>Lịch sử</th>
                </tr>
              </thead>
              <tbody>
                {displayPage.map((item, index) => (
                  <Tr
                    item={item}
                    key={item.id}
                    index={index}
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
        ;
      </div>
    </Helmet>
  )
}

const Tr = (props) => {
  const format_date = (date) => {
    return date.substring(0, 10) + ' ' + date.substring(11, 16)
  }

  const mapping_value = (value) => {
    const mapping = {
      admin: 'Quản lý',
      staff: 'Nhân viên',
      user: 'Khách hàng',
    }
    return mapping[value]
  }
  const slash = (value) => {
    return value ? value : '-'
  }
  const { id, name, date_joined, role } = props.item
  return (
    <tr className='d-item'>
      <th scope='row'>{(props.index + 1) + props.visitedPage}</th>
      <td>{slash(name)}</td>
      <td>{format_date(date_joined)}</td>
      <td className=''>{mapping_value(role)}</td>
      <td>
        <Link to={`/admin/users/${id}`} className='d-item--icon d-item--edit'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' />
          </svg>
        </Link>
      </td>
      <td>
        <Link
          to={`/admin/users/${id}/history`}
          className='d-item--icon d-item--edit'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
            <path d='M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z' />
          </svg>
        </Link>
      </td>
    </tr>
  )
}

export default AdminCustomer
