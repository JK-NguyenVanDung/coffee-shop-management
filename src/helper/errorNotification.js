import {notification} from "antd";

  const errorNotification = (props) => {
    
    const args = {
      message: props.type,
      description: props.message,
      duration: 2,
    };
    notification.error(args);
  };
  export default errorNotification;