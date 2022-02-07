import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Routes , Route } from 'react-router-dom'

import './index.css';
import App from './components/App';

import UserProvider from './context/UserProvider';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);