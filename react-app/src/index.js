import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import configureStore from './store';

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  );
}
ReactDOM.render(
  <React.StrictMode>
        <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
