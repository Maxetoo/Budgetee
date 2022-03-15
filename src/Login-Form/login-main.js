import React, { useState, useRef } from 'react'
import { FaCheck, FaTimes, FaQuestion } from 'react-icons/fa'
import '../main-app/app.scss'
import { useGlobalContext } from '../context'

const Login_main = () => {
  const {
    isInputCorrect,
    isMarker,
    loginValue,
    helpIcon,
    setLoginValue,
    handleLoginSubmit,
  } = useGlobalContext()

  const [displayMsg, setDisplayMsg] = useState(false)

  const infoMessage = useRef(null)
  const handleInfoMessage = () => {
    if (!displayMsg) {
      infoMessage.current.classList.add('display-info-message')
      setDisplayMsg(true)
    } else {
      infoMessage.current.classList.remove('display-info-message')
      setDisplayMsg(false)
    }
  }

  return (
    <section className='section section-login'>
      <div className='login-container'>
        <div className='login-texts'>
          <h2 className='login--head'>Welcome!</h2>
          <p className='login--msg'>
            This is Budgetee, where you can monitor budget and calculate
            expenses. Start by inputing your name below:
          </p>
        </div>
        <form className='login-main' onSubmit={handleLoginSubmit}>
          <div className='login-input-area'>
            <input
              type='text'
              placeholder='username'
              className='login-input'
              value={loginValue}
              spellCheck='false'
              onChange={(e) => setLoginValue(e.target.value)}
            />
            {isMarker && (
              <div
                className={`marker ${
                  isInputCorrect ? 'correct-login' : 'wrong-login'
                }`}
              >
                {isInputCorrect ? <FaCheck /> : <FaTimes />}
              </div>
            )}
          </div>
          <button
            type='submit'
            className='login-submit-btn'
            onClick={handleLoginSubmit}
          >
            Continue
          </button>
        </form>
      </div>
      <div className='info-message' ref={infoMessage}>
        min-length 3 and max-length 10, no spacing after first character
      </div>
      {helpIcon && (
        <div className='login-help-btn' onClick={handleInfoMessage}>
          <FaQuestion />
        </div>
      )}
    </section>
  )
}

export default Login_main
