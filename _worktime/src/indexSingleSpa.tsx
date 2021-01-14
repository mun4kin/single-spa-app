import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import App from './App';

import intercept from './_utils/interceptor';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import cssVars from 'css-vars-ponyfill';
import variables from './_utils/colors.json';
import { store } from './_store';

/** Подключаем цвета для IE */
cssVars({
  watch: true,
  include: 'style,link[rel="stylesheet"]:not([href*="//"])',
  variables
});

/** Подключаем интерцептор */
intercept();

const Root = (props: any) => {
  return (
    <Provider store={store}>
      <Router basename={props.basename || '/'}>
        <App {...props} />
      </Router>
    </Provider>
  );
};

export default Root;

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
