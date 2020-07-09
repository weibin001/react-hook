import React from 'react'
import './index.less'

export default function Header(props) {
  const { text } = props
  // console.log(style)
  return (
    <header className={['app-header']}>
      <h2>{text}</h2>
    </header>
  )
}
