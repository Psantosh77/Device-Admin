import  {toast} from 'react-toastify';

export const SHOW_ERROR_NOTIFICATION = (error) => {
  toast.error(error, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const SHOW_INFO_NOTIFICATION = (msg, time = 8000) => {
  toast.info(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const SHOW_SUCCESS_NOTIFICATION = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const SHOW_WARN_NOTIFICATION = (msg) => {
  toast.warn(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

// import {NotificationContainer, NotificationManager} from 'react-notifications';
// const Notification = (type, msg) =>{
//     return () => {
//       switch (type) {
//         case 'info':
//           NotificationManager.info(msg);
//           break;
//         case 'success':
//           NotificationManager.success(msg);
//           break;
//         case 'warning':
//           NotificationManager.warning(msg, 'Close after 3000ms', 3000);
//           break;
//         case 'error':
//           NotificationManager.error(msg, 'Click me!', 5000, () => {
//             alert('callback');
//           });
//           break;
//       }
//     };
//   }


export default Notification;