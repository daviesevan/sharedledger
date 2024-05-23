import React from 'react'
import AuthFormComponent from '../components/AuthFormComponent'

const LoginPage = () => {
  return (
    <>
    <AuthFormComponent route="/api/auth/login" method="login"/>
    </>
  )
}

export default LoginPage