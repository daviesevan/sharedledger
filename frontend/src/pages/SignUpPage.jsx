import React from 'react'
import AuthFormComponent from '../components/AuthFormComponent'

const SignUpPage = () => {
  return (
    <div><AuthFormComponent method="register" route="/api/auth/signup" /></div>
  )
}

export default SignUpPage