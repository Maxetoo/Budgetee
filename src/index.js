import React from 'react'
import ReactDOM from 'react-dom'
import App from './main-app/app'
import { AppContext } from './context'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext>
        <App />
      </AppContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
