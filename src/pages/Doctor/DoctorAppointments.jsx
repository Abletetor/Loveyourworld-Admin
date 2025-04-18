import React, { useContext, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import LottieLoader from '../../components/LottieLoader';


const DoctorAppointments = () => {

   const { appointments, getDoctorAppointments, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext);
   const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext);

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (dToken) {
         setLoading(true);
         getDoctorAppointments().finally(() => setLoading(false));
      }
   }, [dToken]);

   if (loading) {
      return (
         <LottieLoader message="Loading Appointments..." size="w-100 h-100" />
      );
   }

   return (
      <div className='w-full max-w-6xl m-5'>

         <p className="mb-3 text-lg font-medium text-[#008080]">
            All Appointments
         </p>

         <div className="bg-white border border-[#B2DFDB] rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">

            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-[#B2DFDB] bg-[#E0F2F1] text-[#4A4A4A] font-medium">
               <p>#</p>
               <p>Patients</p>
               <p>Payment</p>
               <p>Age</p>
               <p>Date & Time</p>
               <p>Fees</p>
               <p>Action</p>
            </div>

            { appointments.reverse().map((item, index) => (
               <div key={ index }
                  className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-[#4A4A4A] py-3 px-6 border-b border-[#B2DFDB] hover:bg-[#E0F2F1] transition-all">
                  <p className='max-sm:hidden'>{ index + 1 }</p>

                  <div className='flex items-center gap-2'>
                     <img className="w-8 h-8 rounded-full border border-[#B2DFDB]" src={ item.userData.image } alt='User-img' />
                     <p>{ item.userData.name }</p>
                  </div>
                  <div>
                     <p className='text-xs inline border border-[#B2DFDB] px-2 rounded-full'>{ item.payment ? "ONLINE" : "CASH" }</p>
                  </div>
                  <p className='max-sm:hidden'>{ calculateAge(item.userData.dob) }</p>
                  <p>{ slotDateFormat(item.slotDate) } | { item.slotTime } </p>
                  <p>{ currencySymbol }{ item.amount }</p>

                  { item.cancelled ?
                     <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                     : item.isCompleted ?
                        <p className='text-green-500 text-xs font-medium'>Completed</p>
                        : <div className='flex'>
                           <img onClick={ () => cancelAppointment(item._id) } className='w-10 cursor-pointer' src={ assets.cancel_icon } alt="" />
                           <img onClick={ () => completeAppointment(item._id) } className='w-10 cursor-pointer' src={ assets.tick_icon } alt="" />
                        </div>
                  }

               </div>
            )) }
         </div>

      </div>
   );
};

export default DoctorAppointments;
