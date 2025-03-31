import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { handleError } from '../../hooks/handleError';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {

   const { getDoctorProfile, profileData, setProfileData, dToken, backendUrl } = useContext(DoctorContext);
   const { currencySymbol } = useContext(AppContext);
   const [isEdit, setIsEdit] = useState(false);

   // **Update Profile**
   const updateProfile = async () => {
      try {
         const updateData = {
            address: profileData.address,
            fees: profileData.fees,
            available: profileData.available
         };

         const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dToken } });

         if (data.success) {
            toast.success(data.message);
            setIsEdit(false);
            getDoctorProfile();
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         handleError(error);
      }
   };

   useEffect(() => {
      if (dToken) {
         getDoctorProfile();
      }
   }, [dToken]);

   return profileData && (
      <div>

         <div className='flex flex-col gap-4 m-5'>
            <div>
               <img className='bg-[#5f6fff]/80 w-full sm:max-w-64 rounded-lg' src={ profileData.image } alt="Doctor-img" />
            </div>

            <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
               {/* Doctor Info: name, experience, degree */ }

               <p className='flex items-center gsp-2 text-3xl font-medium text-gray-700'>{ profileData.name }</p>

               <div className='flex items-center gap-2 mt-1 text-gray-600'>
                  <p>{ profileData.degree } | { profileData.speciality }</p>
                  <button className='p-0.5 px-2 border border-gray-100 text-xs rounded-full'>{ profileData.experience }</button>
               </div>

               {/* Doctor About */ }

               <div>
                  <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About</p>
                  <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{ profileData.about }</p>
               </div>

               <p className='text-gray-600 font-medium mt-4'>Appointment Fees: <span className='text-gray-800'>{ currencySymbol }</span>{ isEdit ? <input type='number' onChange={ (e) => setProfileData(prev => ({ ...prev, fees: e.target.value })) } value={ profileData.fees } /> : profileData.fees }</p>

               <div className='flex gap-2 py-2'>
                  <p>Address:</p>
                  <p className='text-sm'>
                     { isEdit ?
                        <input type="text" onChange={ (e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } })) }
                           value={ profileData.address.line1 }
                        /> : profileData.address.line1 } <br />

                     { isEdit ?
                        <input type="text" onChange={ (e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } })) }
                           value={ profileData.address.line2 }
                        /> : profileData.address.line2 }
                  </p>
               </div>

               <div className='flex gap-1 pt-2'>
                  <input onChange={ () => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available })) } type="checkbox" checked={ profileData.available } />
                  <label htmlFor="">Available</label>
               </div>

               { isEdit ?
                  <button onClick={ updateProfile } className='px-4 py-1 boder-primary text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all cursor-pointer'>Save</button>
                  : <button onClick={ () => setIsEdit(true) } className='px-4 py-1 boder-primary text-sm rounded-full mt-5 hover:bg-[#5f6fff] hover:text-white transition-all cursor-pointer'>Edit</button>
               }
            </div>
         </div>
      </div>
   );
};

export default DoctorProfile;
