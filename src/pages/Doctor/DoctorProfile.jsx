import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { handleError } from '../../hooks/handleError';
import axios from 'axios';
import { toast } from 'react-toastify';
import LottieLoader from '../../components/LottieLoader';

const DoctorProfile = () => {

   const { getDoctorProfile, profileData, setProfileData, dToken, backendUrl } = useContext(DoctorContext);
   const { currencySymbol } = useContext(AppContext);
   const [isEdit, setIsEdit] = useState(false);
   const [loading, setLoading] = useState(true);

   // **Update Profile**
   const updateProfile = async () => {
      try {
         const updateData = {
            address: profileData.address,
            fees: profileData.fees,
            available: profileData.available
         };

         const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, { headers: { dtoken: dToken } });

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
         setLoading(true);
         getDoctorProfile().finally(() => setLoading(false));
      }
   }, [dToken]);

   if (loading) {
      return <LottieLoader message='Loading Profile...' size='w-100 h-100' />;
   }

   return profileData && (
      <div className='m-5'>
         <div className='flex justify-between flex-wrap gap-4'>
            <div>
               <img className='bg-[#008080] w-full sm:max-w-64 rounded-lg' src={ profileData.image } alt='Doctor-img' />
            </div>

            <div className='flex-1 border border-[#B2DFDB] rounded-lg p-8 py-7 bg-[#E0F2F1]'>
               {/* Doctor Info: name, experience, degree */ }
               <p className='flex items-center gap-2 text-3xl font-medium text-[#4A4A4A]'>{ profileData.name }</p>

               <div className='flex items-center gap-2 mt-1 text-[#4A4A4A]'>
                  <p>{ profileData.degree } | { profileData.speciality }</p>
                  <button className='p-0.5 px-2 border border-[#B2DFDB] text-xs rounded-full'>{ profileData.experience }</button>
               </div>

               {/* Doctor About */ }
               <div>
                  <p className='flex items-center gap-1 text-sm font-medium text-[#4A4A4A] mt-3'>About</p>
                  <p className='text-sm text-[#4A4A4A] max-w-[700px] mt-1'>{ profileData.about }</p>
               </div>

               <p className='text-[#4A4A4A] font-medium mt-4'>Appointment Fees:
                  <span className='text-[#008080] font-semibold'>{ currencySymbol }</span>
                  { isEdit ? (
                     <input type='number' onChange={ (e) => setProfileData(prev => ({ ...prev, fees: e.target.value })) } value={ profileData.fees } className='border border-[#B2DFDB] p-1 rounded' />
                  ) : (
                     profileData.fees
                  ) }
               </p>

               <div className='flex gap-2 py-2'>
                  <p className='text-[#4A4A4A] font-medium'>Address:</p>
                  <p className='text-sm'>
                     { isEdit ? (
                        <input type='text' onChange={ (e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } })) }
                           value={ profileData.address.line1 } className='border border-[#B2DFDB] p-1 rounded' />
                     ) : (
                        profileData.address.line1
                     ) }
                     <br />
                     { isEdit ? (
                        <input type='text' onChange={ (e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } })) }
                           value={ profileData.address.line2 } className='border border-[#B2DFDB] p-1 rounded' />
                     ) : (
                        profileData.address.line2
                     ) }
                  </p>
               </div>

               <div className='flex gap-1 pt-2'>
                  <input onChange={ () => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available })) } type='checkbox' checked={ profileData.available } />
                  <label className='text-[#4A4A4A] font-medium'>Available</label>
               </div>

               { isEdit ? (
                  <button onClick={ updateProfile } className='px-4 py-1 border border-[#008080] text-sm rounded-full mt-5 bg-[#008080] text-white hover:bg-[#006666] transition-all cursor-pointer'>Save</button>
               ) : (
                  <button onClick={ () => setIsEdit(true) } className='px-4 py-1 border border-[#008080] text-sm rounded-full mt-5 bg-white text-[#008080] hover:bg-[#008080] hover:text-white transition-all cursor-pointer'>Edit</button>
               ) }
            </div>
         </div>
      </div>
   );
};

export default DoctorProfile;
