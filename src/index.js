import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { TourProvider } from '@reactour/tour'

ReactDOM.render(
    <TourProvider >
        <App />
    </TourProvider>, document.getElementById('root'));

