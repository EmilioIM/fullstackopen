import { useState, useEffect } from 'react'

const Notification = ({message, type}) => {
  // console.log('lo que llega a notification',{message, type});
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    },3000)
  },[message])

  return isVisible && message != null ? (
    <div className={`${type}`}>
      {message}
    </div>
  ) : null
}

export default Notification