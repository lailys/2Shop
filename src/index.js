import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import config from "./config";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'





ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));


serviceWorker.unregister();
