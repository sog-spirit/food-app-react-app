import React from 'react'
import Helmet from '../../components/Helmet/Helmet'
import SlideBar from '../../components/UI/slider/SlideBar'
import '../../styles/dashboard.scss'
import '../../styles/admin.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { HOST } from '../../env/config'
import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'


const Admin = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({})

  const user_count = [
    { name: 'Tổng người dùng', user: data.total_user },
    { name: 'Admin', user: data.admin },
    { name: 'Staff', user: data.staff },
    { name: 'User', user: data.user },
  ]
  const order_count = [
    { name: 'Tổng đơn hàng', order: data.total_order },
    { name: 'Đã xong', order: data.order_is_doned },
    { name: 'Đang xử lý', order: data.order_in_progress },
  ]

  const getData = async () => {
    await fetch(`${HOST}/api/admin/stats`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })
    .catch((error) => {
      console.log(error);
      navigate('/error')
    })
  }

  useEffect(() => {
    const is_superuser = sessionStorage.getItem('is_superuser')
    const is_staff = sessionStorage.getItem('is_staff')
    if (is_superuser !== 'true' && is_staff !== 'true') {
      navigate('/error')
    }
    else {
      getData()
    }
  }, [])

  return (
    <Helmet title='AdminPage'>
      <div className='admin__section d-flex'>
        <SlideBar />
        <div className='main__content'>
          <div className='main__box'>
            <h1>Tổng thu nhập</h1>
            <h3>{data.doned_order_total} đ</h3>
          </div>
          <h1>Số người dùng</h1>
          <BarChart
            width={1200}
            height={300}
            data={user_count}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis yAxisId='left' orientation='left' stroke='#eeeeee' />
            <YAxis yAxisId='right' orientation='right' stroke='#0027c2' />
            <Tooltip />
            <Legend />
            <Bar yAxisId='right' dataKey='user' fill='#0027c2' />
          </BarChart>
          <h1>Số lượng đơn hàng</h1>
          <BarChart
            width={1200}
            height={300}
            data={order_count}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis yAxisId='left' orientation='left' stroke='#eeeeee' />
            <YAxis yAxisId='right' orientation='right' stroke='#de2121' />
            <Tooltip />
            <Legend />
            <Bar yAxisId='right' dataKey='order' fill='#de2121' />
          </BarChart>
        </div>
      </div>
    </Helmet>
  )
}

export default Admin
