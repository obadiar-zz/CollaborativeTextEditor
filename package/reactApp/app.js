import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { HashRouter } from 'react-router-dom';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));
