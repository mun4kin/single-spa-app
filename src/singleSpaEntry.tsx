import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import Root    from './index';


const reactLifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: Root ,
	// @ts-ignore
	domElementGetter: () => document.getElementById('worktime')
});

export const { bootstrap, mount, unmount } = reactLifecycles;
