import React, { useState, useEffect } from 'react'
import Login from '../Login-Form/login-main'
import Display from '../display/display-page'
import Load from '../loading/load'
import './app.scss'
import { useGlobalContext } from '../context'

const App = () => {
  const { isLoggedIn } = useGlobalContext()
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (isLoggedIn) {
      const clear = setTimeout(() => {
        setFirstLoad(false)
      }, 1500)
      return () => clearTimeout(clear)
    }
  }, [isLoggedIn])
  if (isLoggedIn) {
    return <>{firstLoad ? <Load /> : <Display />}</>
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}

export default App
