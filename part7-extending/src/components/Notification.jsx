import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return notification !== null
    ? (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    )
    : null
}

export default Notification
