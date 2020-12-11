import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(
  // NOTE:
  // Change <React.StrictMode> to <React.Fragment> due to dependency on react-transition-group by react-toastify
  // so as to remove error message "Warning: Legacy context API has been detected within a strict-mode tree."

  <React.Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
