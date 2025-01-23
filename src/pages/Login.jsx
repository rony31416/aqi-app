import React, { useContext, useEffect } from 'react'
import Logo from '../assets/images/logo.png'
import { Mycontext } from '../App'

const Login = () => {

  const context = useContext(Mycontext);
 
  useEffect(()=>{
    context.setisHideSidebarAndHeader(true);
  },[])


  return (
    <section className="loginSection">
        <div className="loginBox">
            <div className="logo text-center">
                <img src={Logo} width="60px" />
                 <h4 className='font-weight-bold'>Login to AQI</h4>
                </div>
        </div>

    </section>
  )
}

export default Login;