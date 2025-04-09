import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { MdMessage } from "react-icons/md";
import { FaStar } from 'react-icons/fa';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
   const { aToken } = useContext(AdminContext);
   const { dToken } = useContext(DoctorContext);


   return (
      <div className='sidebar min-h-screen bg-white border-r border-[#B2DFDB]'>
         { aToken &&
            <ul className='text-[#4A4A4A] mt-5'>
               <NavLink to={ '/admin-dashboard' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <img src={ assets.home_icon } alt="Home-icon" />
                  <p className='hidden md:block'>Dashboard</p>
               </NavLink>

               <NavLink to={ '/all-appointments' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <img src={ assets.appointment_icon } alt="Appointment-icon" />
                  <p className='hidden md:block'>Appointments</p>
               </NavLink>

               <NavLink to={ '/add-doctor' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <img src={ assets.add_icon } alt="Add-icon" />
                  <p className='hidden md:block'>Add Doctor</p>
               </NavLink>

               <NavLink to={ '/doctor-list' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <img src={ assets.people_icon } alt="People-icon" />
                  <p className='hidden md:block'>Doctor List</p>
               </NavLink>
               <NavLink to={ '/user-list' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <img src={ assets.people_icon } alt="People-icon" />
                  <p className='hidden md:block'>Patients List</p>
               </NavLink>
               <NavLink to={ '/messages' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <MdMessage size={ 25 } />
                  <p className='hidden md:block'>Messages</p>
               </NavLink>
               <NavLink to={ '/reviews' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <FaStar size={ 25 } />
                  <p className='hidden md:block'>Reviews & Ratings</p>
               </NavLink>
            </ul>
         }

         {/* Doctor Sidebar */ }
         { dToken &&
            <ul className='text-[#4A4A4A] mt-5'>
               <NavLink to={ '/doctor-dashboard' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <div className="w-6 h-6 flex items-center justify-center">
                     <img className='w-full h-full object-contain' src={ assets.home_icon } alt="Home-icon" />
                  </div>
                  <p className='hidden md:block'>Dashboard</p>
               </NavLink>

               <NavLink to={ '/doctor-appointments' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <img src={ assets.appointment_icon } alt="Appointment-icon" />
                  <p className='hidden md:block'>Appointments</p>
               </NavLink>

               <NavLink to={ '/doctor-profile' } className={ ({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-r-lg ${isActive ? 'bg-[#E0F2F1] border-r-4 border-[#008080] font-semibold' : ''}` }>
                  <img src={ assets.people_icon } alt="Profile-icon" />
                  <p className='hidden md:block'>Profile</p>
               </NavLink>
            </ul>
         }
      </div>
   );
};

export default Sidebar;
