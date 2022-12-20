import React, { useState, useEffect } from 'react'
import Helmet from '../../../components/Helmet/Helmet'
import SlideBar from '../../../components/UI/slider/SlideBar'
import '../../../styles/dashboard.scss'
import '../../../styles/admin.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { HOST } from '../../../env/config'
import ReactPaginate from 'react-paginate'

const AdminRating = () => {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState(0)

  const numbersPerPage = 10
  const visitedPage = pageNumber * numbersPerPage
  const displayPage = reviews.slice(visitedPage, visitedPage + numbersPerPage)

  const pageCount = Math.ceil(reviews.length / numbersPerPage)

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
      getReviews()
    }
  }, [])

  const updateReview = async (id) => {
    let token = sessionStorage.getItem('token')
    await fetch(`${HOST}/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'APPROVE', token }),
    }).catch((error) => {
      console.log(error)
      navigate('/error')
    })
    getReviews()
  }

  const getReviews = async () => {
    await fetch(`${HOST}/api/admin/product/${id}/reviews`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data)
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
          <h1>Đánh giá</h1>
          <div className='d-list'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Tên</th>
                  <th scope='col'>Ngày khởi tạo</th>
                  <th scope='col'>Đánh giá</th>
                  <th scope='col'>Nội dung</th>
                  <th scope='col'>Trạng thái</th>
                  <th scope='col'>Chấp nhận</th>
                </tr>
              </thead>
              <tbody>
                {displayPage.map((item, index) => (
                  <Tr
                    item={item}
                    key={item.id}
                    index={index}
                    updateReview={updateReview}
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
  const { id, name, _created, rating, content, status } = props.item

  const format_date = (date) => {
    return date.substring(0, 10) + ' ' + date.substring(11, 16)
  }

  const slash = (value) => {
    return value ? value : '-'
  }

  const mapping_value = (value) => {
    const mapping = {
      PENDING: 'Đang xử lý',
      APPROVE: 'Chấp nhận',
    }
    return mapping[value]
  }

  return (
    <tr className='d-item'>
      <th scope='row'>{(props.index + 1) + props.visitedPage}</th>
      <td>{slash(name)}</td>
      <td>{format_date(_created)}</td>
      <td>{rating}</td>
      <td>{content}</td>
      <td>{mapping_value(status)}</td>
      {status == 'PENDING' ? (
        <td
          className='d-item--icon d-item--edit'
          onClick={() => props.updateReview(id)}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
            <path d='M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z' />
          </svg>
        </td>
      ) : (
        <td>-</td>
      )}
    </tr>
  )
}

export default AdminRating
