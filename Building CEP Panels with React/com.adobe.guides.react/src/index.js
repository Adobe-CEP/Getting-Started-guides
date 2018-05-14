import React from 'react';
import ReactDOM from 'react-dom';

import AppStyles from './index.css';
import App from './App';

let root = document.getElementById('root');
if (!root) {
    root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
}
ReactDOM.render(<App />, root);
