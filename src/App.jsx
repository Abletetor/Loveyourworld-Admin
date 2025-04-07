import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import Messages from './pages/Admin/Messages';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Reviews from './pages/Admin/Reviews';

const App = () => {

   const { aToken } = useContext(AdminContext);
   const { dToken } = useContext(DoctorContext);

   return aToken || dToken ? (
      <div className='bg-[#f8f9fd]'>
         <ToastContainer theme='dark' />
         <Navbar />
         <div className='flex items-start'>
            <Sidebar />
            <Routes>
               <Route path='/' element={ <></> } />
               <Route path='/admin-dashboard' element={ <Dashboard /> } />
               <Route path='/all-appointments' element={ <AllAppointment /> } />
               <Route path='/add-doctor' element={ <AddDoctor /> } />
               <Route path='/doctor-list' element={ <DoctorList /> } />
               <Route path='/messages' element={ <Messages /> } />
               <Route path='/reviews' element={ <Reviews /> } />

               {/* Doctor Routes */ }
               <Route path='/doctor-dashboard' element={ <DoctorDashboard /> } />
               <Route path='/doctor-appointments' element={ <DoctorAppointments /> } />
               <Route path='/doctor-profile' element={ <DoctorProfile /> } />

            </Routes>
         </div>
      </div>
   ) : (
      <>
         <Login />
         <ToastContainer theme='dark' />
      </>
   );
};

export default App;
