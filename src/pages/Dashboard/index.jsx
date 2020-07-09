import React, { useEffect } from 'react'

const Dashboard = React.memo((props) => {
  useEffect(() => {
    console.log(props)
  }, [props])
  return <div>Dashboard</div>
})

export default Dashboard
