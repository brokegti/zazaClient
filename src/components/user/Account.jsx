import React from 'react'
import useCheckAuthorized from '../../hooks/useCheckAuthorized'
const Account = () => {
  useCheckAuthorized()
  return (
    <div>Account</div>
  )
}

export default Account