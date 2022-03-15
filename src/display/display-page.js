import React, { useEffect, useRef } from 'react'
import Home from '../display/pages/home-page'
import Pages from '../display/pages/add-page'
import History from '../display/pages/history-page'
import Error from '../display/pages/error-page'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { FaWallet, FaBookOpen, FaChartBar } from 'react-icons/fa'

const DisplayPage = () => {
  const walletActive = useRef(null)
  const pageActive = useRef(null)
  const historyActive = useRef(null)
  const location = useLocation().pathname
  useEffect(() => {
    if (location === '/') {
      walletActive.current.classList.add('active-btn')
      pageActive.current.classList.remove('active-btn')
      historyActive.current.classList.remove('active-btn')
    } else if (location === '/pages') {
      pageActive.current.classList.add('active-btn')
      walletActive.current.classList.remove('active-btn')
      historyActive.current.classList.remove('active-btn')
    } else if (location === '/history') {
      historyActive.current.classList.add('active-btn')
      walletActive.current.classList.remove('active-btn')
      pageActive.current.classList.remove('active-btn')
    }
  }, [location])

  return (
    <main className='main-page'>
      <article className='main-nav'>
        <ul className='nav-list'>
          <Link to='/'>
            <li className='nav-item' ref={walletActive}>
              <FaWallet />
              <p className='icon-name'>Wallet</p>
            </li>
          </Link>
          <Link to='/pages'>
            <li className='nav-item' ref={pageActive}>
              <FaBookOpen />
              <p className='icon-name'>Add Expense</p>
            </li>
          </Link>
          <Link to='/history'>
            <li className='nav-item' ref={historyActive}>
              <FaChartBar />
              <p className='icon-name'>Records</p>
            </li>
          </Link>
        </ul>
      </article>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/pages' element={<Pages />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </main>
  )
}

export default DisplayPage
