
import _ from 'lodash';

export const setupNotification = () => {
  let notificationStatus = Notification.permission;
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (notificationStatus === 'default') {
      Notification.requestPermission().then(function (permission) {
          notificationStatus = permission;
          if (permission === 'denied') {
              alert('this website works best with notifications turned on')
          }
      });
  }

  return notificationStatus;
};

export const sendNotification = _.debounce((errorSet) => {
  const reasonsList = errorSet.reduce((combinedStr, currentError) => {
    return `${combinedStr}, \n ${currentError.shortMessage}`;
  }, '')
  const body = `Out of posture: ${reasonsList}`
  new Notification('Posture Net', { body: body });
}, 500);
