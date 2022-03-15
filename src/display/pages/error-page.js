import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImage from '../../assets/Error-page.jpg'

const ErrorPage = () => {
  return (
    <div className='error-section'>
      <h1 className='error-header'>Oops!</h1>
      <img src={ErrorImage} alt='error-img' className='error-img' />
      <p className='error-text'>404-PAGE NOT FOUND</p>
      <Link to='/'>
        <div className='error-btn'>Back Home</div>
      </Link>
    </div>
  )
}

export default ErrorPage
