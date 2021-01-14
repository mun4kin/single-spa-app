import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import intercept from './_utils/interceptor';
import { Provider } from 'react-redux';

import { HashRouter as Router } from 'react-router-dom';
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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
