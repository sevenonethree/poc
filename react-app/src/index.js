require('./assets/stylesheets/styles.scss')

import React from 'react'
import ReactDom from 'react-dom'
import App from './app/app.jsx'
import settings from 'app/settings'
ReactDom.render(
  
  <App />, 
  document.getElementById('root'))