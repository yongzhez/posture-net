import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setupNotification } from './utilities/notification';

// check if the user can use notifications
const isNotificationsGranted:NotificationPermission = setupNotification();

ReactDOM.render(
  <React.StrictMode>
    <App isNotificationsGranted={isNotificationsGranted === 'granted'}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

