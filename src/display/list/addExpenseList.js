import React, { useState, useRef, useEffect } from 'react'
import '../../main-app/app.scss'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../../context'
import moment from 'moment'

const AddExpenseList = ({
  amount,
  image,
  category,
  time,
  description,
  id,
  index,
}) => {
  const { handleDeleteItem } = useGlobalContext()
  const [descBg, setDescBg] = useState(false)
  const bgColor = useRef(null)

  const handleDescDisplay = () => {
    if (descBg) {
      setDescBg(false)
    } else {
      setDescBg(true)
    }
  }
  const addRandomColor = () => {
    const colorBg = ['#51adcc', '#d15252', '#463f77']
    const random = Math.floor(Math.random() * colorBg.length)
    bgColor.current.style.background = colorBg[random]
  }

  useEffect(() => {
    addRandomColor()
  }, [])

  return (
    <div className='add-expense-list' onClick={handleDescDisplay} ref={bgColor}>
      <img src={image} alt={category} className='add-expense-img' />
      <div className='add-expense-desc-cont'>
        <div className='add-expense-amount'>
          <p className='expense-unit'>N</p>
          <p className='expense-amount'>
            {new Intl.NumberFormat().format(amount)}
          </p>
        </div>
        <div className='add-expense-details'>{description}</div>
      </div>
      <div className='add-expense-utilis'>
        <div
          className='remove-list'
          onClick={() => handleDeleteItem(id, category)}
        >
          <FaTimes />
        </div>
        <p className='time-frame'>{moment(time).format('LLL')}</p>
      </div>
    </div>
  )
}

export default AddExpenseList
