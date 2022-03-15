import React, { useState } from 'react'
import { useGlobalContext } from '../../context'
import { RiQuillPenFill } from 'react-icons/ri'
import { FaTimes } from 'react-icons/fa'
import { CgMenuRight } from 'react-icons/cg'

const HomePage = () => {
  const [isMenuBar, setMenuBar] = useState(false)
  const {
    loginValue,
    walletAmount,
    setWalletAmount,
    walletMainValue,
    handleSubmitWalletVal,
    setWalletMainValue,
    expenses,
    savings,
    budgetDeficit,
  } = useGlobalContext()

  const getCompliment = () => {
    const hour = new Date().getHours()
    if (hour >= 1 && hour < 4) {
      return "You're meant to be asleep &#128064;"
    } else if (hour >= 4 && hour < 7) {
      return 'Rise and shine sunshine &#127770'
    } else if (hour >= 7 && hour < 11) {
      return `Good morning, remember to wash your hands &#128150;`
    } else if (hour >= 11 && hour < 16) {
      return "Hope you're having a great day &#128261;"
    } else if (hour >= 16 && hour < 20) {
      return 'Good evening, remember to always stay happy &#128536;'
    } else {
      return "It's bed time &#128564;"
    }
  }

  const handleShowWalletInput = () => {
    if (walletAmount) {
      setWalletAmount(false)
    } else {
      setWalletAmount(true)
    }
  }

  return (
    //main home section
    <div className='home-section'>
      <div className='header-cont'>
        <div className='user-info-cont'>
          <h1 className='login-value'>
            {loginValue.charAt(0).toUpperCase() +
              loginValue.split('').slice(1).join('')}
            ,
          </h1>
          <p
            className='compliment'
            dangerouslySetInnerHTML={{ __html: getCompliment() }}
          ></p>
        </div>
        {isMenuBar && (
          <div className='icon-menu'>
            <CgMenuRight />
          </div>
        )}
      </div>

      {/* wallet  */}
      <div className='wallet-container'>
        <p className='wallet'>Balance</p>
        <span className='wallet-balance'>
          <p className='unit'>N</p>
          <p className='wallet-amount'>
            {new Intl.NumberFormat().format(walletMainValue)}
          </p>
        </span>
      </div>
      {/* summary header  */}
      <h3 className='summary'>Summary</h3>
      {/* main summary container  */}
      <div className='summary-container'>
        {/* summary list  */}
        <div className='summary-list'>
          <p className='summary-name expenses'>Expenses: </p>
          <div className='summary-list-container'>
            <div className='summary-list-details'>
              <p className='unit'>N</p>
              <p className='summary-amt summary-expenses'>
                {new Intl.NumberFormat().format(expenses)}
              </p>
            </div>
          </div>
        </div>
        {/* summary list  */}
        <div className='summary-list'>
          <p className='summary-name savings'>Savings: </p>
          <div className='summary-list-container'>
            <div className='summary-list-details'>
              <p className='unit'>N</p>
              <p className='summary-amt summary-savings'>
                {new Intl.NumberFormat().format(savings)}
              </p>
            </div>
          </div>
        </div>
        {/* summary list  */}
        <div className='summary-list'>
          <p className='summary-name budget-deficit'>Budget Deficit: </p>
          <div className='summary-list-container'>
            <div className='summary-list-details'>
              <p className='unit'>N</p>
              <p className='summary-amt summary-buget-deficit'>
                {new Intl.NumberFormat().format(budgetDeficit)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* wallet add  */}
      <div className='wallet-add' onClick={handleShowWalletInput}>
        <RiQuillPenFill />
      </div>
      {/* wallet add container bg  */}
      {walletAmount && (
        <div className='bg-wallet-input'>
          {/* wallet add container  */}
          <div className='wallet-input-container'>
            <div className='wallet-header'>
              <h2 className='wallet-amount-name'>Wallet Amount</h2>
              <p className='close-btn' onClick={handleShowWalletInput}>
                <FaTimes />
              </p>
            </div>

            <label htmlFor='number'>
              {/* form for wallet add container  */}
              <form
                className='wallet-value-form'
                onSubmit={handleSubmitWalletVal}
              >
                <input
                  type='number'
                  className='wallet-value-input'
                  placeholder='amount'
                  value={walletMainValue}
                  onChange={(e) => setWalletMainValue(e.target.value)}
                />
                <button
                  type='submit'
                  className='wallet-value-btn'
                  onClick={handleSubmitWalletVal}
                >
                  proceed
                </button>
              </form>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
