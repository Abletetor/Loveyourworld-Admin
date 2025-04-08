import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { handleError } from '../../hooks/handleError';
import LottieLoader from '../../components/LottieLoader';
import { AdminContext } from '../../context/AdminContext';

const Reviews = () => {
   const { aToken, backendUrl } = useContext(AdminContext);
   const [ratings, setRatings] = useState([]);
   const [loading, setLoading] = useState(true);

   // Fetch all ratings
   useEffect(() => {
      const fetchRatings = async () => {
         try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-ratings`, {
               headers: { Authorization: `Bearer ${aToken}` }
            });

            console.log("API Response:", data);

            if (data.success) {
               setRatings(data.ratings);
               console.log(data.ratings);
            } else {
               toast.error(data.message);
            }
         } catch (err) {
            handleError(err);
            console.error(err);
         } finally {
            setLoading(false);
         }
      };

      fetchRatings();
   }, [backendUrl, aToken]);

   if (loading) return <LottieLoader message="Loading Reviews..." size="w-100 h-100" />;

   return (
      <div className="p-5 md:px-10 lg:px-20">
         <h2 className="text-2xl font-semibold text-[#008080] mb-4">All Ratings</h2>

         { ratings.length === 0 && (
            <p className="text-center text-[#4A4A4A] text-sm mt-10">
               No reviews available yet.
            </p>
         ) }

         <div className="grid gap-4">
            { ratings.reverse().map((item, index) => (
               <div key={ index } className="p-4 border border-[#B2DFDB] rounded shadow bg-white">
                  <div className="flex justify-between items-center">
                     <div>
                        <p className="text-lg font-semibold text-[#008080]">{ item.doctorId?.name }</p>
                        <p className="text-sm text-[#4A4A4A]">{ item.doctorId?.speciality }</p>
                        <p className="text-xs text-[#4A4A4A] mt-1">
                           Rated by: { item.patientId?.name } ({ item.patientId?.email })
                        </p>
                     </div>
                     <div className="flex items-center">
                        { [...Array(5)].map((_, i) => (
                           <FaStar key={ i } size={ 18 } color={ i < item.rating ? '#FF6600' : '#ccc' } />
                        )) }
                        <span className="ml-2 text-sm">({ item.rating })</span>
                     </div>
                  </div>
                  { item.comment && (
                     <p className="mt-2 text-sm text-[#4A4A4A]">“{ item.comment }”</p>
                  ) }
               </div>
            )) }
         </div>
      </div>
   );
};

export default Reviews;
