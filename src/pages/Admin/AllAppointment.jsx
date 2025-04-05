import React, { useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import LottieLoader from '../../components/LottieLoader';

const AllAppointment = () => {

   const { appointments, getAllAppointment, aToken, cancelAppointment } = useContext(AdminContext);
   const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext);

   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (aToken) {
         setLoading(true);
         getAllAppointment().finally(() => setLoading(false));
      }
   }, [aToken]);

   if (loading) {
      return (
         <LottieLoader message="Loading Appointments..." size="w-100 h-100" />
      );
   }

   return (
      <div className="w-full max-w-6xl m-5">
         <p className="mb-3 text-lg font-medium text-[#008080]">All Appointments</p>

         <div className="bg-white border border-[#B2DFDB] rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
            {/* Table Header */ }
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-[#B2DFDB] bg-[#E0F2F1] text-[#4A4A4A] font-medium">
               <p>#</p>
               <p>Patient</p>
               <p>Age</p>
               <p>Date & Time</p>
               <p>Doctor</p>
               <p>Fees</p>
               <p>Actions</p>
            </div>

            {/* Table Data */ }
            { appointments.map((item, index) => (
               <div
                  key={ index }
                  className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-[#4A4A4A] py-3 px-6 border-b border-[#B2DFDB] hover:bg-[#E0F2F1] transition-all"
               >
                  <p className="max-sm:hidden">{ index + 1 }</p>

                  {/* Patient Info */ }
                  <div className="flex items-center gap-2">
                     <img className="w-8 h-8 rounded-full border border-[#B2DFDB]" src={ item.userData.image } alt="Patient-img" />
                     <p>{ item.userData.name }</p>
                  </div>

                  <p className="max-sm:hidden">
                     { calculateAge(item.userData.dob) }
                  </p>
                  <p>
                     { slotDateFormat(item.slotDate) } | { item.slotTime }
                  </p>

                  {/* Doctor Info */ }
                  <div className="flex items-center gap-2">
                     <img className="w-8 h-8 rounded-full bg-[#E0F2F1] border border-[#B2DFDB]" src={ item.docData.image } alt="Doctor-img" />
                     <p>{ item.docData.name }</p>
                  </div>

                  <p>
                     { currencySymbol }
                     { item.docData.fees }
                  </p>

                  {/* Status or Cancel Button */ }
                  { item.cancelled ? (
                     <p className="text-red-500 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                     <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                     <img
                        onClick={ () => cancelAppointment(item._id) }
                        className="w-10 cursor-pointer hover:scale-105 transition-transform"
                        src={ assets.cancel_icon }
                        alt="cancel-icon"
                     />
                  ) }
               </div>
            )) }
         </div>
      </div>
   );
};

export default AllAppointment;
