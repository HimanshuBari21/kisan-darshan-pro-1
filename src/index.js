import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import {DataLayer} from './DataLayer/DataLayer'
import reducer,{ initialState } from './DataLayer/reducer';
ReactDOM.render(
  <>
    <BrowserRouter>
      <DataLayer initialState={initialState} childern={<App/>} reducer={reducer}>
        {/* <App /> */}
      </DataLayer>
    </BrowserRouter>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();