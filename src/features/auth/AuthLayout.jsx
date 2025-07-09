import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import hero from '../../assets/hero1-min.png';
import logo from '../../assets/logo.svg';
import { ArrowLeft, Home } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className='bg-bg-light w-full h-[100vh]  flex items-center justify-center  align-middle'>
           <div className="flex items-center gap-2 mb-8">
        
            <img
              src={logo}
              alt="logo"
              className="absolute rounded-full inset-0 w-16 h-16 md:w-24 md:h-24 md:top-7 md:left-7  top-7 left-5 dark:text-white"
            />
      </div>
      {/* outlet */}
       <div className=" w-[70%] h-[93%]  shadow-xl shadow-btn-primary rounded  rounded-l-xl rounded-r-2xl  flex bg-white text-black dark:bg-gray-900 dark:text-white ">
      {/* Left Section */}
      <div className="md:w-1/2 w-full p-8 flex items-center justify-center relative ">
        <div className="w-full max-w-md ">
         <Link to="/">
          <ArrowLeft className='absolute left-4 top-6 text-white bg-btn-primary p-2 rounded-full w-10 h-10 border hover:bg-transparent hover:border-btn-primary hover:text-btn-primary hover:scale-105'/>
              
            </Link> 
          <Outlet />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-0 md:w-1/2 h-full relative hidden md:flex rounded-r-2xl">
        <img
          src={hero}
          alt="Student studying"
          className=" absolute inset-0 w-full h-full rounded-r-2xl object-cover object-top"
        />
        {/* <div className="absolute inset-0 bg-black/40 dark:bg-black/60 rounded-r-2xl " /> */}
      </div>
    </div>
   </div>
  );
};

export default AuthLayout;
