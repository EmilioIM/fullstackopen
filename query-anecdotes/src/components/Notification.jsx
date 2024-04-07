import { useNotification } from './NotificationContext';

const Notification = () => {
  const { state: { message } } = useNotification();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  
  if (!message) return null;

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;
