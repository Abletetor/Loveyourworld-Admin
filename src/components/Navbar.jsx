import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
   const { aToken, setAToken } = useContext(AdminContext);
   const {dToken, setDToken} = useContext(DoctorContext);
   const navigate = useNavigate();

   const logout = () => {
      navigate('/');
      aToken && setAToken('');
      aToken && localStorage.removeItem("aToken");

      dToken && setDToken('');
      dToken && localStorage.removeItem("dToken");
      navigate('/');
   };

   return (
      <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-[#d0d0d0] bg-white'>
         <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={ assets.logo } alt="" />
            <p className='border border-gray-500 px-2.5 py-0.5 rounded-full text-gray-600'>{ aToken ? "Admin" : "Doctor" }</p>
         </div>
         <button onClick={ logout } className='bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full cursor-pointer hover:bg-[#a0a8ec] transition-all duration-300 hover:scale-105'>Logout</button>
      </div>
   );
};

export default Navbar;
