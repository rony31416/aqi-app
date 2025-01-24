import React, { useContext, useEffect, useState } from 'react'
import Logo from '../assets/images/logo.png'
import { Mycontext } from '../App'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const Login = () => {

  const [inputIndex, setinputIndex] = useState(null);
  const [isShowPassword, setisShowPassword] = useState(false);

  const context = useContext(Mycontext);

  useEffect(() => {
    context.setisHideSidebarAndHeader(true);
  }, [])

  const focusInput = (index) => {
    setinputIndex(index);

  }

  return (
    <section className="loginSection">
      <div className="loginBox">
        <div className="logo text-center">
          <img src={Logo} width="60px" />
          <h4 className='font-weight-bold'>Login to AQI</h4>
        </div>

        <div className="wrapper">
          <form action="">
            <div className={`from-group position-relative ${inputIndex === 0 && 'focus'}`}>
              <span className='icon'><MdEmail /></span>
              <input type="text" className='from-control' placeholder='Enter your email'
                onFocus={() => focusInput(0)} onBlur={() => setinputIndex(null)} />
            </div>

            <div className={`from-group position-relative ${inputIndex === 1 && 'focus'}`}>
              <span className='icon'><RiLockPasswordFill /></span>
              <input type={`${isShowPassword === true ? 'text' : 'password'}`} className='from-control' placeholder='Enter your password'
                onFocus={() => focusInput(1)} onBlur={() => setinputIndex(null)} />

              <span className="toggleShowPassword" onClick={() =>
                setisShowPassword(!isShowPassword)
              }>
                {
                  isShowPassword === true ? <IoMdEye /> : <IoMdEyeOff />
                }

              </span>
            </div>

            <div className="from-group ">
              <Button className="btn-blue btn-lg w-100">Sign In</Button>
            </div>

            <div className="from-group text-center mb-0">
              <Link to={'/forgot-password'} className="link">
                FORGET PASSWORD
              </Link>

              <div className='d-flex align-items-center 
                  justify-content-center or mt-3 mb-0'>
                <span className='line'></span>
                <span className='middleText'>or</span>
                <span className='line'></span>
              </div>

              <div className="googleSignIn">
                <Button variant='outlined' className='w-100 btn-lg 
            logInWithGoogle'>
                  <FcGoogle />
                  Sign in with Google

                </Button>
              </div>

            </div>
          </form>

        </div>

        <div className="wrapper2">
           
           <span className='text-center second'>
            Don't have an account?
            <Link to={'/signUp'} className='link color'>Register</Link>
          
           </span>
          </div>
      </div>

    </section>
  )
}

export default Login;