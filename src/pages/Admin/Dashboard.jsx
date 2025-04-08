import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import LottieLoader from "../../components/LottieLoader";
import { MdMessage } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Dashboard = () => {
   const { getDashboardData, dashData, aToken, cancelAppointment } = useContext(AdminContext);
   const { slotDateFormat } = useContext(AppContext);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (aToken) {
         setLoading(true);
         getDashboardData().finally(() => setLoading(false));
      }
   }, [aToken]);

   if (loading) {
      return <LottieLoader message="Loading Dashboard..." size="w-100 h-100" />;
   }

   const stats = [
      { icon: <img src={ assets.doctor_icon } alt="Doctors" className="w-10" />, label: "Doctors", value: dashData.doctors },
      { icon: <img src={ assets.appointments_icon } alt="Appointments" className="w-10" />, label: "Appointments", value: dashData.appointments },
      { icon: <img src={ assets.patients_icon } alt="Patients" className="w-10" />, label: "Patients", value: dashData.patients },
      { icon: <MdMessage size={ 30 } className="text-blue-500" />, label: "Messages", value: dashData.messages },
      { icon: <FaStar size={ 30 } className="text-yellow-500" />, label: "Ratings", value: dashData.ratings },
   ];

   return (
      dashData && (
         <div className="m-5">
            {/* Stat Cards */ }
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
               { stats.map(({ icon, label, value }, index) => (
                  <div
                     key={ index }
                     className="flex items-center gap-4 bg-[#E0F2F1] p-4 rounded-xl border-2 border-[#B2DFDB] shadow-sm hover:scale-105 transition-transform duration-300"
                  >
                     <div className="flex items-center justify-center bg-white rounded-full p-2 shadow-md">
                        { icon }
                     </div>
                     <div>
                        <p className="text-xl font-bold text-[#4A4A4A]">{ value }</p>
                        <p className="text-[#4A4A4A] font-medium">{ label }</p>
                     </div>
                  </div>
               )) }
            </div>

            {/* Latest Appointments */ }
            <div className="bg-[#E0F2F1] rounded-md mt-10 border border-[#B2DFDB]">
               <div className="flex items-center gap-2.5 px-4 py-4 border-b border-[#B2DFDB]">
                  <img src={ assets.list_icon } alt="List Icon" />
                  <p className="font-semibold text-[#4A4A4A]">Latest Appointments</p>
               </div>

               <div className="pt-4">
                  { dashData.latestAppointments.map((item, index) => (
                     <div
                        key={ index }
                        className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-[#B2DFDB] transition-all border-b border-[#B2DFDB]"
                     >
                        <img className="w-10 h-10 rounded-full object-cover" src={ item.docData.image } alt="Doctor" />
                        <div className="flex-1 text-sm">
                           <p className="text-[#4A4A4A] font-medium">{ item.docData.name }</p>
                           <p className="text-[#4A4A4A]">{ slotDateFormat(item.slotDate) }</p>
                        </div>
                        { item.cancelled ? (
                           <p className="text-red-400 text-xs font-medium">Cancelled</p>
                        ) : item.isCompleted ? (
                           <p className="text-green-500 text-xs font-medium">Completed</p>
                        ) : (
                           <img
                              onClick={ () => cancelAppointment(item._id) }
                              className="w-8 cursor-pointer"
                              src={ assets.cancel_icon }
                              alt="Cancel Appointment"
                           />
                        ) }
                     </div>
                  )) }
               </div>
            </div>
         </div>
      )
   );
};

export default Dashboard;
