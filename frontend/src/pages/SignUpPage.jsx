import React from 'react'
import AuthFormComponent from '../components/AuthFormComponent'

const SignUpPage = () => {
  return (
    <div><AuthFormComponent method="register" route="/auth/signup" /></div>
  )
}

export default SignUpPage