import { useState, createContext, useEffect } from "react";
import axios from 'axios';
import { handleError } from "../hooks/handleError";
import { toast } from 'react-toastify';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
   const backendUrl = import.meta.env.VITE_BACKEND_URL;
   const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");
   const [appointments, setAppointments] = useState([]);
   const [dashData, setDashData] = useState(null);
   const [profileData, setProfileData] = useState(null);

   // ** Update localStorage when dToken changes **
   useEffect(() => {
      if (dToken) {
         localStorage.setItem('dToken', dToken);
      } else {
         localStorage.removeItem('dToken');
      }
   }, [dToken]);

   // ** Get Appointments **
   const getDoctorAppointments = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
            headers: { dtoken: dToken },
         });

         data.success ? setAppointments(data.appointments) : toast.error(data.message);
         console.log("Success", data.appointments);
      } catch (error) {
         handleError(error);
      }
   };

   // ** Complete Appointment **
   const completeAppointment = async (appointmentId) => {
      try {
         const { data } = await axios.post(
            `${backendUrl}/api/doctor/complete-appointment`,
            { appointmentId },
            { headers: { dtoken: dToken } }
         );

         data.success ? toast.success(data.message) : toast.error(data.message);
         getDoctorAppointments();
      } catch (error) {
         handleError(error);
      }
   };

   // ** Cancel Appointment **
   const cancelAppointment = async (appointmentId) => {
      try {
         const { data } = await axios.post(
            `${backendUrl}/api/doctor/cancel-appointment`,
            { appointmentId },
            { headers: { dtoken: dToken } }
         );

         data.success ? toast.success(data.message) : toast.error(data.message);
         getDoctorAppointments();
      } catch (error) {
         handleError(error);
      }
   };

   // ** Get Dashboard Data **
   const getDashboardData = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
            headers: { dtoken: dToken }
         });

         data.success ? setDashData(data.dashData) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   // ** Get Doctor Profile **
   const getDoctorProfile = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
            headers: { dtoken: dToken },
         });

         data.success ? setProfileData(data.profileData) : toast.error(data.message);
      } catch (error) {
         handleError(error);
      }
   };

   return (
      <DoctorContext.Provider
         value={ {
            backendUrl,
            dToken,
            setDToken,
            appointments,
            setAppointments,
            getDoctorAppointments,
            completeAppointment,
            cancelAppointment,
            getDashboardData,
            dashData,
            setDashData,
            getDoctorProfile,
            profileData,
            setProfileData,
         } }
      >
         { props.children }
      </DoctorContext.Provider>
   );
};

export default DoctorContextProvider;
