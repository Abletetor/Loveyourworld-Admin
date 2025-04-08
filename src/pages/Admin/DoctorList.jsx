import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import LottieLoader from '../../components/LottieLoader';
import StarRating from "../../components/StarRating";

const DoctorList = () => {
   const { aToken, doctors, getAllDoctors, changeAvailabilty } = useContext(AdminContext);

   const [loading, setLoading] = useState(true);

   // *Load All Doctors*
   useEffect(() => {
      if (aToken) {
         setLoading(true);
         getAllDoctors().finally(() => setLoading(false));
      }
   }, [aToken]);

   if (loading) {
      return (
         <LottieLoader message="Loading Doctor List..." size="w-100 h-100" />
      );
   }

   return (
      <div className="m-5 max-h-[90vh] overflow-y-scroll">
         <h1 className="text-lg font-medium text-[#008080]">All Doctors</h1>

         <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
            { doctors.map((item, index) => (
               <div
                  key={ index }
                  className="border border-[#B2DFDB] rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:scale-105 transition-all"
               >
                  <img
                     className="bg-[#E0F2F1] group-hover:bg-[#008080] transition-all duration-500"
                     src={ item.image }
                     alt=""
                  />
                  <div className="p-4">
                     <p className="text-[#008080] text-lg font-medium">{ item.name }</p>
                     <StarRating rating={ item.averageRating } />
                     <p className="text-[#4A4A4A] text-sm">{ item.speciality }</p>

                     <div className="mt-2 flex items-center gap-2 text-sm">
                        <input
                           onChange={ () => changeAvailabilty(item._id) }
                           type="checkbox"
                           checked={ item.available }
                           className="accent-[#008080] cursor-pointer"
                        />
                        <p className={ item.available ? "text-green-500" : "text-[#B0BEC5]" }>
                           { item.available ? "Available" : "Unavailable" }
                        </p>
                     </div>
                  </div>
               </div>
            )) }
         </div>
      </div>
   );
};

export default DoctorList;
