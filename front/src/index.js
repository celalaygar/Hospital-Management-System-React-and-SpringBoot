import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import IndexPage from './component/IndexPage'
import * as serviceWorker from './serviceWorker';
//import FlavorForm from './component/FlavorForm';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<FlavorForm />, document.getElementById('root'));
//ReactDOM.render(<IndexPage />, document.getElementById('root'));
//ReactDOM.render(<ListUserComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
