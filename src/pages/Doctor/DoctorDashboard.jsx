import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import LottieLoader from '../../components/LottieLoader';

const DoctorDashboard = () => {

   const { getDashboardData, dashData, dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
   const { slotDateFormat, currencySymbol } = useContext(AppContext);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (dToken) {
         setLoading(true);
         getDashboardData().finally(() => setLoading(false));
      }
   }, [dToken]);

   if (loading) {
      return <LottieLoader message='Loading Dashboard...' size='w-100 h-100' />;
   }


   return dashData && (
      <div className='m-5'>

         <div className="flex flex-wrap gap-5">
            { [
               { icon: assets.earning_icon, label: "Earnings", value: dashData.earnings },
               { icon: assets.appointments_icon, label: "Appointments", value: dashData.appointments },
               { icon: assets.patients_icon, label: "Patients", value: dashData.patients },
            ].map((item, index) => (
               <div
                  key={ index }
                  className="flex items-center gap-2 bg-[#E0F2F1] p-4 min-w-52 rounded border-2 border-[#B2DFDB] cursor-pointer hover:scale-105 transition-all"
               >
                  <img className="w-14" src={ item.icon } alt={ `${item.label}-icon` } />
                  <div>
                     <p className="text-xl font-semibold text-[#4A4A4A]">
                        { item.label === 'Earnings' ? currencySymbol : '' }
                        { item.value }
                     </p>
                     <p className="text-[#4A4A4A]">{ item.label }</p>
                  </div>
               </div>
            )) }
         </div>

         {/* Latest Appointments */ }
         <div className="bg-[#E0F2F1] rounded-md mt-10 border border-[#B2DFDB]">
            <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-[#B2DFDB]">
               <img src={ assets.list_icon } alt="list_icon" />
               <p className='font-semibold text-[#4A4A4A]'>Latest Bookings</p>
            </div>

            <div className='pt-4'>

               { dashData.latestAppointments.map((item, index) => (
                  <div className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-[#B2DFDB] transition-all border-b border-[#B2DFDB]" key={ index }>

                     <img className='w-10 rounded-full' src={ item.userData.image } alt='Doctor Image' />
                     <div className="flex-1 text-sm">
                        <p className="text-[#4A4A4A] font-medium">{ item.userData.name }</p>
                        <p className="text-[#4A4A4A]">{ slotDateFormat(item.slotDate) }</p>
                     </div>
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
      </div>
   );
};

export default DoctorDashboard;