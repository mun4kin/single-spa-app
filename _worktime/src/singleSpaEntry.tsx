import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import Root from './index_singleSpa';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  // @ts-ignore
  domElementGetter: () => document.getElementById('content'),
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
  }
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
