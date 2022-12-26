import React, { useEffect, useState } from 'react'
import Helmet from '../../../components/Helmet/Helmet'
import SlideBar from '../../../components/UI/slider/SlideBar'
import '../../../styles/dashboard.scss'
import '../../../styles/admin.scss'
import { Link, useNavigate } from 'react-router-dom'
import { HOST } from '../../../env/config'
import ReactPaginate from 'react-paginate'

function Coupons() {
  const navigate = useNavigate()
  const [coupons, setCoupons] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const numbersPerPage = 10
  const visitedPage = pageNumber * numbersPerPage
  const displayPage = coupons.slice(visitedPage, visitedPage + numbersPerPage)

  const pageCount = Math.ceil(coupons.length / numbersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    const is_superuser = sessionStorage.getItem('is_superuser')
    const is_staff = sessionStorage.getItem('is_staff')
    if (is_superuser !== 'true' && is_staff !== 'true') {
      navigate('/error')
    } else {
      getCoupons()
    }
  }, [])

  let getCoupons = async () => {
    await fetch(`${HOST}/api/coupon`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data)
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
          <h1>Coupon</h1>
          <div className='select__actions'>
            <Link to='/admin/addCoupon' className='d-flex'>
              <button type='button' className='btn select__action--add'>
                Thêm coupon
              </button>
            </Link>
          </div>
          {/* table list product */}
          <div className='d-list'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Tên</th>
                  <th scope='col'>Mã code</th>
                  <th scope='col'>Giảm giá</th>
                  <th scope='col'>Thời gian hết hạn</th>
                  <th scope='col'>Sửa</th>
                </tr>
              </thead>
              <tbody style={{textAlign: 'center'}}>
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
                previousLabel={'Trước'}
                nextLabel={'Sau'}
                containerClassName=' paginationBttns '
              />
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  )
}

const Tr = (props) => {
  const { image, id, name, code, discount, expiry_date } = props.item
  const slash = (value) => {
    return value ? value : '-'
  }
  const format_date = (date) => {
    return date.substring(0, 10) + ' ' + date.substring(11, 16)
  }
  return (
    <tr className='d-item' style={{textAlign: 'left'}}>
      <td scope='row' style={{textAlign: 'left'}}>{props.index + 1 + props.visitedPage}</td>
      <td className='d-item--category' style={{textAlign: 'left'}}>{slash(name)}</td>
      <td className='d-item--des' style={{textAlign: 'left'}}>{slash(code)}</td>
      <td className='d-item--des' style={{textAlign: 'left'}}>{discount} %</td>
      <td className='d-item--des' style={{textAlign: 'left'}}>{format_date(expiry_date)}</td>
      <td style={{textAlign: 'left'}}>
        <Link
          to={`/admin/coupon/${id}`}
          className='d-item--icon d-item--edit'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' />
          </svg>
        </Link>
      </td>
    </tr>
  )
}

export default Coupons
