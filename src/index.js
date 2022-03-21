import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './assets/css/selectcustom.css';
// import './config/selectcustom.js';
import './index.css';
import {AppProvider, Frame} from '@shopify/polaris';
import App from './App';

ReactDOM.render(<AppProvider><div className={'orichi-root'}><Frame><div className={'orichi-main'}><App /></div></Frame></div></AppProvider>, document.getElementById('root'));

