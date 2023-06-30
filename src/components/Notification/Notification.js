import React, { useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotificationContext } from '../Context/NotificationContext';

const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext);

  // Sử dụng useEffect để theo dõi thay đổi của notification và hiển thị thông báo
  useEffect(() => {
    if (notification) {
      toast.success(notification.message, {
        position: notification.position
      });
      // Đặt lại giá trị notification về null sau khi hiển thị thông báo
      setNotification(null);
    }
  }, [notification, setNotification]);

  return (
    <ToastContainer />
  );
};

export default Notification;
