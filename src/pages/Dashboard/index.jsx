import React, { useEffect } from 'react'
import List from '@/components/List'
import './index.less'

const Dashboard = () => {
  useEffect(() => {
    console.log('sss')
  }, [])
  return (
    <div className="dashboard-container">
      <div className="box-wrapper">
        <div className="box">1</div>
        <div className="box">1</div>
        <div className="box">1</div>
        <div className="box">1</div>
        <div className="box">1</div>
      </div>
      <List />
    </div>
  )
}

export default Dashboard
